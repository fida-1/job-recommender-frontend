import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  imports: [CommonModule],
  
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications(): void {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }
}
