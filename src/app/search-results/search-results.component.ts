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
    <div class="search-results-container">
      <div class="search-card">
        <div class="search-header">
          <h2 class="search-title">"{{ searchTerm }}"</h2>
          <p class="results-count">{{ getTotalResults() }} résultats trouvés</p>
        </div>

        <div class="results-section">
          <div *ngIf="searchCompanies.length" class="category-block">
            <h3 class="category-title">
              <span class="icon">🏢</span>
              Entreprises <span class="badge">{{ searchCompanies.length }}</span>
            </h3>
            <ul class="results-list">
              <li *ngFor="let company of searchCompanies" class="result-item company-item">
                <div class="item-content">
                  <span class="highlight">{{ company.companyName }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div *ngIf="searchJobs.length" class="category-block">
            <h3 class="category-title">
              <span class="icon">💼</span>
              Offres d'emploi <span class="badge">{{ searchJobs.length }}</span>
            </h3>
            <ul class="results-list">
              <li *ngFor="let job of searchJobs" class="result-item job-item">
                <div class="item-content">
                  <span class="job-title">{{ job.title }}</span>
                  <span class="company-name">{{ job.company }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div *ngIf="!searchCompanies.length && !searchJobs.length" class="no-results">
            <div class="no-results-content">
              <span class="icon">🔍</span>
              <p>Aucun résultat trouvé pour<br>"{{ searchTerm }}"</p>
            </div>
          </div>
        </div>
      </div>

      <div class="decorative-elements">
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
        <div class="decorative-circle circle-3"></div>
      </div>
    </div>
  `,
  styles: [`
    /* Variables CSS */
    :root {
      --primary-color: #0056b3;
      --secondary-color: #e6f0f8;
      --text-color: #333;
      --muted-text: #6c757d;
      --background-gradient: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      --shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    }

    /* Main container */
    .search-results-container {
      display: flex;
      min-height: 100vh;
      background: var(--background-gradient);
      padding: 2rem;
      position: relative;
      overflow: hidden;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }

    /* Card styling */
    .search-card {
      background: white;
      border-radius: 20px;
      box-shadow: var(--shadow);
      padding: 2.5rem;
      width: 100%;
      max-width: 800px;
      margin: auto;
      z-index: 2;
      position: relative;
      transition: transform 0.3s ease;
    }

    /* Header */
    .search-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .search-title {
      color: var(--primary-color);
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 0.25rem;
    }

    .results-count {
      color: var(--muted-text);
      font-size: 0.95rem;
      font-weight: 500;
    }

    /* Results section */
    .category-block {
      margin-bottom: 2.5rem;
    }

    .category-title {
      color: var(--text-color);
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .badge {
      background: var(--secondary-color);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .results-list {
      display: grid;
      gap: 0.75rem;
    }

    .result-item {
      background: white;
      padding: 1.25rem;
      border-radius: 12px;
      border: 1px solid #e9ecef;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .result-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow);
      border-color: var(--primary-color);
    }

    .item-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .highlight {
      color: var(--primary-color);
      font-weight: 500;
    }

    .job-title {
      font-weight: 600;
      color: var(--text-color);
    }

    .company-name {
      color: var(--muted-text);
      font-size: 0.9rem;
    }

    /* No results */
    .no-results {
      text-align: center;
      padding: 3rem 0;
    }

    .no-results-content {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .no-results-content .icon {
      font-size: 2.5rem;
      opacity: 0.8;
    }

    .no-results p {
      color: var(--muted-text);
      font-size: 1.1rem;
      line-height: 1.5;
    }

    /* Decorative elements */
    .decorative-elements {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
    }

    .decorative-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 86, 179, 0.05);
      filter: blur(40px);
      animation: float 20s infinite ease-in-out;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      right: -100px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      bottom: -50px;
      left: -50px;
      animation-delay: 5s;
    }

    .circle-3 {
      width: 150px;
      height: 150px;
      top: 50%;
      left: 30%;
      animation-delay: 10s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .search-results-container {
        padding: 1rem;
      }

      .search-card {
        padding: 1.5rem;
        border-radius: 16px;
      }

      .search-title {
        font-size: 1.8rem;
      }

      .category-title {
        font-size: 1.1rem;
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