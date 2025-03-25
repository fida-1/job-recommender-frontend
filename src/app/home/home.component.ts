import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="hero">
      <h1>Your Career, Our Commitment!</h1>
      <p>Find the ideal job with our advanced AI-powered recommendations.</p>
      <button class="cta-btn" routerLink="/create-profile">Create a Profile</button>
      <button class="cta-btn" routerLink="/job-offers">Browse Job Offers</button>
      <button class="cta-btn" routerLink="/about">Learn More</button>
    </div>
    <!-- Features Section -->
    <section class="features">
      <div class="feature">
        <a routerLink="/auth">
          <img src="assets/auth.png" alt="Authentication">
          <h3>Secure Authentication</h3>
          <p>Log in securely and access personalized job recommendations.</p>
        </a>
      </div>
      <div class="feature">
        <a routerLink="/ai">
          <img src="assets/ai.png" alt="AI Recommendation">
          <h3>Recommendation Engine</h3>
          <p>Our AI analyzes your profile to find the best job opportunities.</p>
        </a>
      </div>
      <div class="feature">
        <a routerLink="/search">
          <img src="assets/search.png" alt="Search">
          <h3>Advanced Search & Filtering</h3>
          <p>Filter job offers by location, salary, and job type.</p>
        </a>
      </div>
    </section>
    <!-- Statistics Section -->
    <section class="statistics">
      <h2>Our Impact</h2>
      <div class="stats-container">
        <div class="stat">
          <h3>10K+</h3>
          <p>Profiles Created</p>
        </div>
        <div class="stat">
          <h3>50K+</h3>
          <p>Available Job Offers</p>
        </div>
        <div class="stat">
          <h3>95%</h3>
          <p>Satisfaction Rate</p>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer>
      <p>© 2025 Job Recommender System - All Rights Reserved.</p>
    </footer>
  `,
  styles: [`
    /* Style général */
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background: #f8f9fa;
      color: #333;
    }
    
    /* En-tête avec effet de dégradé */
    .hero {
      text-align: center;
      background: linear-gradient(135deg, #0056b3, #003366);
      color: white;
      padding: 60px 20px;
    }
    
    .hero h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    
    .hero p {
      font-size: 1.2em;
      margin-bottom: 20px;
    }
    
    /* Boutons principaux */
    .cta-btn {
      background: #0578dc96;
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      margin: 10px;
      transition: 0.3s;
    }
    
    .cta-btn:hover {
      background: #0578dc96;
    }
    
    /* Section des fonctionnalités */
    .features {
      display: flex;
      justify-content: space-around;
      padding: 60px;
      background: white;
    }
    
    .feature {
      text-align: center;
      width: 30%;
    }
    
    /* Images des fonctionnalités */
    .feature img {
      width: 90px;
      margin-bottom: 15px;
    }
    
    /* Personnalisation des liens dans les fonctionnalités */
    .features .feature a {
      text-decoration: none;
      color: #333;
    }
    
    .features .feature a:hover {
      color: #007BFF;
    }
    
    /* Section des statistiques */
    .statistics {
      text-align: center;
      padding: 60px;
      background: #f8f9fa;
    }
    
    .stats-container {
      display: flex;
      justify-content: center;
      gap: 40px;
    }
    
    .stat {
      background: white;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 200px;
    }
    
    .stat h3 {
      font-size: 2em;
      color: #0056b3;
    }
    
    .stat p {
      font-size: 1.1em;
    }
    
    /* Pied de page */
    footer {
      text-align: center;
      background: #003366;
      color: white;
      padding: 20px;
      font-size: 14px;
    }
  `]
})
export class HomeComponent { }
