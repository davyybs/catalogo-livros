import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, addDoc, collectionData, doc,
  updateDoc, deleteDoc, query, where
} from '@angular/fire/firestore';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = inject(Firestore);
  private auth = inject(Auth);

  private livrosCollection = collection(this.db, 'meus_livros');

  async adicionarLivro(livro: any) {
    const userId = this.getUserId();

    if (!userId) {
      throw new Error('Usuário não autenticado anonimamente ainda.');
    }

    const livroComUsuario = {
      ...livro,
      userId: userId,
      criadoEm: new Date()
    };

    return addDoc(this.livrosCollection, livroComUsuario);
  }

  obterEstante(): Observable<any[]> {
    const userId = this.getUserId();

    if (!userId) {
      return of([]);
    }

    const q = query(this.livrosCollection, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  atualizarProgresso(id: string, dados: any) {
    const livroDoc = doc(this.db, 'meus_livros', id);
    return updateDoc(livroDoc, dados);
  }

  removerLivro(id: string) {
    const livroDoc = doc(this.db, 'meus_livros', id);
    return deleteDoc(livroDoc);
  }

  async loginAnonimo(): Promise<string> {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }

    const userCredential = await signInAnonymously(this.auth);
    return userCredential.user.uid;
  }

  getUserId(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
}
