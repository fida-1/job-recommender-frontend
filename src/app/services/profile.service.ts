import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


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
  profileImageUrl?: string;   // ← nouveau champ

  website?: string;
  address?: string;
  user: User;  // Relation @OneToOne côté back
  title?: string; // Ajoutez ce champ

}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  loadCompanyProfile(userId: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:9090/api/profiles';

  private currentProfileSubject = new BehaviorSubject<Profile | null>(null);
  public currentProfile$ = this.currentProfileSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Charge et publie le profil de l’utilisateur connecté */
  loadUserProfile(userId: number): Observable<Profile | null> {
    return this.http.get<Profile>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(profile => this.currentProfileSubject.next(profile)),
      catchError(() => {
        this.currentProfileSubject.next(null);
        return of(null); // On retourne un observable null en cas d'erreur
      })
    );
  }

  /** Crée un profil et met à jour currentProfile$ */
  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile).pipe(
      tap(created => this.currentProfileSubject.next(created))
    );
  }

  /** Récupère tous les profils */
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }
  updateProfile(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile).pipe(
      tap(updated => this.currentProfileSubject.next(updated))
    );
  }

  /** Récupère un profil par son ID */
  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }

  /** Récupère un profil par email */
  getProfileByEmail(email: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/email/${email}`);
  }

  /** Récupère un profil lié à un userId */
  getProfileByUserId(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/user/${userId}`);
  }

  /** Récupère tous les profils d’un type */
  getProfilesByType(profileType: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/type/${profileType}`);
  }

  // Removed duplicate updateProfile method to resolve the error.

  /** Supprime un profil */
  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  uploadProfileImage(userId: number, file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http
      .post<{ imageUrl: string }>(
        `${this.apiUrl}/user/${userId}/image`,
        fd
      )
      .pipe(
        map(res => res.imageUrl),
        tap(url => {
          // met à jour le subject pour rafraîchir l’affichage
          const p = this.currentProfileSubject.value;
          if (p) {
            p.profileImageUrl = url;
            this.currentProfileSubject.next(p);
          }
        })
      );
  }
}
