import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonButton, IonIcon, IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { search, book, ellipsisHorizontal } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonImg, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonItem, RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonToolbar]
})
export class HomePage implements OnInit {
  private firebaseService = inject(FirebaseService);
  private bookshelfSubscription!: Subscription;

  books: any[] = [];

  constructor() {
    addIcons({book,search,ellipsisHorizontal});
  }

  ngOnInit() {
    this.loadBookshelf();
  }

  async loadBookshelf() {
    try {
      await this.firebaseService.loginAnonimo();

      this.bookshelfSubscription = this.firebaseService.obterEstante().subscribe({
        next: (livros) => {
          this.books = livros;
          console.log('Livros deste dispositivo carregados:', this.books);
        },
        error: (err) => console.error('Erro ao buscar estante:', err)
      });
    } catch (error) {
      console.error('Erro na autenticação silenciosa da Home:', error);
    }
  }

  ngOnDestroy() {
    if (this.bookshelfSubscription) {
      this.bookshelfSubscription.unsubscribe();
    }
  }

}
