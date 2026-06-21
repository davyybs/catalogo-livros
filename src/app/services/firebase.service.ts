import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);
  private livrosCollection = collection(this.db, 'meus_livros');

  adicionarLivro(livro: any) {
    return addDoc(this.livrosCollection, livro);
  }

  obterEstante(): Observable<any[]> {
    return collectionData(this.livrosCollection, { idField: 'id' }) as Observable<any[]>;
  }

  atualizarProgresso(id: string, dados: any) {
    const livroDoc = doc(this.db, 'meus_livros', id);
    return updateDoc(livroDoc, dados);
  }

  removerLivro(id: string) {
    const livroDoc = doc(this.db, 'meus_livros', id);
    return deleteDoc(livroDoc);
  }
}
