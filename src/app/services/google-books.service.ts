import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore ,doc, getDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = environment.apiKey;
  private db = inject(Firestore);

  getBooks(query: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?q=${encodeURIComponent(query)}&langRestrict=pt&key=${this.apiKey}`).pipe(
      map(response => response.items || [])
    );
  }

  async getBookById(id: string) {
    const bookDoc = doc(this.db, 'meus_livros', id);
    const snapshot = await getDoc(bookDoc);
    return snapshot.exists() ? {id: snapshot.id, ...snapshot.data() } : null;
  }
}
