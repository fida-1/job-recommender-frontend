import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ProfileService, Profile } from '../services/profile.service';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="linkedin-container">
      <!-- Header -->
      <header class="linkedin-header">
        <div class="header-content">
          <div class="logo">JobRecommender</div>
          <nav class="main-nav">
            <a routerLink="/company-home" class="active"><i class="icon home"></i>Home</a>
            <a routerLink="/post-job"><i class="icon jobs"></i>Post Job</a>
            <a routerLink="/view-posted-jobs"><i class="icon jobs"></i>View Posted Jobs</a>
          </nav>
          <div class="user-menu">
            <div class="user-avatar" (click)="fileInput.click()">
              <img *ngIf="profileImage" [src]="profileImage" alt="Company Logo" class="avatar-img"/>
            </div>
            <input #fileInput type="file" (change)="onFileChange($event)" style="display:none" />
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
                <img *ngIf="profileImage" [src]="profileImage" alt="Company Logo" class="avatar-img"/>
              </div>
              <h2>{{ companyProfile?.companyName || 'Your Company' }}</h2>
              <p>{{ companyProfile?.industry || 'Industry' }}</p>
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
          <!-- Welcome Message -->
          <div class="linkedin-card"
               style="background: linear-gradient(135deg, #0a66c2, #004182); color: white">
            <div class="card-content">
              <h2 style="color: white !important">
                {{ greetingMessage }}, {{ companyProfile?.companyName || 'Company' }} 👋
              </h2>
              <p style="color: #e3f2fd !important">
                Find the best candidates for your open positions
              </p>
            </div>
          </div>

          <!-- Hero Section -->
          <div class="linkedin-card hero-section">
            <div class="card-header">
              <h2>Find Top Talent!</h2>
            </div>
            <div class="card-content">
              <p>
                Post your job offers and let our AI match you with qualified candidates.
              </p>
              <div class="action-buttons">
                <button class="linkedin-btn primary" routerLink="/post-job">
                  Post a Job Offer
                </button>
                <button class="linkedin-btn secondary" routerLink="/view-posted-jobs">
                  View Posted Jobs
                </button>
              </div>
            </div>
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
    .user-menu {
      display: flex;
      align-items: center;
      margin-left: auto;
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
      margin-left: 16px;
      background: transparent;
      border: none;
      color: #0a66c2;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s;
    }
    .logout-btn:hover {
      text-decoration: underline;
    }
    .linkedin-main {
      max-width: 1128px;
      margin: 0 auto;
      padding: 24px 16px;
      display: grid;
      grid-template-columns: 225px 1fr;
      gap: 24px;
    }
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
      margin: 0 0 12px;
    }
    .profile-actions {
      margin-top: 16px;
    }
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
      background: rgba(10,102,194,0.1);
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
    /* Stats Section with increased spacing */
    .stats-section {
      margin: 32px 0;
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
    /* Activity Section */
    .activity-section {
      margin-top: 32px;
    }
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .activity-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .activity-item:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
    .activity-icon {
      width: 40px;
      height: 40px;
      background-color: #e6f0f8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .activity-icon i {
      width: 20px;
      height: 20px;
      background-color: #0a66c2;
      border-radius: 50%;
    }
    .activity-content {
      flex: 1;
    }
    .activity-content p {
      margin: 0 0 4px;
      font-size: 14px;
    }
    .activity-content small {
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;
    }
    .empty-state {
      text-align: center;
      padding: 24px;
      color: rgba(0, 0, 0, 0.6);
    }
    /* Responsive Design */
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
      .stat-item {
        padding: 16px;
      }
    }
  `]
})
export class CompanyHomeComponent implements OnInit {
  companyProfile: Profile | null = null;
  profileImage: string | null = null;
  activeJobs = 0;
  applications = 0;
  hired = 0;
  recentActivities = [
    { icon: 'job', message: 'You posted a new job', time: '2 hours ago' },
    { icon: 'application', message: '5 new applications', time: '1 day ago' },
    { icon: 'hire', message: 'You hired John Smith', time: '3 days ago' }
  ];

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId === null) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileService.loadUserProfile(userId);
    this.profileService.currentProfile$.subscribe(profile => {
      if (!profile) {
        this.router.navigate(['/create-profile']);
      } else if (profile.profileType !== 'COMPANY') {
        this.router.navigate(['/full-home']);
      } else {
        this.companyProfile = profile;
        this.loadCompanyStats();
      }
    });

    this.profileImage = localStorage.getItem('companyLogo');
  }

  loadCompanyStats(): void {
    this.activeJobs = 5;
    this.applications = 24;
    this.hired = 3;
  }

  get greetingMessage(): string {
    const h = new Date().getHours();
    return h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening';
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result as string;
      localStorage.setItem('companyLogo', this.profileImage);
    };
    reader.readAsDataURL(file);
  }

  confirmLogout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.auth.logout();
      this.router.navigate(['/home']);
    }
  }
}