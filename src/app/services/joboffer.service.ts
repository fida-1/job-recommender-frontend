// src/app/services/joboffer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/joboffer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  private apiUrl = 'http://localhost:9090/api/joboffers';

  constructor(
    private http: HttpClient,
    private auth: AuthService       // ← Injection d'AuthService
  ) { }

  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }

  getJobOffer(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.apiUrl}/${id}`);
  }

  searchJobs(term: string): Observable<JobOffer[]> {
    const q = encodeURIComponent(term.trim());
    return this.http.get<JobOffer[]>(`${this.apiUrl}?search=${q}`);
  }

  addJobOffer(jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.apiUrl, jobOffer);
  }

  updateJobOffer(id: number, jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.apiUrl}/${id}`, jobOffer);
  }

  deleteJobOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getJobOffersByCompany(companyId: string): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.apiUrl}?companyId=${companyId}`);
  }
  
  /** Récupère l'ID de l'entreprise via AuthService et charge ses offres */
  getMyJobOffers(): Observable<JobOffer[]> {
    const userId = this.auth.getCurrentUserId();
    if (userId !== null) {
      return this.getJobOffersByCompany(userId.toString());
    } else {
      throw new Error('Company ID not available; user not authenticated.');
    }
  }


  
}

export type { JobOffer };
