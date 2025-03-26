import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-wrapper">
      <div class="about-container">
        <div class="profile-header">
          <h1>Revolutionizing Job Matching</h1>
          <p class="subtitle">Where Artificial Intelligence Meets Career Opportunities</p>
          <div class="platform-highlight">
            <span class="ai-badge">Powered by AI</span>
            <span class="users-counter">10,000+ Successful Matches</span>
          </div>
        </div>

        <div class="features">
          <div class="feature">
            <h2 class="section-title">Our Innovation</h2>
            <p class="section-content">
              We've developed a proprietary AI algorithm that analyzes over 50 professional criteria to match candidates with ideal opportunities. Our system continuously learns from user feedback to improve recommendation accuracy.
            </p>
          </div>
          <div class="feature">
            <h2 class="section-title">For Candidates</h2>
            <p class="section-content">
              Get personalized job recommendations based on your skills, experience, and career aspirations. Our smart system considers company culture fit and growth potential to suggest opportunities you'll love.
            </p>
          </div>
          <div class="feature">
            <h2 class="section-title">For Employers</h2>
            <p class="section-content">
              Discover top talent that truly matches your needs. Our AI evaluates both technical qualifications and soft skills, reducing hiring time by 40% while improving candidate quality.
            </p>
          </div>
        </div>

        <div class="statistics">
          <h2>Our Core Values</h2>
          <div class="stats-container">
            <div class="stat">
              <h3>Smart Matching</h3>
              <p>Advanced ML algorithms for precision</p>
            </div>
            <div class="stat">
              <h3>Privacy First</h3>
              <p>GDPR-compliant data protection</p>
            </div>
            <div class="stat">
              <h3>Continuous Learning</h3>
              <p>System improves with every interaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-wrapper {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      min-height: 100vh;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .about-container {
      max-width: 1200px;
      width: 100%;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 86, 179, 0.1);
      overflow: hidden;
    }

    .profile-header {
      background: linear-gradient(135deg, #0056b3 0%, #003366 100%);
      color: white;
      padding: 60px 40px;
      text-align: center;
      position: relative;
    }

    .profile-header h1 {
      font-size: 2.5rem;
      margin: 0 0 15px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0 auto 30px;
      max-width: 700px;
    }

    .platform-highlight {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
    }

    .ai-badge, .users-counter {
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .ai-badge {
      background: #e11d48;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .users-counter {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 60px;
    }

    .feature {
      background: white;
      padding: 30px;
      border-radius: 10px;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
    }

    .feature:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 86, 179, 0.1);
      border-left-color: #e11d48;
    }

    .section-title {
      font-size: 1.4rem;
      color: #0056b3;
      margin-bottom: 15px;
      font-weight: 600;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 50px;
      height: 3px;
      background: #e11d48;
    }

    .section-content {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.7;
      margin-top: 20px;
    }

    .statistics {
      text-align: center;
      padding: 60px;
      background: #f8f9fa;
    }

    .statistics h2 {
      font-size: 2rem;
      color: #0056b3;
      margin-bottom: 40px;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .stat {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .stat:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 86, 179, 0.15);
    }

    .stat h3 {
      font-size: 1.3rem;
      color: #0056b3;
      margin-bottom: 10px;
    }

    .stat p {
      font-size: 1rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .profile-header {
        padding: 40px 20px;
      }

      .profile-header h1 {
        font-size: 1.8rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .features {
        padding: 30px 20px;
        grid-template-columns: 1fr;
      }

      .statistics {
        padding: 40px 20px;
      }

      .stats-container {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 1024px) {
      .features {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class AboutComponent {
  constructor() { }
}