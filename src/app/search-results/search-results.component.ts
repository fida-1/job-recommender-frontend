import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService, Profile } from '../services/profile.service';
import { JobOfferService, JobOffer } from '../services/joboffer.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>"{{ searchTerm }}"</h2>
          <p class="auth-subtitle">{{ getTotalResults() }} results found</p>
        </div>

        <div class="results-content">
          <!-- Companies Section -->
          <div *ngIf="searchCompanies.length" class="category-section">
            <div class="section-header">
              <span class="icon">🏢</span>
              <h3>Companies</h3>
              <span class="counter-badge">{{ searchCompanies.length }}</span>
            </div>
            <div class="results-grid">
              <div *ngFor="let company of searchCompanies" class="result-card">
                <div class="card-content">
                  <span class="company-icon">🏭</span>
                  <h4 class="company-name">{{ company.companyName }}</h4>
                </div>
              </div>
            </div>
          </div>

          <!-- Jobs Section -->
          <div *ngIf="searchJobs.length" class="category-section">
            <div class="section-header">
              <span class="icon">💼</span>
              <h3>Job Offers</h3>
              <span class="counter-badge">{{ searchJobs.length }}</span>
            </div>
            <div class="results-grid">
              <div *ngFor="let job of searchJobs" class="result-card">
                <div class="card-content">
                  <div class="job-meta">
                    <span class="job-icon">📌</span>
                    <div class="job-info">
                      <h4 class="job-title">{{ job.title }}</h4>
                      <p class="company-name">{{ job.company }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="!searchCompanies.length && !searchJobs.length" class="empty-state">
            <div class="empty-content">
              <span class="empty-icon">🔍</span>
              <h3>No results found for "{{ searchTerm }}"</h3>
              <p>Try different keywords or check your spelling</p>
            </div>
          </div>
        </div>
      </div>

      <div class="auth-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
      </div>
    </div>
  `,
  styles: [`
    /* Variables IDENTIQUES à Register */
    :root {
      --primary-blue: #0056b3;
      --secondary-blue: #e6f0f8;
      --text-dark: #333;
      --text-muted: #6c757d;
      --background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      --radius: 16px;
    }

    .auth-container {
      display: flex;
      min-height: 100vh;
      background: var(--background);
      padding: 2rem;
      position: relative;
      overflow: hidden;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }

    .auth-card {
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 2.5rem;
      width: 100%;
      max-width: 800px;
      margin: auto;
      z-index: 2;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
      
      h2 {
        color: var(--primary-blue);
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
    }

    .auth-subtitle {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .category-section {
      margin-bottom: 2.5rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      h3 {
        color: var(--text-dark);
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .icon {
        font-size: 1.5rem;
        color: var(--primary-blue);
      }
    }

    .counter-badge {
      background: var(--secondary-blue);
      color: var(--primary-blue);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .results-grid {
      display: grid;
      gap: 1rem;
    }

    .result-card {
      background: white;
      padding: 1.5rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
        border-color: var(--primary-blue);
      }
    }

    .company-icon, .job-icon {
      font-size: 1.8rem;
      color: var(--primary-blue);
    }

    .company-name {
      color: var(--primary-blue);
      font-weight: 600;
      font-size: 1.1rem;
    }

    .job-title {
      color: var(--text-dark);
      font-weight: 600;
      font-size: 1rem;
    }

    .company-name {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 0;
      
      .empty-icon {
        font-size: 2.5rem;
        color: var(--primary-blue);
        opacity: 0.8;
      }
      
      h3 {
        color: var(--text-dark);
        font-size: 1.25rem;
      }
      
      p {
        color: var(--text-muted);
        font-size: 0.9rem;
      }
    }

    .auth-decoration .decoration-circle {
      background: rgba(0, 86, 179, 0.05);
    }

    @media (max-width: 768px) {
      .auth-container {
        padding: 1rem;
      }

      .auth-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class SearchResultsComponent implements OnInit {
  searchTerm = '';
  searchCompanies: Profile[] = [];
  searchJobs: JobOffer[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private jobOfferService: JobOfferService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      this.loadSearchResults();
    });
  }

  getTotalResults(): number {
    return this.searchCompanies.length + this.searchJobs.length;
  }

  private loadSearchResults(): void {
    const q = this.searchTerm.toLowerCase();

    this.profileService.getProfiles().subscribe(profiles => {
      this.searchCompanies = profiles.filter(p => 
        p.profileType === 'COMPANY' && 
        p.companyName?.toLowerCase().includes(q)
      );
    });

    this.jobOfferService.getJobOffers().subscribe(jobs => {
      this.searchJobs = jobs.filter(j => 
        j.title.toLowerCase().includes(q)
      );
    });
  }
}