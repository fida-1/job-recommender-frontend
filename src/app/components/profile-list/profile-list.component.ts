import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  imports: [CommonModule],
  
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) { }
  

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(
      data => this.profiles = data,
      error => console.error(error)
    );
  }
}
