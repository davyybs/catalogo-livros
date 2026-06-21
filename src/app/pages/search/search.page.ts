import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
  IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail,
  ToastController
} from '@ionic/angular/standalone';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { addIcons } from 'ionicons';
import { addCircleOutline, bookOutline } from 'ionicons/icons';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonButton, IonLabel, IonItem, IonList, IonSearchbar,
    IonButtons, IonBackButton, IonContent, IonHeader, IonToolbar, IonThumbnail
  ]
})
export class SearchPage implements OnInit, OnDestroy {
  private googleBooksService = inject(GoogleBooksService);
  private firebaseService = inject(FirebaseService);
  private toastController = inject(ToastController);

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  books: any[] = [];
  carregando: boolean = false;

  constructor() {
    addIcons({ addCircleOutline, bookOutline });
  }

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((query) => {
      this.executarBusca(query);
    });
  }

  onSearch(event: any) {
    const query = event.target.value;

    if (!query || query.trim() === '') {
      this.books = [];
      return;
    }

    this.searchSubject.next(query);
  }

  executarBusca(query: string) {
    this.carregando = true;
    this.googleBooksService.getBooks(query).subscribe({
      next: (result) => {
        this.books = (result || []).map((book: any) => {
          if (book.volumeInfo?.imageLinks?.thumbnail) {
            book.volumeInfo.imageLinks.thumbnail = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://');
          }
          return book;
        });
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro na API:', err);
        this.carregando = false;
      }
    });
  }

  async addOnList(bookAPI: any) {
    const info = bookAPI.volumeInfo;

    const capaTratada = info?.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=Sem+Capa';

    const newBook = {
      titulo: info.title || 'Título Desconhecido',
      autor: info.authors ? info.authors[0] : 'Autor Desconhecido',
      capa: capaTratada,
      descricao: info.description || 'Sem descrição disponível.',
      categorias: info.categories || [],
      status: 'Quero Ler',
      paginasLidas: 0,
      paginasTotais: info.pageCount || 0,
    };

    try {
      await this.firebaseService.adicionarLivro(newBook);
      this.showToast(`${newBook.titulo} adicionado à Estante!`);
    } catch (erro) {
      console.error('Erro ao salvar no Firebase:', erro);
      this.showToast('Erro ao tentar salvar o livro.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
