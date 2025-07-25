import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SecureLife Insurance</h3>
            <p>Protecting what matters most to you and your family for over 50 years.</p>
            <div className="contact-info">
              <p>📞 1-800-SECURE-1</p>
              <p>✉️ info@securelife.com</p>
              <p>📍 123 Insurance Way, Protection City, PC 12345</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Insurance Products</h4>
            <ul>
              <li><a href="#auto">Auto Insurance</a></li>
              <li><a href="#home">Home Insurance</a></li>
              <li><a href="#life">Life Insurance</a></li>
              <li><a href="#business">Business Insurance</a></li>
              <li><a href="#renters">Renters Insurance</a></li>
              <li><a href="#motorcycle">Motorcycle Insurance</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#claims">File a Claim</a></li>
              <li><a href="#pay-bill">Pay Your Bill</a></li>
              <li><a href="#find-agent">Find an Agent</a></li>
              <li><a href="#support">Customer Support</a></li>
              <li><a href="#policy">Manage Policy</a></li>
              <li><a href="#roadside">Roadside Assistance</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#news">News & Media</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#accessibility">Accessibility</a>
            <a href="#cookies">Cookie Policy</a>
            <a href="#california-privacy">California Privacy Rights</a>
          </div>
          <div className="footer-social">
            <a href="#facebook" aria-label="Facebook">📘</a>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#linkedin" aria-label="LinkedIn">💼</a>
            <a href="#youtube" aria-label="YouTube">📺</a>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; 2024 SecureLife Insurance Company. All rights reserved.</p>
          <p>Licensed in all 50 states. NAIC Company Code: 12345</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
