import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <motion.div 
      className="page-wrapper container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Projects</h2>
      <p>Placeholder content for Projects page.</p>
    </motion.div>
  );
};

export default Projects;
