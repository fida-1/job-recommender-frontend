import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  imports: [CommonModule],
  
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  cvs = [
    { id: 1, name: 'John Doe', position: 'Développeur Full Stack', experience: '5 ans' },
    { id: 2, name: 'Jane Smith', position: 'Ingénieur DevOps', experience: '3 ans' },
    { id: 3, name: 'Ali Mohamed', position: 'Data Scientist', experience: '4 ans' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
