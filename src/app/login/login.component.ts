import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your personalized job recommendations</p>
        </div>
        
        <form (ngSubmit)="login()" class="auth-form">
          <div class="input-group">
            <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
            <span class="input-icon">✉️</span>
          </div>
          <div class="input-group">
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
            <span class="input-icon">🔒</span>
          </div>
          <button type="submit" class="auth-btn">Login</button>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Sign up</a></p>
          <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
      </div>
      
      <div class="auth-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
      </div>
    </div>
  `,
  styles: [`
    /* Main container */
    .auth-container {
      display: flex;
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }
    
    /* Card styling */
    .auth-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 2.5rem;
      width: 100%;
      max-width: 450px;
      margin: auto;
      z-index: 2;
      position: relative;
    }
    
    /* Header section */
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .auth-header h2 {
      color: #0056b3;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .auth-header p {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    /* Form styling */
    .auth-form {
      margin: 2rem 0;
    }
    
    .input-group {
      position: relative;
      margin-bottom: 1.5rem;
    }
    
    .input-group input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background-color: #f8f9fa;
    }
    
    .input-group input:focus {
      border-color: #0056b3;
      box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
      outline: none;
      background-color: white;
    }
    
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
    }
    
    /* Button styling */
    .auth-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #0056b3 0%, #003366 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    
    .auth-btn:hover {
      background: linear-gradient(135deg, #0069d9 0%, #004080 100%);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 86, 179, 0.2);
    }
    
    /* Footer section */
    .auth-footer {
      text-align: center;
      margin-top: 2rem;
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .auth-footer a {
      color: #0056b3;
      text-decoration: none;
      font-weight: 600;
    }
    
    .auth-footer a:hover {
      text-decoration: underline;
    }
    
    /* Error message */
    .error {
      color: #dc3545;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    
    /* Decorative elements */
    .auth-decoration {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
    }
    
    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 86, 179, 0.05);
    }
    
    .decoration-circle:nth-child(1) {
      width: 300px;
      height: 300px;
      top: -100px;
      right: -100px;
    }
    
    .decoration-circle:nth-child(2) {
      width: 200px;
      height: 200px;
      bottom: -50px;
      left: -50px;
    }
    
    .decoration-circle:nth-child(3) {
      width: 150px;
      height: 150px;
      top: 50%;
      left: 30%;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .auth-container {
        padding: 1rem;
      }
      
      .auth-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.authService.redirectToAppropriatePage();
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
      }
    });
  }
  
    
  
}