import React from 'react';
import { motion } from 'framer-motion';
import './DeveloperAvatar.css';

const DeveloperAvatar = () => {
  return (
    <div className="avatar-wrapper">
      {/* Background radial glow */}
      <div className="avatar-glow"></div>
      
      {/* Hand-drawn style callout */}
      <div className="avatar-callout">
        <span className="callout-text">Hello! I am</span>
        <svg className="callout-arrow" width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 25C15 20 25 10 32 2" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 2C29 2 32 2 32 2C32 2 32 5 32 8" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Main SVG Avatar */}
      <motion.div 
        className="avatar-svg-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="developer-svg">
          {/* Outer Ring Glow */}
          <circle cx="100" cy="100" r="90" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" strokeDasharray="5 5" />
          
          {/* Base Desk Top */}
          <path d="M40 160H160" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" strokeLinecap="round" />
          
          {/* Character Body */}
          <path d="M70 160V140C70 130 80 120 90 120H110C120 120 130 130 130 140V160" fill="rgba(124, 58, 237, 0.2)" stroke="var(--accent)" strokeWidth="2" />
          
          {/* Head & Neck */}
          <rect x="92" y="105" width="16" height="20" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <circle cx="100" cy="85" r="25" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="2" />
          
          {/* Hair */}
          <path d="M75 80C75 60 100 55 105 55C115 55 125 65 125 80C120 75 110 75 100 80C90 75 80 75 75 80Z" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          
          {/* Glasses */}
          <rect x="85" y="80" width="12" height="8" rx="2" stroke="var(--accent-bright)" strokeWidth="2" />
          <rect x="103" y="80" width="12" height="8" rx="2" stroke="var(--accent-bright)" strokeWidth="2" />
          <line x1="97" y1="84" x2="103" y2="84" stroke="var(--accent-bright)" strokeWidth="2" />

          {/* Headphones (glowing neon) */}
          <path d="M72 85C72 65 128 65 128 85" stroke="var(--glow-soft)" strokeWidth="4" strokeLinecap="round" />
          <rect x="68" y="80" width="8" height="15" rx="3" fill="var(--glow-primary)" />
          <rect x="124" y="80" width="8" height="15" rx="3" fill="var(--glow-primary)" />
          
          {/* Glowing Laptop */}
          <path d="M65 155L75 130H125L135 155H65Z" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          {/* Code screen glow */}
          <rect x="78" y="133" width="44" height="20" rx="1" fill="rgba(124, 58, 237, 0.4)" stroke="var(--accent-bright)" strokeWidth="1" />
          {/* Code lines */}
          <line x1="82" y1="137" x2="100" y2="137" stroke="var(--accent-bright)" strokeWidth="2" strokeLinecap="round" />
          <line x1="82" y1="142" x2="114" y2="142" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          <line x1="82" y1="147" x2="95" y2="147" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" strokeLinecap="round" />
          
          {/* Floating Web & Java Elements */}
          {/* Floating code brackets "< >" */}
          <motion.g
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <path d="M35 85L25 90L35 95" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 85L55 90L45 95" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>

          {/* Floating braces "{ }" */}
          <motion.g
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
          >
            <text x="155" y="90" fill="var(--accent-bright)" fontSize="18" fontFamily="monospace" fontWeight="bold">{"{"}</text>
            <text x="170" y="115" fill="var(--accent-bright)" fontSize="18" fontFamily="monospace" fontWeight="bold">{"}"}</text>
          </motion.g>

          {/* Floating AI stars */}
          <motion.path 
            d="M150 50L152 54L156 55L152 56L150 60L148 56L144 55L148 54L150 50Z" 
            fill="var(--accent-bright)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <motion.path 
            d="M45 55L46 58L49 59L46 60L45 63L44 60L41 59L44 58L45 55Z" 
            fill="var(--accent)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default DeveloperAvatar;
