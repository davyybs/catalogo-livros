import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonLabel, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { search, book } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar]
})
export class HomePage implements OnInit {

  constructor() {
    addIcons({book,search});
  }

  ngOnInit() {
  }

}
