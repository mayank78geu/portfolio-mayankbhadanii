import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaAward, FaExternalLinkAlt, FaFilter, FaLaptop } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const projectsData = [
    {
      id: 1,
      title: 'BestPath',
      subtitle: 'Career Guidance Platform for Rural Students',
      year: '2025',
      badge: '🏆 AICTE IDE Bootcamp Winner (Phase II)',
      role: 'Full Stack Developer',
      tags: ['React.js', 'Spring Boot', 'REST API', 'Gemini API'],
      github: 'https://github.com/mayank78geu/portfolio-mayankbhadanii', // Use the repo link as placeholder
      description: [
        'A career guidance platform targeting rural students and parents with limited exposure to modern career paths; provides personalised career roadmaps, domain awareness, and interest-based suggestions.',
        'Integrated Google Gemini API to generate dynamic, personalised career roadmaps based on user interests, academic background, and skill level.',
        'Designed full-stack architecture covering React.js frontend, Spring Boot REST backend, and database integration — handling end-to-end user flow from onboarding to roadmap delivery.'
      ],
      // Mockup representation data
      mockupType: 'career',
      mockupColors: { primary: '#7C3AED', secondary: '#A78BFA' }
    },
    {
      id: 2,
      title: 'PrepRush',
      subtitle: 'Last-Night Study Buddy & AI Revision Helper',
      year: '2025',
      badge: 'AI Revision Partner',
      role: 'Full Stack Developer',
      tags: ['React.js', 'Spring Boot', 'MongoDB', 'Gemini API'],
      github: 'https://github.com/mayank78geu/portfolio-mayankbhadanii',
      description: [
        'An AI-powered rapid revision tool — enables students to input a topic and instantly receive a structured learning roadmap tailored to their academic level via Google Gemini API.',
        'Built RESTful APIs in Spring Boot to handle topic submissions, Gemini API orchestration, quiz generation, and user session data persistence in MongoDB.',
        'Developed responsive React.js frontend supporting profile creation, roadmap rendering, explanation modules, and interactive quizzes for targeted last-minute exam preparation.',
        'Implemented NoSQL data modeling in MongoDB for flexible storage of user profiles, study history, and AI-generated content.'
      ],
      mockupType: 'study',
      mockupColors: { primary: '#8B5CF6', secondary: '#F5F3FA' }
    },
    {
      id: 3,
      title: 'MedNext',
      subtitle: 'Patient-Centric Appointment Management System',
      year: '2024',
      badge: 'Healthcare Platform',
      role: 'Team Leader & Backend Developer',
      tags: ['React.js', 'Spring Boot', 'MySQL', 'REST API'],
      github: 'https://github.com/mayank78geu/portfolio-mayankbhadanii',
      description: [
        'A full-stack healthcare platform enabling patients to book, manage, and track medical appointments online.',
        'Designed and developed RESTful APIs using Spring Boot to handle CRUD operations for patient records, appointment scheduling, doctor availability, and status updates.',
        'Implemented MySQL relational database schema to efficiently store and retrieve patient and appointment data with referential integrity.',
        'Ensured clean API contract design enabling seamless integration with the React.js frontend through well-documented, stateless REST endpoints.'
      ],
      mockupType: 'health',
      mockupColors: { primary: '#10B981', secondary: '#34D399' }
    }
  ];

  // Unique tags for filter list
  const filterTags = ['All', 'React.js', 'Spring Boot', 'Gemini API', 'MongoDB', 'MySQL'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(proj => proj.tags.includes(filter));

  // Render simulated browser UI to avoid placeholders
  const renderBrowserMockup = (proj) => {
    return (
      <div className="browser-mockup glass-card" style={{ '--project-color': proj.mockupColors.primary }}>
        {/* Browser Top Bar */}
        <div className="browser-header">
          <div className="browser-actions">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="browser-address">
            https://{proj.title.toLowerCase()}.mayank.dev
          </div>
        </div>
        
        {/* Browser Body Screen */}
        <div className="browser-body">
          {proj.mockupType === 'career' && (
            <div className="mockup-screen screen-career">
              <div className="mockup-nav">
                <span className="mockup-logo">BestPath</span>
                <span className="mockup-user">Welcome, Student</span>
              </div>
              <div className="mockup-content">
                <div className="mockup-card-mini">
                  <h5>AI Career Assistant</h5>
                  <p>Interests: AI development, Problem Solving</p>
                  <div className="mockup-btn-mini">Generate Roadmap</div>
                </div>
                <div className="mockup-roadmap-nodes">
                  <div className="node active">1. Learn Java</div>
                  <div className="node">2. Study Spring</div>
                  <div className="node">3. Build Projects</div>
                </div>
              </div>
            </div>
          )}

          {proj.mockupType === 'study' && (
            <div className="mockup-screen screen-study">
              <div className="mockup-nav">
                <span className="mockup-logo text-violet">PrepRush</span>
              </div>
              <div className="mockup-content">
                <div className="mockup-input-block">
                  <p className="mockup-faint-text">Enter Topic</p>
                  <div className="mockup-bar">Microservices Architecture</div>
                </div>
                <div className="mockup-card-grid">
                  <div className="m-card">Roadmap <div className="bar-sub"></div></div>
                  <div className="m-card">Quiz <div className="bar-sub"></div></div>
                </div>
              </div>
            </div>
          )}

          {proj.mockupType === 'health' && (
            <div className="mockup-screen screen-health">
              <div className="mockup-nav">
                <span className="mockup-logo text-emerald">MedNext</span>
              </div>
              <div className="mockup-content">
                <div className="mockup-stats">
                  <div className="stat-node">Appointments: 4</div>
                  <div className="stat-node">Active Doctors: 12</div>
                </div>
                <div className="mockup-table">
                  <div className="table-row header">
                    <span>Patient</span><span>Doctor</span><span>Time</span>
                  </div>
                  <div className="table-row">
                    <span>John Doe</span><span>Dr. Smith</span><span>10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="projects-page page-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="ambient-glow proj-glow-1" style={{ top: '15%', left: '5%', width: '450px', height: '450px' }}></div>
      <div className="ambient-glow proj-glow-2" style={{ bottom: '15%', right: '5%', width: '500px', height: '500px' }}></div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">A showcase of full-stack products, web systems, and AI integration projects</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar-container">
          <div className="filter-label">
            <FaFilter /> Filter:
          </div>
          <div className="filter-buttons">
            {filterTags.map((tag) => (
              <button
                key={tag}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Rows Wrapper */}
        <div className="projects-rows">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              // Alternate layouts: even indices have mockup left, odd indices mockup right
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  className={`project-row-wrapper ${isEven ? 'row-normal' : 'row-reverse'}`}
                  key={proj.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  layout
                >
                  {/* Mockup Column */}
                  <div className="project-mockup-col">
                    {renderBrowserMockup(proj)}
                  </div>

                  {/* Info Card Column */}
                  <div className="project-info-col">
                    <motion.div 
                      className="project-detail-card glass-card"
                      whileHover={{ y: -6, scale: 1.005, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.08)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="project-title-row">
                        <span className="project-year-tag">{proj.year}</span>
                        {proj.badge && (
                          <span className={`project-row-badge ${proj.badge.includes('🏆') ? 'winner' : ''}`}>
                            {proj.badge}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="project-row-title">{proj.title}</h3>
                      <h4 className="project-row-subtitle">{proj.subtitle}</h4>
                      <p className="project-role-tag">Role: <strong>{proj.role}</strong></p>
                      
                      <ul className="project-points-list">
                        {proj.description.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>

                      <div className="project-row-tags">
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="tech-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="project-links-row">
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                          <FaGithub /> GitHub Repo
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
