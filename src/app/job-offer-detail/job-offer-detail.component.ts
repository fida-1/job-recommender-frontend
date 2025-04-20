// src/app/components/job-offer-detail/job-offer-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobOffer } from '../models/joboffer';
import { JobOfferService } from '../services/joboffer.service';


@Component({
  selector: 'app-job-offer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="job-list-wrapper">
      <div class="job-list-container">
        <button class="view-details-btn" (click)="goBack()">
          ← Back to List
        </button>

        <div *ngIf="loading" class="loading-overlay">
          <div class="loading-spinner"></div>
        </div>

        <div *ngIf="!loading && job" class="job-card">
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
          <p><strong>Required Skills:</strong> {{ job.requiredSkills }}</p>
          <p><strong>Published on:</strong> {{ job.publicationDate | date }}</p>
          <p><strong>Status:</strong> {{ job.active ? 'Active' : 'Closed' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* même styles que dans job-offer-list.component.ts pour garder l’uniformité */
    .job-list-wrapper {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      min-height: 100vh;
      padding: 40px 20px;
      position: relative;
    }
    .job-list-container { max-width: 800px; margin: 0 auto; }
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
    .view-details-btn {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: white; border: none; padding: 8px 16px;
      border-radius: 8px; cursor: pointer; font-weight: 600;
      display: inline-flex; align-items: center; gap: 6px;
      margin-bottom: 20px;
    }
    .view-details-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,86,179,0.2);
    }
    .job-card {
      background: white; border-radius: 12px; padding: 25px;
      box-shadow: 0 4px 15px rgba(0,86,179,0.1);
      border: 1px solid #e2e8f0;
    }
    .job-title { color: #0056b3; margin-bottom: 15px; font-size: 1.8rem; }
    .job-company, .job-location {
      display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
    }
    .job-company svg, .job-location svg { fill: #2d3748; }
    .job-meta { display: flex; gap: 10px; margin-bottom: 15px; }
    .job-salary {
      background: #f8f9fa; color: #2d3748;
      padding: 5px 12px; border-radius: 20px; font-size: 0.9rem;
    }
    .job-description { color: #4a5568; line-height: 1.6; margin-bottom: 15px; }
  `]
})
export class JobOfferDetailComponent implements OnInit {
  job: JobOffer | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id') || '';
    const id = Number(idStr);
    this.jobOfferService.getJobOffer(id).subscribe({
      next: job => { this.job = job; this.loading = false; },
      error: err => { console.error(err); this.loading = false; }
    });
  }

  goBack(): void {
    this.router.navigate(['/job-offers']);
  }
}
