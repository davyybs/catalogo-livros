import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  getBooks(query: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`).pipe(
      map(response => response.items || [])
    );
  }
}
