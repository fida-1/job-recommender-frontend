import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CV } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  uploadCv(newCv: CV) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:9090/api/cvs';

  constructor(private http: HttpClient) { }

  getCVs(): Observable<CV[]> {
    return this.http.get<CV[]>(this.apiUrl);
  }

  addCV(cv: CV): Observable<CV> {
    return this.http.post<CV>(this.apiUrl, cv);
  }

  deleteCV(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
