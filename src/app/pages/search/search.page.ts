import { Component, OnInit, inject } from '@angular/core';
import {
  IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
  IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail
} from '@ionic/angular/standalone';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { addIcons } from 'ionicons'; // Importação necessária para registrar ícones
import { addCircleOutline } from 'ionicons/icons'; // Ícone usado no HTML

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
export class SearchPage implements OnInit {
  private googleBooksService = inject(GoogleBooksService);

  books: any[] = [];
  carregando: boolean = false;

  constructor() {
    // Registra os ícones do Ionic Standalone
    addIcons({ addCircleOutline });
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

  ngOnInit() {
  }
}
