import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {
  employers: Employer[] = [];

  constructor(private employerService: EmployerService) {}

  ngOnInit(): void {
    this.getEmployers();
  }

  getEmployers(): void {
    this.employerService.getEmployers().subscribe(data => {
      this.employers = data;
    });
  }
}
