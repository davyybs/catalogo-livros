import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = environment.apiKey;

  getBooks(query: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?q=${encodeURIComponent(query)}&key=${this.apiKey}`).pipe(
      map(response => response.items || [])
    );
  }
}
