// src/app/view-posted-jobs/view-posted-jobs.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobOfferService } from '../services/joboffer.service';
import { JobOffer } from '../models/joboffer';

@Component({
  selector: 'app-view-posted-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-row">
        <h2>My Posted Offers</h2>
        <button routerLink="/post-job" class="new-offer-btn">
          + Post a new offer
        </button>
      </div>

      <table *ngIf="jobOffers.length > 0; else noOffers" class="job-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let job of jobOffers">
            <td>{{ job.title }}</td>
            <td>{{ job.location }}</td>
            <td>{{ job.salary }} TND</td>
            <td>{{ job.publicationDate }}</td>
            <td>{{ job.active ? 'Active' : 'Inactive' }}</td>
            <td class="actions">
              <!-- Édition -->
              <button [routerLink]="['/edit-job', job.id]" class="edit-btn">✏️</button>
              <!-- Suppression -->
              <button (click)="deleteOffer(job.id)" class="delete-btn">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #noOffers>
        <p class="no-data">No offers have been posted yet.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      background-color: #f4f8fc;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    h2 {
      color: #1a237e;
      margin: 0;
    }
    .job-table { width: 100%; border-collapse: collapse; }
    .job-table th, .job-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .job-table th {
      background-color: #1a237e; color: white;
    }
    .job-table tr:hover { background-color: #e3f2fd; }
    .actions { display: flex; gap: 10px; }
    .job-table button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      padding: 0 5px;
    }
    .edit-btn { color: #1a237e; }
    .delete-btn { color: red; }
    .no-data {
      text-align: center;
      color: #777;
      margin-top: 20px;
    }
    .new-offer-btn {
      background-color: #0a66c2;
      color: white;
      border: none;
      border-radius: 24px;
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;
    }
  `]
})
export class ViewPostedJobsComponent implements OnInit {
  jobOffers: JobOffer[] = [];

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

  private loadJobOffers(): void {
    this.jobOfferService.getMyJobOffers().subscribe({
      next: offers => this.jobOffers = offers,
      error: err => alert('Error while retrieving offers: ' + err.message)
    });
  }

  deleteOffer(id?: number): void {
    if (id && confirm('Confirm deletion?')) {
      this.jobOfferService.deleteJobOffer(id).subscribe({
        next: () => this.loadJobOffers(),
        error: () => alert('Unable to delete this offer.')
      });
    }
  }
}
