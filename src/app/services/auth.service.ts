import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface AuthResponse {
  id: number;
  email: string;
  role: string;
}

export interface UserProfile {
  profileType: 'CANDIDATE' | 'COMPANY' | string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email: email.trim(),
      password: password.trim()
    }).pipe(
      catchError(this.handleError<AuthResponse>('login'))
    );
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      email: email.trim(),
      password: password.trim()
    }).pipe(
      catchError(this.handleError<AuthResponse>('register'))
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isBrowser && !!localStorage.getItem('user');
  }

  getCurrentUser(): AuthResponse | null {
    if (this.isBrowser) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) as AuthResponse : null;
    }
    return null;
  }

  getCurrentUserId(): number | null {
    return this.getCurrentUser()?.id ?? null;
  }

  checkProfileExists(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:9090/api/profiles/exists/${userId}`).pipe(
      catchError(this.handleError<boolean>('checkProfileExists', false))
    );
  }

  redirectToAppropriatePage(): void {
    const userId = this.getCurrentUserId();
    if (!userId) {
      console.error('Aucun utilisateur connecté');
      this.router.navigate(['/login']);
      return;
    }
  
    this.loadUserProfile(userId).subscribe({
      next: (profile: UserProfile | null) => {
        if (profile) {
          if (profile.profileType === 'CANDIDATE') {
            this.router.navigate(['/full-home']);
          } else if (profile.profileType === 'COMPANY') {
            this.router.navigate(['/company-home']);
          } else {
            // En cas de type non prévu, redirection par défaut vers full-home
            this.router.navigate(['/full-home']);
          }
        } else {
          this.router.navigate(['/create-profile']);
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la vérification du profil:', err);
        this.router.navigate(['/error']);
      }
    });
  }
  

  loadUserProfile(userId: number): Observable<UserProfile | null> {
    return this.http.get<UserProfile | null>(`http://localhost:9090/api/profiles/${userId}`).pipe(
      catchError(this.handleError<UserProfile | null>('loadUserProfile', null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} échoué: ${error.message}`);
      return of(result as T);
    };
  }
}
