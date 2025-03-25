import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-list',  // ✅ Assure-toi que c'est bien ce nom
  templateUrl: './candidate-list.component.html',
  imports: [CommonModule],

  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  candidates = [
    { name: 'Jean Dupont', experience: 5 },
    { name: 'Alice Martin', experience: 3 },
    { name: 'Karim Ben Salah', experience: 7 }
  ];
employers: any;
}
