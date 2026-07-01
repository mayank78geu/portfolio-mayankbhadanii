import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaCloud, FaBrain, FaWrench, FaBookOpen, FaFolderOpen, FaGraduationCap } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const categories = [
    {
      title: 'Programming Languages',
      icon: <FaCode />,
      skills: ['Java', 'Python', 'C', 'JavaScript', 'PHP', 'SQL', 'HTML5', 'CSS3']
    },
    {
      title: 'Frameworks & Libraries',
      icon: <FaServer />,
      skills: ['Spring Boot', 'React.js', 'Next.js', 'Spring MVC', 'Spring Data JPA', 'REST API']
    },
    {
      title: 'Databases',
      icon: <FaDatabase />,
      skills: ['MySQL', 'PostgreSQL', 'MongoDB (NoSQL)', 'JDBC']
    },
    {
      title: 'Cloud & DevOps',
      icon: <FaCloud />,
      skills: ['AWS (EC2, S3, IAM)', 'Git', 'GitHub', 'Linux (Basic)']
    },
    {
      title: 'AI & API Integration',
      icon: <FaBrain />,
      skills: ['Google Gemini API', 'RESTful API Design', 'JSON', 'Postman']
    },
    {
      title: 'Developer Tools',
      icon: <FaWrench />,
      skills: ['IntelliJ IDEA', 'VS Code', 'Postman', 'Maven']
    },
    {
      title: 'Core CS Concepts',
      icon: <FaBookOpen />,
      skills: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Agile/Scrum']
    },
    {
      title: 'Other Skills',
      icon: <FaFolderOpen />,
      skills: ['Microsoft Office Suite', 'Project Documentation']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <motion.div 
      className="skills-page page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="ambient-glow skills-glow-1" style={{ top: '10%', left: '5%', width: '450px', height: '450px' }}></div>
      <div className="ambient-glow skills-glow-2" style={{ bottom: '15%', right: '5%', width: '500px', height: '500px' }}></div>

      <div className="container">
        {/* Section Header */}
        <motion.div className="section-header-centered" variants={itemVariants}>
          <h2 className="section-title">Academics & Skills</h2>
          <p className="section-subtitle">My academic foundations and core software engineering skills</p>
        </motion.div>

        {/* Academic Snapshot */}
        <motion.section className="academic-snapshot-section" variants={itemVariants}>
          <h3 className="section-inner-title"><FaGraduationCap /> Academic Snapshot</h3>
          <div className="academics-grid">
            <div className="academic-card glass-card">
              <span className="academic-tag">Active Degree</span>
              <h4 className="academic-title">Master of Computer Applications (MCA)</h4>
              <p className="academic-inst">Graphic Era Deemed to be University, Dehradun</p>
              <div className="academic-meta">
                <span className="academic-duration">2025 – 2027</span>
                <span className="academic-grade">SGPA: 8.62/10</span>
              </div>
            </div>
            
            <div className="academic-card glass-card">
              <span className="academic-tag tag-completed">Graduated</span>
              <h4 className="academic-title">Bachelor of Computer Applications (BCA)</h4>
              <p className="academic-inst">Arcade Business College, Patna (PPU)</p>
              <div className="academic-meta">
                <span className="academic-duration">2022 – 2025</span>
                <span className="academic-grade">Honours: 79.75%</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <section className="skills-grid-section">
          <motion.h3 className="section-inner-title" variants={itemVariants}><FaCode /> Technical Skillset</motion.h3>
          <div className="skills-grid">
            {categories.map((cat, idx) => (
              <motion.div 
                className="category-card glass-card" 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="category-header">
                  <span className="category-icon">{cat.icon}</span>
                  <h4 className="category-title">{cat.title}</h4>
                </div>
                <div className="category-skills-list">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx} 
                      className="tech-tag skill-pill"
                      whileHover={{ scale: 1.05, color: '#C4B5FD', borderColor: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Skills;
