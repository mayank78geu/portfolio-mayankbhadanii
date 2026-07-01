import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="page-wrapper container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2>About Me</h2>
      <p>Placeholder content for About Me page.</p>
    </motion.div>
  );
};

export default About;
