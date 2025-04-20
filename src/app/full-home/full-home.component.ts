import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { RecommendationService } from '../services/recommendation.service';
import { AuthService } from '../services/auth.service';
import { ProfileService, Profile } from '../services/profile.service';
import { JobOffer } from '../models/joboffer';
import { JobOfferService } from '../services/joboffer.service';


@Component({
  selector: 'app-full-home',
  imports: [RouterModule, CommonModule, FormsModule],
  providers: [RecommendationService],
  template: `
    <div class="linkedin-container">
      <!-- Header -->
      <header class="linkedin-header">
        <div class="header-content">
          <div class="logo">JobRecommender</div>

          <nav class="main-nav">
            <a routerLink="/full-home" class="active">
              <i class="icon home"></i>Home
            </a>
            <a routerLink="/job-offers">
              <i class="icon jobs"></i>Jobs
            </a>
          </nav>

          <!-- Barre de recherche modifiée -->
          <div class="search-bar">
            <input
              type="text"
              placeholder="Search jobs or companies..."
              [(ngModel)]="searchTerm"
              (keyup.enter)="onSubmitSearch()"
            />
            <button class="search-btn" (click)="onSubmitSearch()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
              </svg>
            </button>
          </div>


          <div class="user-menu">
            <div class="user-avatar" (click)="fileInput.click()">
              <img *ngIf="profileImage" [src]="profileImage" alt="Profile Image" class="avatar-img"/>
            </div>
            <input #fileInput type="file" (change)="onFileChange($event)" style="display:none" />

            <!-- Bouton Logout -->
            <button class="logout-btn" (click)="confirmLogout()">Logout</button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="linkedin-main">
        <!-- Left Sidebar -->
        <aside class="left-sidebar">
          <div class="profile-card">
            <div class="profile-banner"></div>
            <div class="profile-info">
              <div class="avatar" (click)="fileInput.click()">
                <img *ngIf="profileImage" [src]="profileImage" alt="Profile Image" class="avatar-img"/>
              </div>
              <!-- Affichage dynamique selon le type de profil -->
              <h2 *ngIf="profile?.profileType === 'CANDIDATE'">
    {{ profile?.firstName }} {{ profile?.lastName }}
  </h2>
  <p *ngIf="profile?.profileType === 'CANDIDATE'">
    {{ profile?.title || 'Title not defined' }}
  </p>
  <p *ngIf="profile?.profileType === 'CANDIDATE'">
    {{ profile?.skills || 'Skills not defined' }}
  </p>
              
              <h2 *ngIf="profile?.profileType === 'COMPANY'">
                {{ profile?.companyName }}
              </h2>
              <p *ngIf="profile?.profileType === 'COMPANY'">
                {{ profile?.industry || 'Industry not defined' }}
              </p>
              <div class="profile-actions">
                <!-- ← Modifié : on va maintenant vers EditProfileComponent -->
                <button class="linkedin-btn outline" routerLink="/edit-profile">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Center Content -->
        <section class="main-content">
          <!-- Message de bienvenue personnalisé -->
          <div class="linkedin-card"
               style="background: linear-gradient(135deg, #0a66c2, #004182); color: white">
            <div class="card-content">
              <h2 style="color: white !important">
                {{ greetingMessage }}, 
                <span *ngIf="profile?.profileType === 'CANDIDATE'">
                  {{ profile?.firstName }}
                </span>
                <span *ngIf="profile?.profileType === 'COMPANY'">
                  {{ profile?.companyName }}
                </span>
                👋
              </h2>
              <p style="color: #e3f2fd !important">
                Discover jobs matching your skills
              </p>
            </div>
          </div>

          <!-- Hero Section -->
          <div class="linkedin-card hero-section">
            <div class="card-header">
              <h2 *ngIf="profile?.profileType === 'CANDIDATE'">
                Your Career, Our Commitment!
              </h2>
              <h2 *ngIf="profile?.profileType === 'COMPANY'">
                Your Business, Our Priority!
              </h2>
            </div>
            <div class="card-content">
              <p *ngIf="profile?.profileType === 'CANDIDATE'">
                Find the ideal job with our advanced AI-powered recommendations.
              </p>
              <p *ngIf="profile?.profileType === 'COMPANY'">
                Post your job offers and let our AI match you with the best candidates.
              </p>
              <div class="action-buttons">
                <button class="linkedin-btn primary" routerLink="/job-offers">
                  Browse Job Offers
                </button>
                <button class="linkedin-btn secondary" routerLink="/about">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <!-- Features Section -->
          <div class="linkedin-card features-section">
            <div class="card-header">
              <h2>Features</h2>
            </div>
            <div class="card-content">
              <div class="features-grid">
                <a class="feature-item" routerLink="/ai">
                  <div class="feature-icon">
                    <i class="icon ai"></i>
                  </div>
                  <h3>Recommendation Engine</h3>
                  <p>
                    Our AI analyzes your profile to find the best job opportunities.
                  </p>
                </a>
              </div>
            </div>
          </div>
          

          <!-- Statistics Section -->
          <div class="linkedin-card stats-section">
            <div class="card-header">
              <h2>Our Impact</h2>
            </div>
            <div class="card-content">
              <div class="stats-grid">
                <div class="stat-item">
                  <h3>10K+</h3>
                  <p>Profiles Created</p>
                </div>
                <div class="stat-item">
                  <h3>50K+</h3>
                  <p>Available Job Offers</p>
                </div>
                <div class="stat-item">
                  <h3>95%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    /* LinkedIn-like Main Styles */
    :host {
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      color: rgba(0, 0, 0, 0.9);
    }
    .linkedin-container {
      background-color: #f3f6f8;
      min-height: 100vh;
    }
    /* Header Styles */
    .linkedin-header {
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .header-content {
      max-width: 1128px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 52px;
    }
    .logo {
      font-size: 24px;
      font-weight: 600;
      color: #0a66c2;
      margin-right: 24px;
    }
    .main-nav {
      display: flex;
      flex-grow: 1;
    }
    .main-nav a {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 12px;
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
    .main-nav a.active {
      color: black;
      border-bottom: 2px solid black;
    }
    .icon {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
      background-color: #ddd;
      border-radius: 4px;
    }
    .search-bar {
      position: relative;
      flex-grow: 1;
      margin: 0 16px;
    }
    .search-btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }
    .search-bar input {
      width: 100%;
      padding: 8px 35px 8px 12px;
      border-radius: 20px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
    .user-menu {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #0a66c2;
      cursor: pointer;
      overflow: hidden;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .logout-btn {
      background-color: transparent;
      border: none;
      color: #0a66c2;
      font-weight: 600;
      cursor: pointer;
      margin-left: 16px;
    }
    .logout-btn:hover {
      text-decoration: underline;
    }
    /* Main Content Layout */
    .linkedin-main {
      max-width: 1128px;
      margin: 0 auto;
      padding: 24px 16px;
      display: grid;
      grid-template-columns: 225px 1fr;
      gap: 24px;
    }
    /* Left Sidebar */
    .left-sidebar {
      position: sticky;
      top: 72px;
      height: fit-content;
    }
    .profile-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    .profile-banner {
      height: 56px;
      background-color: #0a66c2;
    }
    .profile-info {
      padding: 16px;
      text-align: center;
      position: relative;
    }
    .avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 2px solid white;
      background-color: #ddd;
      margin: -40px auto 12px;
      cursor: pointer;
      overflow: hidden;
    }
    .profile-info h2 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px;
    }
    .profile-info p {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      margin: 0;
    }
    /* Main Content Sections */
    .main-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .linkedin-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .hero-section {
      margin-bottom: 32px;
    }
    .card-header {
      padding: 24px 24px 0;
    }
    .card-header h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    .card-content {
      padding: 24px;
    }
    .action-buttons {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }
    .linkedin-btn {
      padding: 12px 24px;
      border-radius: 24px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }
    .linkedin-btn.primary {
      background-color: #0a66c2;
      color: white;
    }
    .linkedin-btn.primary:hover {
      background-color: #004182;
    }
    .linkedin-btn.secondary {
      background-color: transparent;
      color: #0a66c2;
      border: 1px solid #0a66c2;
    }
    .linkedin-btn.secondary:hover {
      background-color: rgba(10, 102, 194, 0.1);
    }
    .linkedin-btn.outline {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(0, 0, 0, 0.6);
    }
    .linkedin-btn.outline:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    .features-section {
      margin: 32px 0;
    }
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .feature-item {
      padding: 24px;
      border-radius: 8px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
    .feature-item:hover {
      background-color: rgba(0, 0, 0, 0.03);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .feature-icon {
      width: 56px;
      height: 56px;
      background-color: #e6f0f8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .feature-icon i {
      width: 28px;
      height: 28px;
      background-color: #0a66c2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }
    .feature-item h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 12px;
    }
    .feature-item p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
      margin: 0;
      line-height: 1.5;
    }
    .stats-section {
      margin-top: 32px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      text-align: center;
    }
    .stat-item {
      padding: 24px;
      border-radius: 8px;
      background-color: #f8fafc;
      transition: all 0.2s ease;
    }
    .stat-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .stat-item h3 {
      font-size: 28px;
      font-weight: 600;
      margin: 0;
      color: #0a66c2;
    }
    .stat-item p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
      margin: 8px 0 0;
    }
    @media (max-width: 1024px) {
      .linkedin-main {
        grid-template-columns: 1fr;
      }
      .left-sidebar {
        display: none;
      }
      .main-content {
        gap: 24px;
      }
    }
    @media (max-width: 768px) {
      .action-buttons {
        flex-direction: column;
      }
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .card-header, .card-content {
        padding: 16px;
      }
      .feature-item, .stat-item {
        padding: 16px;
      }
    }
  `]
})
export class FullHomeComponent implements OnInit {
  profile: Profile | null = null;
  recommendations: any[] = [];
  profileImage: string | null = null;

  // Pour la recherche
  searchTerm = '';
  allCompanies: Profile[] = [];
  searchCompanies: Profile[] = [];
  allJobs: JobOffer[] = [];
  searchJobs: JobOffer[] = [];

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private recService: RecommendationService,
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId === null) {
      this.router.navigate(['/login']);
      return;
    }

    // Charger le profil et recommandations
    this.profileService.loadUserProfile(userId);
    this.profileService.currentProfile$
      .pipe(
        switchMap(p => {
          this.profile = p;
          if (!p) {
            this.router.navigate(['/create-profile']);
            return of([] as any[]);
          }
          return this.recService.getRecommendations(p);
        })
      )
      .subscribe(jobs => this.recommendations = jobs);

    // Charger tous les profils company
    this.profileService.getProfiles()
      .subscribe(profiles => {
        this.allCompanies = profiles.filter(p => p.profileType === 'COMPANY');
      });

    // Charger toutes les offres d’emploi
    this.jobOfferService.getJobOffers()
      .subscribe((offers: JobOffer[]) => this.allJobs = offers);

    // Charger l’avatar en cache
    this.profileImage = localStorage.getItem('profileImage');
  }

  /** Texte de salutation selon l'heure */
  get greetingMessage(): string {
    const h = new Date().getHours();
    return h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening';
  }

  /** Gestion du changement d’avatar */
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      return alert('Veuillez sélectionner une image valide.');
    }
    const userId = this.profile?.user.id;
    if (!userId) {
      return alert('Profil non chargé.');
    }
    this.profileService.uploadProfileImage(userId, file)
      .subscribe({
        next: imageUrl => this.profileImage = imageUrl,
        error: () => alert('Échec de l’upload de l’image.')
      });
  }
  

  /** Confirmation de déconnexion */
  confirmLogout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.auth.logout();
      this.router.navigate(['/home']);
    }
  }

  /**
   * Filtre en direct les companies et les jobOffers selon le terme saisi.
   * Appelé sur (input) de la search-bar.
   */
  onSubmitSearch(): void {
    const searchQuery = this.searchTerm.trim();
    if (searchQuery) {
      this.router.navigate(['/search-results'], { 
        queryParams: { q: searchQuery },
        queryParamsHandling: 'merge'
      });
    }
  }}