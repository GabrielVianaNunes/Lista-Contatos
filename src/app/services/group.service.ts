import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Group {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  /** Obtém todos os grupos */
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  /** Adiciona um novo grupo */
  addGroup(name: string): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, { name });
  }

  /** Atualiza o nome de um grupo existente pelo ID */
  updateGroup(id: number, newName: string): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, { name: newName });
  }

  /** Remove um grupo pelo ID */
  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
