// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
}

export interface Profile {
  id?: number;
  profileType: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  skills?: string;
  experience?: number | null;
  companyName?: string;
  industry?: string;
  website?: string;
  address?: string;
  user: User;  // <-- on lie le profil à un User
  title?: string; // Added title property

}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:9090/api/profiles';

  // 1) Subject pour stocker le profil courant
  private currentProfileSubject = new BehaviorSubject<Profile | null>(null);
  public currentProfile$ = this.currentProfileSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Charge le profil de l'utilisateur et le pousse dans currentProfile$
   */
  loadUserProfile(userId: number): void {
    this.http.get<Profile>(`${this.apiUrl}/user/${userId}`)
      .subscribe({
        next: profile => this.currentProfileSubject.next(profile),
        error: () => this.currentProfileSubject.next(null)
      });
  }

  /**
   * Crée un profil et met à jour currentProfile$
   */
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile).pipe(
      tap(created => this.currentProfileSubject.next(created))
    );
  }

  /**
   * Récupère tous les profils (pas nécessairement utilisé)
   */
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  /**
   * Récupère un profil par userId (Observable brut)
   */
  getProfileByUserId(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/user/${userId}`);
  }
}
