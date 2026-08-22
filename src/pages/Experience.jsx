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
      title: 'Graph-e-thon Hackathons & Skill Development Initiatives',
      text: 'Lead and coordinate university-wide technical bootcamps and skill acceleration programs impacting 1,000+ engineering and computer applications students across Graphic Era University.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Graph-e-thon 3.0 Technical Evaluation & Mentorship',
      text: 'Served on the official Technical Evaluation & Mentorship Team. Evaluated complex project architectures on technical feasibility and clean code, while mentoring developers on Java Spring Boot backend design, RESTful API contracts, and React integration.'
    },
    {
      icon: <FaClipboardList />,
      title: 'Industry & Faculty Cross-Functional Alignment',
      text: 'Collaborated with tech industry experts, startup mentors, and university faculty to curate modern hands-on learning modules matching enterprise software standards and cloud deployment workflows.'
    },
    {
      icon: <FaRegEnvelopeOpen />,
      title: 'Intern Onboarding & Curriculum Architecture',
      text: 'Spearheaded technical curriculum authoring, outreach communication, and end-to-end intern onboarding documentation for structured incubation training cohorts.'
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
          <h2 className="section-title">Work Experience & Leadership</h2>
          <p className="section-subtitle">Professional contributions in student mentorship, software architecture evaluation, and incubator operations</p>
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
                <h3 className="role-title">Skill Development Team Member & Technical Mentor</h3>
                <h4 className="company-title">Tech Business Incubator (TBI), Graphic Era University</h4>
                <div className="exp-meta-row">
                  <span className="exp-meta-item">
                    <FaCalendarAlt /> Feb 2026 – Present
                  </span>
                  <span className="exp-meta-item">
                    <FaMapMarkerAlt /> Dehradun, Uttarakhand, India
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
