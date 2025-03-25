import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-profile-container">
      <h1>Create Your Profile</h1>
      <p>Please select your profile type and fill in the details below.</p>

      <form (ngSubmit)="onSubmit()" #profileForm="ngForm">
        <div class="profile-type">
          <label>
            <input type="radio" name="profileType" value="candidate" [(ngModel)]="profileType" required>
            Candidate
          </label>
          <label>
            <input type="radio" name="profileType" value="employee" [(ngModel)]="profileType" required>
            Employee
          </label>
        </div>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" name="name" type="text" [(ngModel)]="name" required>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input id="email" name="email" type="email" [(ngModel)]="email" required>
        </div>

        <button type="submit" [disabled]="!profileForm.valid" class="submit-btn">Create Profile</button>
      </form>
    </div>
  `,
  styles: [`
    .create-profile-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    h1 {
      text-align: center;
    }
    .profile-type {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-around;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input[type="text"],
    input[type="email"] {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    .submit-btn {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .submit-btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class CreateProfileComponent {
  profileType: string = '';
  name: string = '';
  email: string = '';

  onSubmit(): void {
    console.log('Profile created:', {
      profileType: this.profileType,
      name: this.name,
      email: this.email
    });
  }
}
