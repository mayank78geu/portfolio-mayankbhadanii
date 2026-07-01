import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaLaptopCode, FaRegEnvelopeOpen, FaClipboardList } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const bullets = [
    {
      icon: <FaUsers />,
      title: 'Graph-e-thon Hackathon & Summer Internship Planning',
      text: 'Actively contribute to the planning and execution of large-scale skill development initiatives impacting 1000+ students across Graphic Era University.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Graph-e-thon 3.0 Evaluation & Mentorship',
      text: 'Collaborated with industry experts and mentors on the official Evaluation & Mentorship Team. Evaluated student projects on technical depth, innovation, and feasibility while mentoring developers on REST API design, Spring Boot architecture, and frontend-backend integration best practices.'
    },
    {
      icon: <FaClipboardList />,
      title: 'Cross-functional Collaboration',
      text: 'Collaborated cross-functionally with university faculty, industry mentors, and student development teams to deliver high-quality programs aligned with current industry skill demands.'
    },
    {
      icon: <FaRegEnvelopeOpen />,
      title: 'Intern Support & Program Operations',
      text: 'Supported essential curriculum design, targeted outreach emails, official project documentation, and structured intern onboarding for the Summer Internship Program.'
    }
  ];

  return (
    <motion.div 
      className="experience-page page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="ambient-glow exp-glow-1" style={{ top: '20%', left: '15%', width: '400px', height: '400px' }}></div>
      <div className="ambient-glow exp-glow-2" style={{ bottom: '20%', right: '15%', width: '500px', height: '500px' }}></div>

      <div className="container">
        {/* Section Header */}
        <motion.div className="section-header-centered" variants={itemVariants}>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional contributions in student mentorship and technical incubator operations</p>
        </motion.div>

        {/* Core Experience Card */}
        <motion.section className="experience-detail-section" variants={itemVariants}>
            <motion.div 
              className="experience-large-card glass-card"
              whileHover={{ y: -6, scale: 1.005, boxShadow: '0 20px 45px rgba(124, 58, 237, 0.08)' }}
              transition={{ duration: 0.3 }}
            >
            <div className="experience-header-block">
              <div className="exp-icon-box">
                <FaBriefcase />
              </div>
              <div className="exp-title-box">
                <h3 className="role-title">Skill Development Team Member</h3>
                <h4 className="company-title">Tech Business Incubator (TBI), Graphic Era University</h4>
                <div className="exp-meta-row">
                  <span className="exp-meta-item">
                    <FaCalendarAlt /> Feb 2026 – Present
                  </span>
                  <span className="exp-meta-item">
                    <FaMapMarkerAlt /> Dehradun, Uttarakhand
                  </span>
                </div>
              </div>
            </div>

            <div className="experience-achievements-block">
              <h4 className="block-title">Key Responsibilities & Impact</h4>
              <div className="achievement-steps">
                {bullets.map((bullet, index) => (
                  <motion.div 
                    className="step-item" 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="step-icon">
                      {bullet.icon}
                    </div>
                    <div className="step-text-content">
                      <h5 className="step-title">{bullet.title}</h5>
                      <p className="step-description">{bullet.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Experience;
