import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonItem, IonIcon, IonButton, AlertController, IonInput, IonLabel, IonSelect, IonSelectOption, IonBackButton } from '@ionic/angular/standalone';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { addIcons } from 'ionicons';
import { book,search, trash, save } from 'ionicons/icons';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonSelect, IonSelectOption, IonLabel, IonInput, IonContent, IonButton, IonIcon, IonItem, IonHeader, IonToolbar, RouterLink, FormsModule, SlicePipe]
})
export class BookPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private googleBooksService = inject(GoogleBooksService);
  private firebaseService = inject(FirebaseService);
  private alertController = inject(AlertController)

  bookId: string = '';
  book: any = null;
  mostrarTextoCompleto: boolean = false;

  constructor() {
    addIcons({search,save,trash,book});
  }

  async ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';

    if (this.bookId) {
      this.book = await this.googleBooksService.getBookById(this.bookId);
    }
  }

  async saveChanges() {
    try {
      await this.firebaseService.atualizarProgresso(this.bookId, {
        status: this.book.status,
        paginasLidas: Number(this.book.paginasLidas)
      });
      this.router.navigate(['/home']);
    } catch (err) {
      console.error('Erro ao atualizar:', err);
    }
  }

  async confirmarExclusao() {
    const alert = await this.alertController.create({
      header: 'Remover Livro',
      message: 'Tem certeza que deseja remover este livro da sua estante?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Remover',
          role: 'destructive',
          handler: async () => {
            await this.firebaseService.removerLivro(this.bookId);
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
