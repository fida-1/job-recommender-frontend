import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobOffer } from '../../models/joboffer';
import { JobOfferService } from '../../services/joboffer.service';

@Component({
  selector: 'app-job-offer-list',
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="job-list-wrapper">
      <!-- Bouton retour Full Home -->
      <button class="back-home-btn" (click)="goFullHome()">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <div class="job-list-container">
        <div class="job-list-header">
          <h1>Current Job Opportunities</h1>
          <p>Discover your next career move with our carefully curated selection of opportunities</p>
          
          <div class="search-container">
            <input
              type="text"
              placeholder="Search for job title, company or location..."
              [(ngModel)]="searchTerm"
              class="search-input"
            />
            <button (click)="applySearch()" class="search-btn">
              Search
            </button>
          </div>
        </div>

        <div *ngIf="loading" class="loading-overlay">
          <div class="loading-spinner"></div>
        </div>

        <div *ngIf="!loading">
          <div *ngIf="filteredJobOffers.length > 0; else noJobs" class="job-cards-container">
            <div *ngFor="let job of filteredJobOffers" class="job-card">
              <h2 class="job-title">{{ job.title }}</h2>
              <div class="job-company">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H20M10,17H4V19H10M12,13H10V15H12M8,11H6V13H8M12,9H10V11H12M20,13H18V15H20M20,9H18V11H20M12,5H10V7H12M8,15H6V17H8M20,5H18V7H20M12,1H10V3H12M8,7H6V9H8M4,11H6V9H4M4,15H6V13H4M4,7H6V5H4V7Z"/>
                </svg>
                {{ job.company }}
              </div>
              <div class="job-location">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {{ job.location }}
              </div>
              <div class="job-meta">
                <span class="job-salary">{{ job.salary }}</span>
              </div>
              <p class="job-description">{{ job.description }}</p>
              <button
                class="view-details-btn"
                *ngIf="job.id !== undefined"
                (click)="viewDetails(job.id)"
              >
                View Details
                <svg viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </button>
            </div>
          </div>
          <ng-template #noJobs>
            <div class="no-jobs">
              <p>No job opportunities available at the moment</p>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back-home-btn {
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: 20px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px;
      transition: transform 0.2s ease;
    }
    .back-home-btn:hover {
      transform: translateX(-2px);
    }
    .back-home-btn svg {
      fill: #0056b3;
    }

    .job-list-wrapper {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      min-height: 100vh;
      padding: 40px 20px;
      position: relative;
    }
    .loading-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.8);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    }
    .loading-spinner {
      width: 40px; height: 40px;
      border: 4px solid #f3f3f3; border-top: 4px solid #0056b3;
      border-radius: 50%; animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .job-list-container { max-width: 1200px; margin: 0 auto; }
    .job-list-header { text-align: center; margin-bottom: 40px; }
    .job-list-header h1 { color: #0056b3; font-size: 2.5rem; margin-bottom: 15px; }
    .job-list-header p { color: #718096; font-size: 1.1rem; max-width: 600px; margin: 0 auto 20px; }

    .search-container {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    .search-input {
      padding: 12px 16px;
      border: 1px solid #cbd5e0;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      max-width: 500px;
      margin: 0;
      display: inline-block;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    .search-btn {
      background-color: #0056b3;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .search-btn:hover {
      background-color: #003d82;
    }

    .job-cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }
    .job-card {
      background: white; border-radius: 12px;
      padding: 25px; box-shadow: 0 4px 15px rgba(0,86,179,0.1);
      transition: transform 0.3s ease; border: 1px solid #e2e8f0;
    }
    .job-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(0,86,179,0.15);
    }
    .job-title { color: #0056b3; margin: 0 0 10px; font-size: 1.4rem; }
    .job-company, .job-location {
      display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
    }
    .job-company { color: #2d3748; font-weight: 600; }
    .job-location { color: #718096; }
    .job-meta { display: flex; gap: 10px; margin-bottom: 15px; }
    .job-salary {
      background: #f8f9fa; color: #2d3748;
      padding: 5px 12px; border-radius: 20px; font-size: 0.9rem;
    }
    .job-description {
      color: #4a5568; line-height: 1.6; margin-bottom: 20px;
      display: -webkit-box; -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .view-details-btn {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: white; border: none; padding: 10px 20px;
      border-radius: 8px; cursor: pointer; font-weight: 600;
      display: flex; align-items: center; gap: 8px;
      transition: all 0.3s ease;
    }
    .view-details-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,86,179,0.2);
    }
    .view-details-btn svg { width: 18px; height: 18px; fill: white; }
    .no-jobs {
      text-align: center; padding: 40px; color: #718096; font-size: 1.2rem;
    }
    @media (max-width: 768px) {
      .job-list-header h1 { font-size: 2rem; }
      .job-cards-container { grid-template-columns: 1fr; }
      .job-card { padding: 20px; }
    }
  `]
})
export class JobOfferListComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobOffers();
  }

  getJobOffers(): void {
    this.jobOfferService.getJobOffers().subscribe({
      next: data => {
        this.jobOffers = data;
        this.filteredJobOffers = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching job offers:', err);
        this.loading = false;
      }
    });
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredJobOffers = this.jobOffers.filter(job =>
      job.title.toLowerCase().includes(term) ||
      (typeof job.company === 'string' && job.company.toLowerCase().includes(term)) || // Check if job.company is a string
      job.location.toLowerCase().includes(term)
    );
  }
  

  viewDetails(id: number): void {
    this.router.navigate(['/job-offers', id]);
  }

  goFullHome(): void {
    this.router.navigate(['/full-home']);
  }
}
