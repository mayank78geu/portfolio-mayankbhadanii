import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaCertificate, FaUsers, FaBook, FaWrench } from 'react-icons/fa';
import myImg from '../assets/myimg.png';
import './About.css';

const About = () => {
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

  const education = [
    {
      institution: 'Graphic Era Deemed to be University',
      degree: 'Master of Computer Applications (MCA)',
      location: 'Dehradun, Uttarakhand',
      period: '2025 – 2027',
      grade: 'Current SGPA: 8.62/10',
      coursework: ['Data Structures & Algorithms', 'Advanced DBMS', 'Software Engineering', 'Cloud Computing', 'OOP', 'Web Technologies']
    },
    {
      institution: 'Arcade Business College (Patliputra University)',
      degree: 'Bachelor of Computer Applications (BCA)',
      location: 'Patna, Bihar',
      period: '2022 – 2025',
      grade: 'Honours: 79.75%',
      coursework: ['C/C++ Programming', 'Desktop Application Development', 'RDBMS', 'Operating Systems', 'Computer Networks', 'Data Structures']
    }
  ];

  const achievements = [
    {
      title: 'Winner — IDE Bootcamp 2025, Phase II',
      organizer: "AICTE, MoE & MoE's Innovation Cell",
      year: '2025',
      desc: 'Regional-level winner among hundreds of teams across India for BestPath, a tech-for-social-good career guidance platform designed for rural students.'
    },
    {
      title: "Top 10 — Cloud Ignite '26 Quiz",
      organizer: 'AWS Cloud Club, GEU',
      year: '2026',
      desc: 'Achieved Top 10 in a competitive cloud computing quiz testing AWS fundamentals, architecture best practices, and cloud services knowledge.'
    }
  ];

  const certifications = [
    { name: 'AWS Cloud Essentials', issuer: 'Amazon Web Services', year: '2025' },
    { name: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', year: '2025' },
    { name: 'Java Programming Training', issuer: 'Spoken Tutorial, IIT Bombay', year: '2024', details: 'Score: 84%' },
    { name: 'C Programming Training', issuer: 'Spoken Tutorial, IIT Bombay', year: '2023', details: 'Score: 100%' }
  ];

  const responsibility = {
    role: 'Evaluation & Mentorship Team — Graph-e-thon 3.0',
    org: 'Tech Business Incubator, Graphic Era University',
    year: '2026',
    points: [
      'Evaluated student projects on technical depth, innovation, and feasibility; provided structured feedback to participating teams.',
      'Mentored student developers on REST API design, Spring Boot architecture, and frontend-backend integration best practices.'
    ]
  };

  return (
    <motion.div 
      className="about-page page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="ambient-glow about-glow-1" style={{ top: '15%', left: '10%', width: '400px', height: '400px' }}></div>
      <div className="ambient-glow about-glow-2" style={{ top: '50%', right: '10%', width: '500px', height: '500px' }}></div>

      <div className="container">
        {/* About Headline */}
        <motion.div className="section-header-centered" variants={itemVariants}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A glimpse into my journey, education, and credentials</p>
        </motion.div>

        {/* Narrative Block */}
        <motion.section className="narrative-section" variants={itemVariants}>
          <div className="narrative-card glass-card">
            <div className="narrative-grid">
              <div className="narrative-image-col">
                <div className="about-avatar-wrapper">
                  <img src={myImg} alt="Mayank Kumar" className="about-avatar-img" />
                  <div className="about-avatar-glow"></div>
                </div>
              </div>
              <div className="narrative-text-col">
                <h3 className="card-headline">My Story</h3>
                <p>
                  Hi, I'm Mayank Kumar. My coding journey started with a fascination for solving problems, leading me to complete my <strong>BCA</strong> at Arcade Business College in Patna. I am now pursuing my <strong>MCA</strong> at Graphic Era Deemed to be University in Dehradun, aiming to master high-performance, enterprise-grade development.
                </p>
                <p>
                  I specialize in <strong>end-to-end product development</strong>. Whether it is architecting relational schemas, developing robust backends using Java & Spring Boot, or engineering smooth interfaces in React, I love making parts move together seamlessly.
                </p>
                <p>
                  Lately, I have been focused on **AI API integrations** (such as Google Gemini) to build tools that solve real problems. As a Skill Development Team Member at Tech Business Incubator, I constantly seek opportunities to mentor, share knowledge, and build high-quality software.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education Timeline */}
        <section className="education-section">
          <motion.h3 className="subsection-title" variants={itemVariants}>
            <FaGraduationCap /> Education
          </motion.h3>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            {education.map((edu, idx) => (
              <motion.div 
                className="timeline-item" 
                key={idx}
                variants={itemVariants}
              >
                <div className="timeline-marker">
                  <FaGraduationCap />
                </div>
                <div className="timeline-content glass-card">
                  <span className="timeline-period">{edu.period}</span>
                  <h4 className="timeline-degree">{edu.degree}</h4>
                  <h5 className="timeline-inst">{edu.institution}</h5>
                  <p className="timeline-loc">{edu.location}</p>
                  <div className="timeline-grade-badge">{edu.grade}</div>
                  <div className="timeline-coursework">
                    <p className="coursework-title">Key Coursework:</p>
                    <div className="coursework-tags">
                      {edu.coursework.map((course, cIdx) => (
                        <span key={cIdx} className="tech-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements, Positions, and Certifications Grid */}
        <div className="about-grid-layout">
          {/* Achievements & Positions */}
          <div className="grid-left-col">
            <section className="achievements-section">
              <motion.h3 className="subsection-title" variants={itemVariants}>
                <FaAward /> Achievements & Awards
              </motion.h3>
              <div className="achievements-list">
                {achievements.map((ach, idx) => (
                  <motion.div 
                    className="achievement-item-card glass-card" 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.01, boxShadow: '0 15px 30px rgba(124, 58, 237, 0.1)' }}
                  >
                    <div className="achievement-header">
                      <h4 className="achievement-title">{ach.title}</h4>
                      <span className="achievement-year">{ach.year}</span>
                    </div>
                    <p className="achievement-org">{ach.organizer}</p>
                    <p className="achievement-desc">{ach.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="responsibility-section">
              <motion.h3 className="subsection-title" variants={itemVariants}>
                <FaUsers /> Position of Responsibility
              </motion.h3>
              <motion.div 
                className="responsibility-card glass-card" 
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01, boxShadow: '0 15px 30px rgba(124, 58, 237, 0.1)' }}
              >
                <div className="responsibility-header">
                  <h4 className="responsibility-role">{responsibility.role}</h4>
                  <span className="responsibility-year">{responsibility.year}</span>
                </div>
                <p className="responsibility-org">{responsibility.org}</p>
                <ul className="responsibility-points">
                  {responsibility.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </motion.div>
            </section>
          </div>

          {/* Certifications & Hobbies */}
          <div className="grid-right-col">
            <section className="certifications-section">
              <motion.h3 className="subsection-title" variants={itemVariants}>
                <FaCertificate /> Certifications
              </motion.h3>
              <div className="certs-grid">
                {certifications.map((cert, idx) => (
                  <motion.div 
                    className="cert-card glass-card" 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.01, boxShadow: '0 15px 30px rgba(124, 58, 237, 0.1)' }}
                  >
                    <h4 className="cert-name">{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <div className="cert-footer">
                      <span className="cert-year">{cert.year}</span>
                      {cert.details && <span className="cert-details">{cert.details}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="hobbies-section">
              <motion.h3 className="subsection-title" variants={itemVariants}>
                <FaBook /> Personal Touch
              </motion.h3>
              <motion.div 
                className="hobbies-card glass-card" 
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01, boxShadow: '0 15px 30px rgba(124, 58, 237, 0.1)' }}
              >
                <div className="hobby-item">
                  <div className="hobby-icon"><FaBook /></div>
                  <div className="hobby-content">
                    <h4>Reading Books</h4>
                    <p>Enjoys picking up non-fiction and tech-oriented literature to broaden perspectives.</p>
                  </div>
                </div>
                <div className="hobby-item">
                  <div className="hobby-icon"><FaWrench /></div>
                  <div className="hobby-content">
                    <h4>Exploring New Tools</h4>
                    <p>Constantly trying out productivity utilities, editors, and dev setups to stay fast.</p>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
