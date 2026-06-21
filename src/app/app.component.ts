import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private firebaseService = inject(FirebaseService);

  async ngOnInit() {
    try {
      const uid = await this.firebaseService.loginAnonimo();
      console.log('Usuário conectado anonimamente com o ID:', uid);
    } catch (error) {
      console.error('Falha na autenticação silenciosa:', error);
    }
  }
}
