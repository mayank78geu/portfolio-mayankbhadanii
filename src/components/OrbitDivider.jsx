import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTerminal, FaDatabase } from 'react-icons/fa';
import './OrbitDivider.css';

const OrbitDivider = () => {
  return (
    <div className="orbit-divider-wrapper">
      <div className="orbit-glow"></div>
      
      {/* Concentric rings */}
      <div className="orbit-container">
        {/* Ring 3 (Outer) */}
        <motion.div 
          className="orbit-ring ring-outer"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orbit-glyph glyph-db">
            <FaDatabase size={12} />
          </div>
        </motion.div>

        {/* Ring 2 (Middle) */}
        <motion.div 
          className="orbit-ring ring-middle"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orbit-glyph glyph-terminal">
            <FaTerminal size={10} />
          </div>
        </motion.div>

        {/* Ring 1 (Inner) */}
        <motion.div 
          className="orbit-ring ring-inner"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orbit-glyph glyph-code">
            <FaCode size={10} />
          </div>
        </motion.div>

        {/* Center Badge */}
        <div className="orbit-center-badge">
          <span className="badge-text">M</span>
          <div className="badge-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default OrbitDivider;
