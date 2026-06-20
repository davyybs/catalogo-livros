import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonButtons, IonBackButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
