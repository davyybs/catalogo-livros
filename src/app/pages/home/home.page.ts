import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonButton, IonIcon, IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { addIcons } from 'ionicons';
import { search, book } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonImg, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonItem, RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonToolbar]
})
export class HomePage implements OnInit {
  private firebaseService = inject(FirebaseService);

  books: any[] = [];

  constructor() {
    addIcons({book,search});
  }

  ngOnInit() {
    this.loadBookshelf();
  }

  loadBookshelf() {
    this.firebaseService.obterEstante().subscribe({
      next: (firebaseData) => {
        this.books = firebaseData;
      },
      error: (err) => {
        console.error("Erro ao buscar estante", err)
      }
    })
  }

}
