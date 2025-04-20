// src/app/edit-profile/edit-profile.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService, Profile } from '../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="form-wrapper">
      <div class="form-card">
        <div class="form-header">
          <div class="header-icon">
            {{ original.profileType === 'CANDIDATE' ? '👤' : '🏢' }}
          </div>
          <h2>Edit Profile</h2>
          <p class="subtitle">
            {{ original.profileType === 'CANDIDATE'
               ? 'Update your personal details'
               : 'Update your company details' }}
          </p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSave()" class="profile-form">
          <div class="form-grid">
            <!-- CANDIDATE fields -->
            <ng-container *ngIf="original.profileType === 'CANDIDATE'">
              <div class="form-group">
                <label>Title</label>
                <div class="input-container">
                  <input formControlName="title"
                         [readonly]="!editing" />
                  <span class="input-icon">🎩</span>
                </div>
              </div>
              <div class="form-group">
                <label>First Name</label>
                <div class="input-container">
                  <input formControlName="firstName"
                         [readonly]="!editing" required />
                  <span class="input-icon">👤</span>
                </div>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <div class="input-container">
                  <input formControlName="lastName"
                         [readonly]="!editing" required />
                  <span class="input-icon">👥</span>
                </div>
              </div>
              <div class="form-group full-width">
                <label>Skills</label>
                <div class="input-container">
                  <input formControlName="skills"
                         [readonly]="!editing" />
                  <span class="input-icon">🛠️</span>
                </div>
              </div>
              <div class="form-group">
                <label>Experience (years)</label>
                <div class="input-container">
                  <input type="number"
                         formControlName="experience"
                         [readonly]="!editing" />
                  <span class="input-icon">📈</span>
                </div>
              </div>
            </ng-container>

            <!-- COMMON fields -->
            <div class="form-group"
                 [class.full-width]="original.profileType === 'CANDIDATE'">
              <label>Email</label>
              <div class="input-container">
                <input formControlName="email"
                       type="email"
                       [readonly]="!editing" required />
                <span class="input-icon">📧</span>
              </div>
            </div>
            <div class="form-group"
                 [class.full-width]="original.profileType === 'CANDIDATE'">
              <label>Phone</label>
              <div class="input-container">
                <input formControlName="phone"
                       [readonly]="!editing" required />
                <span class="input-icon">📞</span>
              </div>
            </div>

            <!-- COMPANY fields -->
            <ng-container *ngIf="original.profileType === 'COMPANY'">
              <div class="form-group">
                <label>Company Name</label>
                <div class="input-container">
                  <input formControlName="companyName"
                         [readonly]="!editing" required />
                  <span class="input-icon">🏢</span>
                </div>
              </div>
              <div class="form-group">
                <label>Industry</label>
                <div class="input-container">
                  <input formControlName="industry"
                         [readonly]="!editing" />
                  <span class="input-icon">🏭</span>
                </div>
              </div>
              <div class="form-group full-width">
                <label>Website</label>
                <div class="input-container">
                  <input formControlName="website"
                         [readonly]="!editing" />
                  <span class="input-icon">🌐</span>
                </div>
              </div>
              <div class="form-group full-width">
                <label>Address</label>
                <div class="input-container">
                  <input formControlName="address"
                         [readonly]="!editing" />
                  <span class="input-icon">🏠</span>
                </div>
              </div>
            </ng-container>
          </div>

          <div class="form-actions">
            <!-- BACK -->
            <button type="button"
                    class="cancel-btn"
                    [routerLink]="original.profileType === 'CANDIDATE' ? '/full-home' : '/company-home'">
              Back
            </button>

            <!-- CANCEL édit -->
            <button *ngIf="editing"
                    type="button"
                    class="cancel-btn"
                    (click)="onCancel()">
              Cancel
            </button>

            <!-- ACTIVER édition -->
            <button *ngIf="!editing"
                    type="button"
                    class="edit-btn"
                    (click)="enableEdit()">
              Edit
            </button>

            <!-- SAUVEGARDER -->
            <button *ngIf="editing"
                    type="submit"
                    class="submit-btn"
                    [disabled]="form.invalid">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* wrapper & card */
    .form-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #eef4ff 0%, #f8fbff 100%);
      padding: 2rem;
    }
    .form-card {
      width: 100%;
      max-width: 700px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 82, 204, 0.1);
      overflow: hidden;
    }

    /* header */
    .form-header {
      padding: 2rem 1.5rem;
      background: linear-gradient(135deg, #3366ff, #6699ff);
      color: white;
      text-align: center;
    }
    .header-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    h2 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .subtitle {
      margin: 0.5rem 0 0;
      opacity: 0.85;
      font-size: 0.95rem;
    }

    /* form layout */
    .profile-form {
      padding: 2rem 1.5rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .full-width {
      grid-column: 1 / -1;
    }

    /* inputs */
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }
    .input-container {
      position: relative;
    }
    input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #dbe4ff;
      border-radius: 6px;
      font-size: 0.95rem;
      background-color: #f5f8ff;
      transition: all 0.3s ease;
    }
    input:focus {
      outline: none;
      border-color: #3366ff;
      box-shadow: 0 0 0 3px rgba(51,102,255,0.1);
      background-color: white;
    }
    .input-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.1rem;
      color: #3366ff;
    }

    /* actions */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
    button {
      padding: 0.7rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .cancel-btn {
      background: white;
      color: #64748b;
      border: 1px solid #e2e8f0;
    }
    .cancel-btn:hover {
      background: #f0f7ff;
      border-color: #cbd5e1;
      color: #3366ff;
    }
    .edit-btn {
      background: #fff;
      color: #3366ff;
      border: 1px solid #3366ff;
    }
    .edit-btn:hover {
      background: #e6ecff;
    }
    .submit-btn {
      background: linear-gradient(135deg, #3366ff, #6699ff);
      color: white;
      border: none;
    }
    .submit-btn:hover {
      background: linear-gradient(135deg, #254eda, #5588ee);
      box-shadow: 0 4px 12px rgba(51,102,255,0.2);
    }

    @media (max-width: 768px) {
      .form-grid { grid-template-columns: 1fr; }
      .form-header { padding: 1.5rem 1rem; }
      .profile-form { padding: 1.5rem 1rem; }
      .form-actions { flex-direction: column; }
      button { width: 100%; }
    }
  `]
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;
  editing = false;
  original!: Profile;

  private profileId!: number;
  private userId!: number;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.currentProfile$.subscribe(p => {
      if (!p) {
        this.router.navigate(['/create-profile']);
        return;
      }
      this.original  = { ...p };
      this.profileId = p.id!;
      this.userId    = p.user.id;

      // Build form based on profileType
      const base = {
        email:   [p.email, [Validators.required, Validators.email]],
        phone:   [p.phone, Validators.required]
      };
      let group: any = { ...base };

      if (p.profileType === 'CANDIDATE') {
        group.title     = [p.title];  // Added title
        group.firstName  = [p.firstName, Validators.required];
        group.lastName   = [p.lastName, Validators.required];
        group.skills     = [p.skills];
        group.experience = [p.experience];
      } else {
        group.companyName = [p.companyName, Validators.required];
        group.industry    = [p.industry];
        group.website     = [p.website];
        group.address     = [p.address];
      }

      this.form = this.fb.group(group);
    });
  }

  enableEdit(): void {
    this.editing = true;
  }

  onCancel(): void {
    // restore original values
    const p = this.original;
    const reset: any = {
      email: p.email,
      phone: p.phone
    };
    if (p.profileType === 'CANDIDATE') {
      reset.title     = p.title; // Added title
      reset.firstName  = p.firstName;
      reset.lastName   = p.lastName;
      reset.skills     = p.skills;
      reset.experience = p.experience;
    } else {
      reset.companyName = p.companyName;
      reset.industry    = p.industry;
      reset.website     = p.website;
      reset.address     = p.address;
    }
    this.form.patchValue(reset);
    this.editing = false;
  }

  onSave(): void {
    if (this.form.invalid) { return; }
    if (!confirm('Confirm profile update?')) { return; }

    const updated: Profile = {
      ...this.original,               // keep id, profileType & user
      ...this.form.value
    };
    updated.user = { id: this.userId };

    this.profileService.updateProfile(this.profileId, updated)
      .subscribe(p => {
        this.original = { ...p };
        this.form.patchValue(p);
        this.editing = false;
        alert('Profile updated successfully!');
      }, _ => {
        alert('Error updating profile; please try again.');
      });
  }
}