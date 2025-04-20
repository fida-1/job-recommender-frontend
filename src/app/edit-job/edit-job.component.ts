// src/app/edit-job/edit-job.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobOfferService } from '../services/joboffer.service';
import { JobOffer } from '../models/joboffer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="form-wrapper">
      <div class="form-card">
        <div class="form-header">
          <div class="header-icon">✏️</div>
          <h2>Edit Job Offer</h2>
          <p class="subtitle">Update the details below to keep your listing fresh</p>
        </div>

        <form *ngIf="jobOffer" (ngSubmit)="onSubmit()" class="job-form">
          <div class="form-grid">
            <div class="form-group">
              <label>Job Title</label>
              <div class="input-container">
                <input type="text" [(ngModel)]="jobOffer.title" name="title" required>
                <span class="input-icon">📝</span>
              </div>
            </div>

            <div class="form-group">
              <label>Location</label>
              <div class="input-container">
                <input type="text" [(ngModel)]="jobOffer.location" name="location" required>
                <span class="input-icon">📍</span>
              </div>
            </div>

            <div class="form-group">
              <label>Salary (TND)</label>
              <div class="input-container">
                <input type="number" [(ngModel)]="jobOffer.salary" name="salary" required>
                <span class="input-icon">💰</span>
              </div>
            </div>

            <div class="form-group">
              <label>Contract Type</label>
              <div class="input-container">
                <select [(ngModel)]="jobOffer.type" name="type" required>
                  <option value="CDI">Full Time (CDI)</option>
                  <option value="CDD">Contract (CDD)</option>
                  <option value="Freelance">Freelance</option>
                </select>
                <span class="input-icon">📄</span>
              </div>
            </div>

            <div class="form-group full-width">
              <label>Required Skills</label>
              <div class="input-container">
                <input type="text" [(ngModel)]="jobOffer.requiredSkills" name="requiredSkills" required>
                <span class="input-icon">🛠️</span>
              </div>
            </div>

            <div class="form-group full-width">
              <label>Job Description</label>
              <div class="input-container">
                <textarea [(ngModel)]="jobOffer.description" name="description" rows="5" required></textarea>
                <span class="input-icon">📋</span>
              </div>
            </div>

            <div class="form-group">
              <label>Publication Date</label>
              <div class="input-container">
                <input type="date" [(ngModel)]="jobOffer.publicationDate" name="publicationDate" required>
                <span class="input-icon">📅</span>
              </div>
            </div>

            <div class="form-group">
              <label>Active</label>
              <div class="input-container checkbox-container">
                <input type="checkbox" [(ngModel)]="jobOffer.active" name="active">
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" routerLink="/view-posted-jobs">
              <span>Cancel</span>
            </button>
            <button type="submit" class="submit-btn">
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Styles identiques à PostJobComponent */
    .form-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
      padding: 2rem;
    }

    .form-card {
      width: 100%;
      max-width: 900px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 82, 204, 0.1);
      overflow: hidden;
    }

    .form-header {
      padding: 2.5rem 2rem;
      background: linear-gradient(135deg, #0052cc, #0066ff);
      color: white;
      text-align: center;
      position: relative;
    }

    .header-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .subtitle {
      margin: 0.5rem 0 0;
      opacity: 0.9;
      font-size: 0.95rem;
    }

    .job-form {
      padding: 2.5rem 2rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    label {
      display: block;
      margin-bottom: 0.75rem;
      color: #2c3e50;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .input-container {
      position: relative;
    }

    input, select, textarea {
      width: 100%;
      padding: 0.85rem 1rem 0.85rem 2.75rem;
      border: 1px solid #e0e8ff;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      background-color: #f8faff;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #0052cc;
      box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
      background-color: white;
    }

    textarea {
      min-height: 140px;
      resize: vertical;
      padding-top: 1rem;
    }

    select {
      appearance: none;
      background: #f8faff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230052cc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 1rem center/12px;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #0052cc;
      font-size: 1.1rem;
    }

    textarea + .input-icon {
      top: 1.25rem;
      transform: none;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    button {
      padding: 0.9rem 2rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cancel-btn {
      background: white;
      color: #64748b;
      border: 1px solid #e2e8f0;
    }

    .cancel-btn:hover {
      color: #0052cc;
      border-color: #cbd5e1;
      background: #f8faff;
    }

    .submit-btn {
      background: linear-gradient(135deg, #0052cc, #0066ff);
      color: white;
      border: none;
    }

    .submit-btn:hover {
      background: linear-gradient(135deg, #0047b3, #005ce6);
      box-shadow: 0 4px 12px rgba(0, 82, 204, 0.2);
    }

    .checkbox-container {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-left: 2.75rem;
    }

    @media (max-width: 768px) {
      .form-wrapper {
        padding: 1rem;
      }

      .form-header {
        padding: 1.5rem 1rem;
      }

      .job-form {
        padding: 1.5rem 1rem;
      }

      .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .form-actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }

      .input-container input, 
      .input-container select, 
      .input-container textarea {
        padding-left: 2.5rem;
      }
    }
  `]
})
export class EditJobComponent implements OnInit {
  jobOffer: JobOffer | null = null;
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private jobOfferService: JobOfferService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobOfferService.getJobOffer(this.id).subscribe({
      next: job => this.jobOffer = job,
      error: () => alert('Unable to load job details.')
    });
  }

  onSubmit() {
    if (!this.jobOffer) return;
    
    if (!confirm('Are you sure you want to update this job?')) return;

    this.jobOfferService.updateJobOffer(this.id, this.jobOffer).subscribe({
      next: () => {
        alert('Job updated successfully!');
        this.router.navigate(['/view-posted-jobs']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert(`Error: ${err.error?.message || 'Failed to update job'}`);
      }
    });
  }
}