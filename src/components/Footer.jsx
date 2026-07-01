import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-info">
            <h3 className="footer-title">Mayank Kumar</h3>
            <p className="footer-subtitle">Full Stack Developer | MCA Candidate | AI Integration Enthusiast</p>
            <div className="footer-meta">
              <span className="meta-item">
                <FaMapMarkerAlt className="meta-icon" /> Dehradun, India
              </span>
              <span className="meta-item">
                <FaPhoneAlt className="meta-icon" /> +91-6200482891
              </span>
            </div>
          </div>
          
          <div className="footer-socials">
            <a href="https://github.com/mayank78geu" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/mayank78stu" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:mayank78stu@gmail.com" className="social-link" aria-label="Email">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} Mayank Kumar. All rights reserved.</p>
          <p className="footer-build">Built with React, Vite & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
