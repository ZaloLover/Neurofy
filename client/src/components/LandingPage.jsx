// src/components/LandingPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    pricing: false,
    testimonials: false
  });
  
  // Add state for header scroll
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  // Apply body styles when component mounts
  useEffect(() => {
    // Save original styles to restore later
    const originalStyle = document.body.style.cssText;
    
    // Apply new styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#121212';
    
    // Set up intersection observer for animations
    const observerOptions = {
      threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);
    
    // Observe sections
    const sections = ['features', 'pricing', 'testimonials'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    
    // Add scroll event listener for header effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger handleScroll once to set initial state
    handleScroll();
    
    // Clean up
    return () => {
      document.body.style.cssText = originalStyle;
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Header - now with dynamic scrolled class */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`} ref={headerRef}>
        <div className="header-content">
          <h1 className="logo">Neurofy</h1>
          <nav>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Testimonials</a>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="sign-up-button">Sign up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">
            AI-powered<br />
            Memory Enhancement<br />
            Platform
          </h2>
          
          <p className="hero-subtitle">
            Revolutionize the way you learn and memorize with Neurofy's<br />
            advanced AI technology designed for students and lifelong learners.
          </p>
          
          <div className="hero-buttons">
            <Link to="/register" className="primary-button">Get Started Free</Link>
            <a href="#features" className="secondary-button">How It Works</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`features-section ${isVisible.features ? 'fade-in' : ''}`}>
        <div className="section-content">
          <h2 className="section-title">Why Choose Neurofy</h2>
          <p className="section-subtitle">Powerful features to enhance your learning experience</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17V17.01" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>AI-Powered Learning</h3>
              <p>Our adaptive learning algorithm personalizes your study plan based on your performance, focusing on what you need most.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12H15" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H15" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12H9.01" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 16H9.01" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3V7" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H15" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Spaced Repetition</h3>
              <p>Optimized review intervals ensure maximum retention with minimum time investment, based on proven memory science.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Progress</h3>
              <p>Our users report a 35% increase in learning speed and 42% better retention compared to traditional study methods.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H8C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6C18 4.89543 17.1046 4 16 4Z" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Mobile Learning</h3>
              <p>Study anywhere with our seamless cross-platform experience that syncs your progress across all your devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`pricing-section ${isVisible.pricing ? 'fade-in' : ''}`}>
        <div className="section-content">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Plans that grow with your learning needs</p>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Free</h3>
                <p className="price">$0<span>/month</span></p>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Basic memorization tools</li>
                  <li>Up to 50 flashcards</li>
                  <li>Daily learning reminders</li>
                  <li>Basic progress tracking</li>
                </ul>
              </div>
              <Link to="/register" className="pricing-button">Start for Free</Link>
            </div>
            
            <div className="pricing-card popular">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Student</h3>
                <p className="price">$8<span>/month</span></p>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Everything in Free plan</li>
                  <li>Unlimited flashcards</li>
                  <li>AI-powered study optimization</li>
                  <li>Advanced statistics</li>
                  <li>File uploads (images, audio)</li>
                </ul>
              </div>
              <Link to="/register" className="pricing-button primary">Choose Student</Link>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Pro</h3>
                <p className="price">$15<span>/month</span></p>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Everything in Student plan</li>
                  <li>Priority support</li>
                  <li>Collaboration features</li>
                  <li>Early access to new features</li>
                  <li>API access</li>
                </ul>
              </div>
              <Link to="/register" className="pricing-button">Choose Pro</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`testimonials-section ${isVisible.testimonials ? 'fade-in' : ''}`}>
        <div className="section-content">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">Join thousands of satisfied learners</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Neurofy transformed my study habits. I'm retaining information much longer and my exam scores have improved dramatically."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SA</div>
                <div className="testimonial-info">
                  <h4>Sarah A.</h4>
                  <p>Medical Student</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As a language learner, I've tried dozens of apps. Neurofy is by far the most effective for vocabulary retention. I'm finally making real progress!"</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">MJ</div>
                <div className="testimonial-info">
                  <h4>Michael J.</h4>
                  <p>Language Enthusiast</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The AI recommendations are spot on. It's like having a personal tutor that knows exactly what I need to review and when."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">EL</div>
                <div className="testimonial-info">
                  <h4>Emily L.</h4>
                  <p>High School Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Supercharge Your Memory?</h2>
          <p>Join Neurofy today and experience the future of learning.</p>
          <Link to="/register" className="cta-button">Get Started Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Neurofy</h2>
            <p>AI-powered memory enhancement</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Neurofy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;