import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RecommendationService } from '../services/recommendation.service';
import { AuthService } from '../services/auth.service';
import { ProfileService, Profile } from '../services/profile.service';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="recommendation-container">
      <div class="header-section">
        <h2 class="section-title">Your Employment Recommendations</h2>
        <p class="section-subtitle">Discover positions matching your profile</p>
      </div>

      <div class="recommendation-grid">
        <div *ngFor="let job of recommendations" 
             class="job-card"
             [class.active]="clickedJob === job.id"
             (mouseenter)="hoveredJob = job.id"
             (mouseleave)="hoveredJob = null"
             (click)="toggleJob(job.id)">
          
          <div class="card-header">
            <h3 class="job-title">{{ job.title }}</h3>
            <div class="location-tag">
              <svg class="location-icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {{ job.location }}
            </div>
          </div>

          <div class="card-details" [class.expanded]="clickedJob === job.id || hoveredJob === job.id">
            <div class="detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24">
                <path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H20M10,17H4V19H10M12,13H10V15H12M8,11H6V13H8M12,9H10V11H12M20,13H18V15H20M20,9H18V11H20M12,5H10V7H12M8,15H6V17H8M20,5H18V7H20M12,1H10V3H12M8,7H6V9H8M4,11H6V9H4M4,15H6V13H4M4,7H6V5H4V7Z"/>
              </svg>
              <div class="detail-content">
                <span class="detail-label">Company</span>
                <span class="detail-value">{{ job.company }}</span>
              </div>
            </div>

            <div class="detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <div class="detail-content">
                <span class="detail-label">Salary Range</span>
                <span class="detail-value highlight">{{ job.salary }}</span>
              </div>
            </div>

            <div class="job-description">
              <p>{{ job.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="load-more-container" *ngIf="hasMoreJobs">
        <button class="load-more-btn" (click)="loadMore()">
          Show More Opportunities
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    /* Main container */
    .recommendation-container {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 4rem 2rem;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    /* Header section */
    .header-section {
      text-align: center;
      margin-bottom: 3rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .section-title {
      background: linear-gradient(135deg, #0056b3 0%, #003366 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .section-subtitle {
      color: #6c757d;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    /* Job grid */
    .recommendation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Job card */
    .job-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(0, 86, 179, 0.1);
      cursor: pointer;
    }

    .job-card.active {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 86, 179, 0.15);
      z-index: 2;
      margin-bottom: 2rem;
    }

    /* Card header */
    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .job-title {
      color: #2c3e50;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .location-tag {
      display: flex;
      align-items: center;
      color: #6c757d;
      font-size: 0.9rem;
      gap: 0.5rem;
    }

    .location-icon {
      width: 18px;
      height: 18px;
      fill: #0056b3;
    }

    /* Card details */
    .card-details {
      padding: 0 1.5rem;
      max-height: 0;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }

    .card-details.expanded {
      padding: 1.5rem;
      max-height: 600px;
      opacity: 1;
      overflow-y: auto;
    }

    .detail-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: flex-start;
    }

    .detail-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      fill: #0056b3;
    }

    .detail-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-label {
      color: #6c757d;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .detail-value {
      color: #2c3e50;
      font-weight: 500;
    }

    .highlight {
      color: #0056b3;
      font-weight: 600;
    }

    /* Job description */
    .job-description {
      color: #4a5568;
      line-height: 1.6;
      font-size: 0.95rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    /* Load more button */
    .load-more-container {
      text-align: center;
      margin-top: 3rem;
    }

    .load-more-btn {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: white;
      border: none;
      padding: 1rem 2.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 4px 6px rgba(0, 86, 179, 0.1);
    }

    .load-more-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 86, 179, 0.2);
    }

    .arrow-icon {
      width: 20px;
      height: 20px;
      fill: white;
      transition: transform 0.3s ease;
    }

    /* Decorative elements */
    .recommendation-container::before {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      background: rgba(0, 86, 179, 0.05);
      border-radius: 50%;
      top: -50px;
      right: -50px;
      z-index: 0;
    }

    .recommendation-container::after {
      content: '';
      position: absolute;
      width: 200px;
      height: 200px;
      background: rgba(0, 86, 179, 0.03);
      border-radius: 50%;
      bottom: -50px;
      left: -50px;
      z-index: 0;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .recommendation-container {
        padding: 2rem 1rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .recommendation-grid {
        grid-template-columns: 1fr;
      }

      .job-card.active {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class RecommendationComponent implements OnInit {
  recommendations: any[] = [];
  allJobs: any[] = [];
  hasMoreJobs = false;
  hoveredJob: number | null = null;
  clickedJob: number | null = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private recommendationService: RecommendationService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.error("No connected user");
      return;
    }
    
    this.profileService.loadUserProfile(userId);
    this.profileService.currentProfile$.subscribe(profile => {
      if (profile) {
        this.recommendationService.getRecommendations(profile).subscribe({
          next: (response) => {
            if (response?.recommendations) {
              this.allJobs = response.recommendations;
              this.recommendations = this.allJobs.slice(0, 10);
              this.hasMoreJobs = this.allJobs.length > 10;
            }
          },
          error: (error) => {
            console.error("Error retrieving recommendations", error);
          }
        });
      }
    });
  }

  toggleJob(jobId: number) {
    this.clickedJob = this.clickedJob === jobId ? null : jobId;
  }

  loadMore() {
    const nextJobs = this.allJobs.slice(this.recommendations.length, this.recommendations.length + 10);
    this.recommendations = [...this.recommendations, ...nextJobs];
    this.hasMoreJobs = this.recommendations.length < this.allJobs.length;
  }
}