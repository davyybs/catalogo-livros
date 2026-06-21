import { Component, OnInit, inject } from '@angular/core';
import {
  IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
  IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail,
  ToastController
} from '@ionic/angular/standalone';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { addIcons } from 'ionicons';
import { addCircleOutline, bookOutline } from 'ionicons/icons';

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
export class SearchPage {
  private googleBooksService = inject(GoogleBooksService);
  private firebaseService = inject(FirebaseService);
  private toastController = inject(ToastController);

  books: any[] = [];
  carregando: boolean = false;

  constructor() {
    addIcons({ addCircleOutline, bookOutline });
  }

  onSearch(event: any) {
    const query = event.target.value;

    if (!query || query.trim() === '') {
      this.books = [];
      return;
    }

    this.carregando = true;
    this.googleBooksService.getBooks(query).subscribe({
      next: (result) => {
        this.books = result;
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

    const newBook = {
      titulo: info.title,
      autor: info.authors ? info.authors[0] : 'Autor Desconhecido',
      capa: info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=Sem+Capa',
      status: 'Quero Ler',
      paginasLidas: 0
    };

    try {
      await this.firebaseService.adicionarLivro(newBook);
      this.showToast(`${newBook.titulo} adicionado à Estante!`);
    } catch (erro) {
      console.error('Erro ao salvar no Firebase:', erro);
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
}
