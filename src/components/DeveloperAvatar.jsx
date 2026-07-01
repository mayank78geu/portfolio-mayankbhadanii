import React from 'react';
import { motion } from 'framer-motion';
import myImg from '../assets/myimg.png';
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

      {/* Main Image Avatar */}
      <motion.div 
        className="avatar-image-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <div className="avatar-image-frame">
          <img src={myImg} alt="Mayank Kumar" className="avatar-img" />
          <div className="avatar-frame-glow"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeveloperAvatar;
