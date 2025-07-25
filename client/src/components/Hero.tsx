import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>We protect what matters most to you</h1>
          <p>Get comprehensive insurance coverage for your auto, home, life, and business needs. 
             Trusted by millions of customers nationwide.</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>2M+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <span>Family Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
