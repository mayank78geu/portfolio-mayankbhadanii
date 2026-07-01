import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaSun, FaMoon, FaDownload } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics & Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' }
  ];

  // Scrolled effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Monogram Logo "M" */}
        <Link to="/" className="nav-logo">
          <span className="logo-text">M</span>
          <div className="logo-glow"></div>
        </Link>

        {/* Right Section containing Nav Links & Controls */}
        <div className="nav-right-section">
          {/* Desktop Nav Links */}
          <div className="nav-menu-desktop">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="nav-active-indicator"
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons (Theme Toggle & Resume Download) */}
          <div className="nav-controls">
            {/* Theme Toggle */}
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>

            {/* Resume Download (Desktop only in navbar) */}
            <a 
              href="https://drive.google.com/file/d/1fLXSrr0QwiilpkEgeA7KbiLsBkLjGAg7/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-resume-btn btn btn-secondary"
              title="View Resume"
            >
              <FaDownload size={12} /> <span>Resume</span>
            </a>
          </div>

          {/* Mobile Nav Button */}
          <button 
            className="nav-mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-menu-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-links">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Mobile controls inside drawer */}
              <div className="mobile-drawer-controls">
                <a 
                  href="https://drive.google.com/file/d/1fLXSrr0QwiilpkEgeA7KbiLsBkLjGAg7/view?usp=sharing" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-resume-btn btn btn-primary"
                >
                  <FaDownload /> View Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
