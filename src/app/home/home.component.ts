import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>Welcome to Job Recommender</h1>
        <p class="subtitle">Discover who we are and start your journey!</p>
        
        <div class="cta-container">
          <div class="buttons">
            <button class="cta-btn" routerLink="/register">
              <span class="btn-text">Get Started</span>
              <span class="btn-icon">🚀</span>
            </button>
            <button class="cta-btn secondary" routerLink="/login">
              <span class="btn-text">Login</span>
              <span class="btn-icon">🔑</span>
            </button>
          </div>
          
          <button class="about-btn" routerLink="/about">
            <span class="btn-text">About Us</span>
            <span class="btn-icon">ℹ️</span>
          </button>
        </div>
      </div>
      
      <div class="hero-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
      </div>
    </div>
  `,
  styles: [`
    /* Main hero section */
    .hero {
      min-height: 100vh;
      background: linear-gradient(135deg, #0056b3 0%, #003366 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }
    
    .hero-content {
      text-align: center;
      max-width: 800px;
      z-index: 2;
      position: relative;
    }
    
    h1 {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
      background: linear-gradient(to right, #fff 0%, #e6f0ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .subtitle {
      font-size: 1.5rem;
      margin-bottom: 3rem;
      color: rgba(255, 255, 255, 0.9);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Button container */
    .cta-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    
    .buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    /* Button styling */
    .cta-btn, .about-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.25rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .cta-btn {
      background: linear-gradient(135deg, #ffffff 0%, #e6f0ff 100%);
      color: #0056b3;
    }
    
    .cta-btn.secondary {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .about-btn {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }
    
    .cta-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 86, 179, 0.3);
    }
    
    .cta-btn.secondary:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .about-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    .btn-icon {
      font-size: 1.2em;
    }
    
    /* Decorative elements */
    .hero-decoration {
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
      background: rgba(255, 255, 255, 0.05);
    }
    
    .decoration-circle:nth-child(1) {
      width: 400px;
      height: 400px;
      top: -150px;
      right: -150px;
    }
    
    .decoration-circle:nth-child(2) {
      width: 300px;
      height: 300px;
      bottom: -100px;
      left: -100px;
    }
    
    .decoration-circle:nth-child(3) {
      width: 200px;
      height: 200px;
      top: 30%;
      left: 20%;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }
      
      .subtitle {
        font-size: 1.2rem;
      }
      
      .buttons {
        flex-direction: column;
        gap: 1rem;
      }
      
      .cta-btn, .about-btn {
        padding: 1rem 2rem;
      }
    }
    
    @media (max-width: 480px) {
      h1 {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1rem;
      }
      
      .hero {
        padding: 2rem 1rem;
      }
    }
  `]
})
export class HomeComponent {}
