import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = 'http://localhost:5000/recommend'; // Assurez-vous que votre serveur Flask fonctionne

  constructor(private http: HttpClient) { }

  getRecommendations(profile: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { profile });
  }
}
