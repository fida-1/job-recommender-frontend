import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
            <div class="progress-line" [class.active]="currentStep >= 2"></div>
            <div class="progress-step" [class.active]="currentStep >= 2">2</div>
            <div class="progress-line" [class.active]="currentStep >= 3"></div>
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
                <input type="radio" name="profileType" value="candidate" [(ngModel)]="profileType" required>
                <div class="option-card">
                  <svg class="option-icon" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                  <span>Candidate</span>
                </div>
              </label>
              <label class="profile-option">
                <input type="radio" name="profileType" value="company" [(ngModel)]="profileType" required>
                <div class="option-card">
                  <svg class="option-icon" viewBox="0 0 24 24">
                    <path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H20M10,17H4V19H10M12,13H10V15H12M8,11H6V13H8M12,9H10V11H12M20,13H18V15H20M20,9H18V11H20M12,5H10V7H12M8,15H6V17H8M20,5H18V7H20M12,1H10V3H12M8,7H6V9H8M4,11H6V9H4M4,15H6V13H4M4,7H6V5H4V7Z" />
                  </svg>
                  <span>Company</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 2: Basic Information -->
          <div class="form-section" *ngIf="currentStep === 2">
            <h2 class="section-title">Basic Information</h2>
            <p class="section-description">Tell us some basic details about yourself</p>
            <div class="form-group">
              <label for="name">Full Name</label>
              <div class="input-with-icon">
                <svg class="input-icon" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <input id="name" name="name" type="text" [(ngModel)]="name" required placeholder="John Doe">
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-with-icon">
                <svg class="input-icon" viewBox="0 0 24 24">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                </svg>
                <input id="email" name="email" type="email" [(ngModel)]="email" required placeholder="your@email.com">
              </div>
            </div>
          </div>

          <!-- Step 3: Professional Details -->
          <div class="form-section" *ngIf="currentStep === 3">
            <h2 class="section-title">{{ profileType === 'candidate' ? 'Professional Details' : 'Company Information' }}</h2>
            <p class="section-description">{{ profileType === 'candidate' ? 'Tell us about your professional background' : 'Provide details about your company' }}</p>

            <!-- Candidate specific fields -->
            <div *ngIf="profileType === 'candidate'">
              <div class="form-group">
                <label for="resume">Upload Resume</label>
                <div class="file-upload">
                  <label for="resume" class="upload-area">
                    <svg class="upload-icon" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,15V13H16V15H8M8,11V9H16V11H8Z" />
                    </svg>
                    <span>{{ resumeFile ? resumeFile.name : 'Click to upload PDF' }}</span>
                  </label>
                  <input id="resume" name="resume" type="file" (change)="onFileChange($event)" accept=".pdf" hidden>
                </div>
              </div>
              <div class="form-group">
                <label for="skills">Skills</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M7,2V4H8V18A4,4 0 0,0 12,22A4,4 0 0,0 16,18V4H17V2H7M11,16C10.4,16 10,15.6 10,15C10,14.4 10.4,14 11,14C11.6,14 12,14.4 12,15C12,15.6 11.6,16 11,16M13,12C12.4,12 12,11.6 12,11C12,10.4 12.4,10 13,10C13.6,10 14,10.4 14,11C14,11.6 13.6,12 13,12M14,7H10V4H14V7Z" />
                  </svg>
                  <input id="skills" name="skills" type="text" [(ngModel)]="skills" placeholder="e.g. Java, Python, Angular">
                </div>
              </div>
              <div class="form-group">
                <label for="experience">Years of Experience</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M16.24,7.76C15.07,6.58 13.53,6 12,6V12L16.24,7.76Z" />
                  </svg>
                  <input id="experience" name="experience" type="number" [(ngModel)]="experience" placeholder="0">
                </div>
              </div>
            </div>

            <!-- Company specific fields -->
            <div *ngIf="profileType === 'company'">
              <div class="form-group">
                <label for="companyName">Company Name</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H20M10,17H4V19H10M12,13H10V15H12M8,11H6V13H8M12,9H10V11H12M20,13H18V15H20M20,9H18V11H20M12,5H10V7H12M8,15H6V17H8M20,5H18V7H20M12,1H10V3H12M8,7H6V9H8M4,11H6V9H4M4,15H6V13H4M4,7H6V5H4V7Z" />
                  </svg>
                  <input id="companyName" name="companyName" type="text" [(ngModel)]="companyName" required placeholder="Your Company Inc.">
                </div>
              </div>
              <div class="form-group">
                <label for="industry">Industry</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M12,2L1,12H4V22H20V12H23L12,2M12,5L18,11V20H14V14H10V20H6V11L12,5Z" />
                  </svg>
                  <input id="industry" name="industry" type="text" [(ngModel)]="industry" required placeholder="e.g. Technology, Finance">
                </div>
              </div>
              <div class="form-group">
                <label for="website">Company Website</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                  <input id="website" name="website" type="url" [(ngModel)]="website" placeholder="https://yourcompany.com">
                </div>
              </div>
              <div class="form-group">
                <label for="companyPhone">Phone Number</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                  </svg>
                  <input id="companyPhone" name="companyPhone" type="text" [(ngModel)]="companyPhone" required placeholder="+1 (123) 456-7890">
                </div>
              </div>
              <div class="form-group">
                <label for="companyAddress">Company Address</label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                  </svg>
                  <input id="companyAddress" name="companyAddress" type="text" [(ngModel)]="companyAddress" required placeholder="123 Main St, City, Country">
                </div>
              </div>
            </div>
          </div>

          <div class="form-navigation">
            <button *ngIf="currentStep > 1" type="button" class="back-btn" (click)="prevStep()">
              Back
            </button>
            <button *ngIf="currentStep < 3" type="button" class="next-btn" (click)="nextStep()" [disabled]="!canProceed()">
              Continue
              <svg class="submit-icon" viewBox="0 0 24 24">
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
            </button>
            <button *ngIf="currentStep === 3" type="submit" class="submit-btn" [disabled]="!profileForm.valid">
              Complete Profile
              <svg class="submit-icon" viewBox="0 0 24 24">
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
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
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }

    .progress-step.active {
      background: white;
      color: #0056b3;
    }

    .progress-line {
      width: 60px;
      height: 2px;
      background: rgba(255, 255, 255, 0.3);
      margin: 0 5px;
    }

    .progress-line.active {
      background: white;
    }

    .profile-form {
      padding: 30px;
    }

    .form-section {
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 1.3rem;
      color: #0056b3;
      margin-bottom: 10px;
    }

    .section-description {
      color: #718096;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }

    .profile-type {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .profile-option {
      flex: 1;
      cursor: pointer;
    }

    .profile-option input {
      display: none;
    }

    .option-card {
      padding: 20px;
      border: 2px solid #e0e6ed;
      border-radius: 10px;
      text-align: center;
      transition: all 0.3s ease;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .profile-option input:checked + .option-card {
      border-color: #0056b3;
      background: rgba(0, 86, 179, 0.05);
      box-shadow: 0 5px 15px rgba(0, 86, 179, 0.1);
    }

    .option-icon {
      width: 40px;
      height: 40px;
      fill: #0056b3;
      margin-bottom: 10px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #2d3748;
    }

    .input-with-icon {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      fill: #718096;
      z-index: 1;
    }

    input[type="text"],
    input[type="email"],
    input[type="url"],
    input[type="number"],
    input[type="tel"] {
      width: 100%;
      padding: 12px 12px 12px 40px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #0056b3;
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
    }

    .file-upload {
      position: relative;
    }

    .upload-area {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border: 2px dashed #cbd5e0;
      border-radius: 8px;
      background: #f8fafc;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .upload-area:hover {
      border-color: #0056b3;
      background: rgba(0, 86, 179, 0.05);
    }

    .upload-icon {
      width: 24px;
      height: 24px;
      fill: #718096;
      margin-right: 10px;
    }

    .form-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .back-btn {
      background: white;
      color: #0056b3;
      border: 1px solid #0056b3;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: #f0f7ff;
    }

    .next-btn, .submit-btn {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .next-btn:hover, .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 86, 179, 0.2);
    }

    .next-btn:disabled, .submit-btn:disabled {
      background: #cbd5e0;
      transform: none;
      box-shadow: none;
      cursor: not-allowed;
    }

    .submit-icon {
      width: 20px;
      height: 20px;
      fill: white;
    }

    @media (max-width: 768px) {
      .profile-creation-wrapper {
        padding: 20px 10px;
      }

      .create-profile-container {
        border-radius: 12px;
      }

      .profile-header {
        padding: 20px 15px;
      }

      .profile-header h1 {
        font-size: 1.5rem;
      }

      .profile-type {
        flex-direction: column;
      }

      .progress-line {
        width: 30px;
      }

      .form-navigation {
        flex-direction: column;
        gap: 10px;
      }

      .next-btn, .submit-btn {
        width: 100%;
        margin-left: 0;
      }

      .back-btn {
        width: 100%;
      }
    }
  `]
})
export class CreateProfileComponent {
  currentStep: number = 1;
  profileType: string = '';
  name: string = '';
  email: string = '';

  // Candidate specific fields
  resumeFile: File | null = null;
  skills: string = '';
  experience: number | null = null;

  // Company specific fields
  companyName: string = '';
  industry: string = '';
  website: string = '';
  companyPhone: string = '';
  companyAddress: string = '';

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  canProceed(): boolean {
    if (this.currentStep === 1) {
      return !!this.profileType;
    } else if (this.currentStep === 2) {
      return !!this.name && !!this.email;
    }
    return false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.resumeFile = file;
    } else {
      alert('Please upload a valid PDF file.');
    }
  }

  onSubmit(): void {
    console.log('Profile created:', {
      profileType: this.profileType,
      name: this.name,
      email: this.email,
      ...(this.profileType === 'candidate' && {
        resumeFile: this.resumeFile ? this.resumeFile.name : 'No file uploaded',
        skills: this.skills,
        experience: this.experience
      }),
      ...(this.profileType === 'company' && {
        companyName: this.companyName,
        industry: this.industry,
        website: this.website,
        companyPhone: this.companyPhone,
        companyAddress: this.companyAddress
      })
    });
  }
}