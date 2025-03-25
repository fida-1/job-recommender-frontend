import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer } from '../models/employer';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private apiUrl = 'http://localhost:9090/api/employers';

  constructor(private http: HttpClient) {}

  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(this.apiUrl);
  }

  getEmployerById(id: number): Observable<Employer> {
    return this.http.get<Employer>(`${this.apiUrl}/${id}`);
  }

  addEmployer(employer: Employer): Observable<Employer> {
    return this.http.post<Employer>(this.apiUrl, employer);
  }

  updateEmployer(id: number, employer: Employer): Observable<Employer> {
    return this.http.put<Employer>(`${this.apiUrl}/${id}`, employer);
  }

  deleteEmployer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
