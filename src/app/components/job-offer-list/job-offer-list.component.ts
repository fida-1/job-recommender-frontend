import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../models/joboffer';
import { JobOfferService } from '../../services/joboffer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-offer-list',
  templateUrl: './job-offer-list.component.html',
  imports: [CommonModule],
  
  styleUrls: ['./job-offer-list.component.css']
})
export class JobOfferListComponent implements OnInit {
  jobOffers: JobOffer[] = [];

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.getJobOffers();
  }

  getJobOffers(): void {
    this.jobOfferService.getJobOffers().subscribe((data: JobOffer[]) => {
      this.jobOffers = data;
    });
  }
}
