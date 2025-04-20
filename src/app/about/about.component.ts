import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-wrapper">
      <div class="about-container">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-text">
              <div class="tagline">
                <svg class="sparkle-icon" viewBox="0 0 24 24">
                  <path d="M12,2L13.7,8.3L20,10L13.7,11.7L12,18L10.3,11.7L4,10L10.3,8.3L12,2Z" />
                </svg>
                <span>AI-Powered Recruitment</span>
              </div>
              <h1>Transforming Careers <br>With Intelligent Matching</h1>
              <p class="hero-description">
                Our platform combines cutting-edge artificial intelligence with human insight to create perfect career connections.
              </p>
              <div class="achievement-badges">
                <div class="badge">
                  <svg class="badge-icon" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.5,8L11,13.5L7.5,10L6,11.5L11,16.5Z" />
                  </svg>
                  <span>10,000+ Successful Matches</span>
                </div>
                <div class="badge">
                  <svg class="badge-icon" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.5,8L11,13.5L7.5,10L6,11.5L11,16.5Z" />
                  </svg>
                  <span>95% Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div class="hero-visual">
              <div class="floating-elements">
                <div class="circle-element"></div>
                <div class="square-element"></div>
                <div class="triangle-element"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Value Propositions -->
        <section class="value-props">
          <div class="section-header">
            <svg class="section-icon" viewBox="0 0 24 24">
              <path d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,13.6 14.1,15.3 12,15.3C9.9,15.3 8.2,13.6 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M7,17V18H17V17C17,15.8 16.2,15 15,15H9C7.8,15 7,15.8 7,17Z" />
            </svg>
            <h2>Why Choose Our Platform</h2>
            <p>We're redefining how candidates and companies connect</p>
          </div>

          <div class="prop-cards">
            <!-- Card 1 -->
            <div class="prop-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,13.6 14.1,15.3 12,15.3C9.9,15.3 8.2,13.6 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M7,17V18H17V17C17,15.8 16.2,15 15,15H9C7.8,15 7,15.8 7,17Z" />
                </svg>
              </div>
              <h3>Smart Matching</h3>
              <p>Our AI analyzes 50+ professional criteria to find your perfect match with 92% accuracy.</p>
              <div class="decorative-line"></div>
            </div>

            <!-- Card 2 -->
            <div class="prop-card highlighted">
              <div class="card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.2V15.7C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.8V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                </svg>
              </div>
              <h3>Privacy First</h3>
              <p>Enterprise-grade security with GDPR compliance and end-to-end encryption.</p>
              <div class="decorative-line"></div>
            </div>

            <!-- Card 3 -->
            <div class="prop-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,13.6 14.1,15.3 12,15.3C9.9,15.3 8.2,13.6 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M7,17V18H17V17C17,15.8 16.2,15 15,15H9C7.8,15 7,15.8 7,17Z" />
                </svg>
              </div>
              <h3>Continuous Learning</h3>
              <p>Our system improves with every interaction, constantly refining its recommendations.</p>
              <div class="decorative-line"></div>
            </div>
          </div>
        </section>

        <!-- Testimonials -->
        <section class="testimonials">
          <div class="section-header">
            <svg class="section-icon" viewBox="0 0 24 24">
              <path d="M18,14H12V16H18V14M18,10H12V12H18V10M20,19H12V17H20M10,17H4V19H10M12,13H10V15H12M8,11H6V13H8M12,9H10V11H12M20,13H18V15H20M20,9H18V11H20M12,5H10V7H12M8,15H6V17H8M20,5H18V7H20M12,1H10V3H12M8,7H6V9H8M4,11H6V9H4M4,15H6V13H4M4,7H6V5H4V7Z" />
            </svg>
            <h2>Success Stories</h2>
            <p>Hear from those who've transformed their careers</p>
          </div>

          <div class="testimonial-cards">
            <div class="testimonial-card">
              <div class="quote-icon">"</div>
              <p class="testimonial-text">This platform matched me with my dream job in just 2 weeks. The AI understood my skills better than any recruiter ever had.</p>
              <div class="user-info">
                <div class="avatar"></div>
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Senior UX Designer at TechCorp</p>
                </div>
              </div>
            </div>

            <div class="testimonial-card">
              <div class="quote-icon">"</div>
              <p class="testimonial-text">We found 3 perfect candidates for our engineering team in half the time of traditional hiring. The quality was exceptional.</p>
              <div class="user-info">
                <div class="avatar"></div>
                <div>
                  <h4>Michael Chen</h4>
                  <p>CTO at StartupHub</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="cta-section">
          <div class="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>Join thousands of professionals and companies finding their perfect matches</p>
            <button class="cta-button" routerLink="/create-profile">Get Started</button>
          </div>
          <div class="cta-decoration">
            <div class="decorative-dots"></div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #1a365d;
      --secondary-color: #2563eb;
      --accent-color: #e11d48;
      --success-color: #16a34a;
      --text-dark: #1e293b;
      --text-light: #64748b;
      --border-color: #e2e8f0;
      --background-light: #f8fafc;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .about-wrapper {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .about-container {
      background: white;
      border-radius: 1.5rem;
      box-shadow: var(--shadow-md);
      max-width: 1400px;
      width: 100%;
      overflow: hidden;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 5rem 4rem;
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      display: flex;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .hero-text {
      flex: 1;
      padding-right: 3rem;
    }

    .tagline {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
    }

    .sparkle-icon {
      width: 24px;
      height: 24px;
      fill: var(--accent-color);
      margin-right: 12px;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.1rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
      max-width: 600px;
    }

    .achievement-badges {
      display: flex;
      gap: 1.5rem;
    }

    .badge {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background: rgba(255,255,255,0.1);
      border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.2);
      font-size: 0.9rem;
    }

    .badge-icon {
      width: 20px;
      height: 20px;
      fill: white;
      margin-right: 10px;
    }

    .hero-visual {
      flex: 1;
      position: relative;
      height: 400px;
    }

    .floating-elements {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .circle-element, .square-element, .triangle-element {
      position: absolute;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
    }

    .circle-element {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      top: 20%;
      right: 10%;
    }

    .square-element {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      top: 50%;
      right: 30%;
    }

    .triangle-element {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid rgba(255,255,255,0.1);
      top: 30%;
      right: 20%;
    }

    /* Value Propositions */
    .value-props {
      padding: 5rem 4rem;
      background: white;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-icon {
      width: 48px;
      height: 48px;
      fill: var(--primary-color);
      margin-bottom: 1.5rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .section-header p {
      color: var(--text-light);
      font-size: 1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .prop-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .prop-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid var(--border-color);
      transition: var(--transition);
      position: relative;
    }

    .prop-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .prop-card.highlighted {
      border-color: var(--secondary-color);
      background: rgba(37, 99, 235, 0.03);
    }

    .card-icon {
      width: 60px;
      height: 60px;
      background: rgba(37, 99, 235, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .card-icon svg {
      width: 30px;
      height: 30px;
      fill: var(--primary-color);
    }

    .prop-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--text-dark);
    }

    .prop-card p {
      color: var(--text-light);
      margin-bottom: 2rem;
    }

    .decorative-line {
      height: 4px;
      width: 60px;
      background: var(--primary-color);
      border-radius: 2px;
    }

    /* Testimonials */
    .testimonials {
      padding: 5rem 4rem;
      background: var(--background-light);
    }

    .testimonial-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .testimonial-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid var(--border-color);
      position: relative;
    }

    .quote-icon {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      font-size: 4rem;
      font-weight: 700;
      color: var(--border-color);
    }

    .testimonial-text {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--text-dark);
      margin-bottom: 2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--border-color);
      margin-right: 1rem;
    }

    /* CTA Section */
    .cta-section {
      padding: 5rem 4rem;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      text-align: center;
    }

    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .cta-button {
      background: white;
      color: var(--primary-color);
      border: none;
      padding: 1rem 2.5rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition);
      margin-top: 1.5rem;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .hero-content {
        flex-direction: column;
        text-align: center;
      }
      
      .hero-text {
        padding-right: 0;
        margin-bottom: 3rem;
      }
      
      .achievement-badges {
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .hero-section, 
      .value-props, 
      .testimonials, 
      .cta-section {
        padding: 3rem 2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h2 {
        font-size: 1.75rem;
      }

      .prop-cards,
      .testimonial-cards {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .about-wrapper {
        padding: 1rem;
      }

      .hero-section {
        padding: 2rem 1.5rem;
      }

      .badge {
        width: 100%;
        justify-content: center;
      }

      .cta-button {
        width: 100%;
      }
    }
  `]
})
export class AboutComponent {
  constructor() { }
}