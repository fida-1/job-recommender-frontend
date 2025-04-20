// src/app/create-profile/create-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService, Profile, User } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-creation-wrapper">
      <div class="create-profile-container">
        <div class="profile-header">
          <h1>Create Your Profile</h1>
          <p class="subtitle">Join our platform and unlock personalized career opportunities</p>
          <div class="progress-indicator">
            <div class="progress-step" [class.active]="currentStep >= 1">1</div>
            <div class="progress-line"  [class.active]="currentStep >= 2"></div>
            <div class="progress-step" [class.active]="currentStep >= 2">2</div>
            <div class="progress-line"  [class.active]="currentStep >= 3"></div>
            <div class="progress-step" [class.active]="currentStep >= 3">3</div>
          </div>
        </div>

        <form (ngSubmit)="onSubmit()" #profileForm="ngForm" class="profile-form">
          <!-- Step 1: Profile Type -->
          <div class="form-section" *ngIf="currentStep === 1">
            <h2 class="section-title">Profile Type</h2>
            <p class="section-description">Select whether you're creating a candidate or company profile</p>
            <div class="profile-type">
              <label class="profile-option">
                <input type="radio" name="profileType" value="CANDIDATE"
                       [(ngModel)]="profileType" required>
                <div class="option-card">
                  <svg class="option-icon" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                  <span>Candidate</span>
                </div>
              </label>
              <label class="profile-option">
                <input type="radio" name="profileType" value="COMPANY"
                       [(ngModel)]="profileType" required>
                <div class="option-card">
                  <svg class="option-icon" viewBox="0 0 24 24"><path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H20M10,17H4V19H10M12,13H10V15H12M8,11H6V13H8M12,9H10V11H12M20,13H18V15H20M20,9H18V11H20M12,5H10V7H12M8,15H6V17H8M20,5H18V7H20M12,1H10V3H12M8,7H6V9H8M4,11H6V9H4M4,15H6V13H4M4,7H6V5H4V7Z"/></svg>
                  <span>Company</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 2: Basic Information -->
          <div class="form-section" *ngIf="currentStep === 2">
            <h2 class="section-title">Basic Information</h2>
            <p class="section-description">Tell us some basic details about yourself</p>

            <!-- Candidate fields -->
            <ng-container *ngIf="profileType === 'CANDIDATE'">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text"
                       [(ngModel)]="firstName" required placeholder="John">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text"
                       [(ngModel)]="lastName" required placeholder="Doe">
              </div>
            </ng-container>

            <!-- Company fields -->
            <ng-container *ngIf="profileType === 'COMPANY'">
              <div class="form-group">
                <label for="companyName">Company Name</label>
                <input id="companyName" name="companyName" type="text"
                       [(ngModel)]="companyName" required placeholder="Your Company Inc.">
              </div>
            </ng-container>

            <!-- Common fields -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <input id="email" name="email" type="email"
                     [(ngModel)]="email" required placeholder="you@example.com">
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel"
                     [(ngModel)]="phone" required placeholder="+1 (123) 456-7890">
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input id="address" name="address" type="text"
                     [(ngModel)]="address" required placeholder="123 Main St, City">
            </div>
          </div>

          <!-- Step 3: Professional / Additional Details -->
          <div class="form-section" *ngIf="currentStep === 3">
            <h2 class="section-title">
              {{ profileType === 'CANDIDATE' ? 'Professional Details' : 'Additional Details' }}
            </h2>

            <!-- Candidate details -->
            <ng-container *ngIf="profileType === 'CANDIDATE'">
              <div class="form-group">
                <label for="title">Title</label>
                <input id="title" name="title" type="text"
                       [(ngModel)]="title" placeholder="e.g. Software Engineer">
              </div>
              <div class="form-group">
                <label for="skills">Skills</label>
                <input id="skills" name="skills" type="text"
                       [(ngModel)]="skills" placeholder="e.g. Java, Python">
              </div>
              <div class="form-group">
                <label for="experience">Years of Experience</label>
                <input id="experience" name="experience" type="number"
                       [(ngModel)]="experience" placeholder="0">
              </div>
            </ng-container>

            <!-- Company details -->
            <ng-container *ngIf="profileType === 'COMPANY'">
              <div class="form-group">
                <label for="industry">Industry</label>
                <input id="industry" name="industry" type="text"
                       [(ngModel)]="industry" placeholder="e.g. Technology">
              </div>
              <div class="form-group">
                <label for="website">Company Website</label>
                <input id="website" name="website" type="url"
                       [(ngModel)]="website" placeholder="https://yourcompany.com">
              </div>
            </ng-container>
          </div>

          <div class="form-navigation">
            <button type="button" class="back-btn" (click)="prevStep()" [disabled]="currentStep === 1">
              Back
            </button>
            <button type="button" class="next-btn" (click)="nextStep()" [disabled]="!canProceed()" *ngIf="currentStep < 3">
              Continue
            </button>
            <button type="submit" class="submit-btn" *ngIf="currentStep === 3" [disabled]="!profileForm.valid">
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-creation-wrapper {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      min-height: 100vh;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .create-profile-container {
      max-width: 800px;
      width: 100%;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 86, 179, 0.1);
      overflow: hidden;
    }
    .profile-header {
      background: linear-gradient(135deg, #0056b3 0%, #003366 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .profile-header h1 {
      font-size: 2rem;
      margin: 0;
      font-weight: 700;
    }
    .subtitle {
      font-size: 1rem;
      opacity: 0.9;
      margin: 10px 0 20px;
    }
    .progress-indicator {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    .progress-step {
      width: 32px; height: 32px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      color: white; display: flex; justify-content: center; align-items: center;
      font-weight: bold;
    }
    .progress-step.active {
      background: white; color: #0056b3;
    }
    .progress-line {
      width: 60px; height: 2px; background: rgba(255,255,255,0.3); margin: 0 5px;
    }
    .progress-line.active { background: white; }
    .profile-form { padding: 30px; }
    .form-section { margin-bottom: 20px; }
    .section-title { font-size: 1.3rem; color: #0056b3; margin-bottom: 10px; }
    .section-description { color: #718096; margin-bottom: 20px; font-size: 0.9rem; }
    .profile-type { display: flex; gap: 20px; margin-bottom: 20px; }
    .profile-option { flex: 1; cursor: pointer; }
    .profile-option input { display: none; }
    .option-card {
      padding: 20px; border: 2px solid #e0e6ed; border-radius: 10px;
      text-align: center; transition: all 0.3s ease; background: white;
      display: flex; flex-direction: column; align-items: center;
    }
    .profile-option input:checked + .option-card {
      border-color: #0056b3; background: rgba(0,86,179,0.05);
      box-shadow: 0 5px 15px rgba(0,86,179,0.1);
    }
    .option-icon { width: 40px; height: 40px; fill: #0056b3; margin-bottom: 10px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #2d3748; }
    input[type="text"], input[type="email"], input[type="url"],
    input[type="number"], input[type="tel"] {
      width: 100%; padding: 12px; border: 1px solid #e2e8f0;
      border-radius: 8px; font-size: 0.95rem; transition: all 0.3s ease;
    }
    input:focus {
      border-color: #0056b3; outline: none;
      box-shadow: 0 0 0 3px rgba(0,86,179,0.2);
    }
    .form-navigation {
      display: flex; justify-content: space-between; margin-top: 30px;
    }
    .back-btn {
      background: white; color: #0056b3; border: 1px solid #0056b3;
      padding: 12px 24px; font-size: 1rem; font-weight: 600;
      border-radius: 8px; cursor: pointer; transition: all 0.3s ease;
    }
    .back-btn:hover { background: #f0f7ff; }
    .next-btn, .submit-btn {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: white; border: none; padding: 12px 24px;
      font-size: 1rem; font-weight: 600; border-radius: 8px;
      cursor: pointer; transition: all 0.3s ease;
    }
    .next-btn:hover, .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,86,179,0.2);
    }
    .next-btn:disabled, .submit-btn:disabled {
      background: #cbd5e0; cursor: not-allowed; box-shadow: none;
    }
    @media (max-width: 768px) {
      .profile-creation-wrapper { padding: 20px 10px; }
      .create-profile-container { border-radius: 12px; }
      .profile-header { padding: 20px 15px; }
      .profile-header h1 { font-size: 1.5rem; }
      .profile-type { flex-direction: column; }
      .progress-line { width: 30px; }
      .form-navigation { flex-direction: column; gap: 10px; }
      .next-btn, .submit-btn, .back-btn { width: 100%; margin-left: 0; }
    }
  `]
})
export class CreateProfileComponent implements OnInit {
  currentStep = 1;
  profileType = '' as 'CANDIDATE' | 'COMPANY';

  // Common fields
  email = '';
  phone = '';
  address = '';

  // Candidate fields
  firstName = '';
  lastName = '';
  title = '';               // <-- New title field
  skills = '';
  experience: number | null = null;

  // Company fields
  companyName = '';
  industry = '';
  website = '';

  userId!: number;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.authService.getCurrentUserId();
    if (id === null) {
      this.router.navigate(['/login']);
      return;
    }
    this.userId = id;
    this.profileService.loadUserProfile(id).subscribe(profile => {
      if (profile) {
        if (profile.profileType === 'CANDIDATE') {
          this.router.navigate(['/full-home']);
        } else {
          this.router.navigate(['/company-home']);
        }
      }
    });
  }

  nextStep(): void {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  canProceed(): boolean {
    if (this.currentStep === 1) return !!this.profileType;
    if (this.currentStep === 2) {
      return this.profileType === 'CANDIDATE'
        ? !!this.firstName && !!this.lastName && !!this.email && !!this.phone && !!this.address
        : !!this.companyName && !!this.email && !!this.phone && !!this.address;
    }
    return true;
  }

  onSubmit(): void {
    const base: any = {
      profileType: this.profileType,
      email: this.email,
      phone: this.phone,
      address: this.address,
      user: { id: this.userId } as User
    };

    const profile: Profile = {
      ...base,
      ...(this.profileType === 'CANDIDATE' && {
        firstName: this.firstName,
        lastName: this.lastName,
        title: this.title,           // <-- include title
        skills: this.skills,
        experience: this.experience
      }),
      ...(this.profileType === 'COMPANY' && {
        companyName: this.companyName,
        industry: this.industry,
        website: this.website
      })
    };

    this.profileService.addProfile(profile).subscribe({
      next: () => {
        alert('Profile created successfully!');
        if (this.profileType === 'CANDIDATE') {
          this.router.navigate(['/full-home']);
        } else {
          this.router.navigate(['/company-home']);
        }
      },
      error: err => {
        console.error('Error creating profile:', err);
        alert('There was an error creating your profile. Please try again.');
      }
    });
  }
}
