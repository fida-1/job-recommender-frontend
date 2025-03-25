import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActionLog } from '../models/actionlog';

@Injectable({
  providedIn: 'root'
})
export class ActionLogService {
  private apiUrl = 'http://localhost:9090/api/actionlogs';

  constructor(private http: HttpClient) {}

  getActionLogs(): Observable<ActionLog[]> {
    return this.http.get<ActionLog[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addActionLog(actionLog: ActionLog): Observable<ActionLog> {
    return this.http.post<ActionLog>(this.apiUrl, actionLog).pipe(
      catchError(this.handleError)
    );
  }

  deleteActionLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API:', error);
    return throwError(() => new Error('Erreur serveur, veuillez réessayer plus tard.'));
  }
}
