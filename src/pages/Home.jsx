import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaJava, FaReact, FaAws, FaGitAlt, FaAward, FaGraduationCap, FaCloud, FaRocket, FaDownload, FaCoffee, FaCheckCircle, FaLock } from 'react-icons/fa';
import { SiSpringboot, SiMysql, SiMongodb, SiPostman } from 'react-icons/si';
import DeveloperAvatar from '../components/DeveloperAvatar';
import OrbitDivider from '../components/OrbitDivider';
import './Home.css';

// Typewriter Component
const Typewriter = ({ strings }) => {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(100);

  const period = 1500;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % strings.length;
    let fullText = strings[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(100);
    }
  };

  return (
    <span className="typewriter-text">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

// Counter Component
const Counter = ({ value, duration = 2, suffix = "" }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = 40;
    let numIterations = totalMiliseconds / incrementTime;
    let currentIteration = 0;

    let timer = setInterval(() => {
      currentIteration++;
      let progress = currentIteration / numIterations;
      // easeOutQuad function
      let easeProgress = progress * (2 - progress);
      let nextValue = start + easeProgress * (end - start);
      
      if (value.toString().includes('.')) {
        setCurrentValue(nextValue.toFixed(2));
      } else {
        setCurrentValue(Math.floor(nextValue));
      }

      if (currentIteration >= numIterations) {
        clearInterval(timer);
        setCurrentValue(value);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{currentValue}{suffix}</span>;
};

const Home = () => {
  const [coffeeCount, setCoffeeCount] = useState(1);
  const [customAmount, setCustomAmount] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorMessage, setSponsorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const getAmount = () => {
    if (coffeeCount === 'custom') {
      return Number(customAmount) || 0;
    }
    return coffeeCount * 50;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const existingScript = document.getElementById('razorpay-sdk');
      if (existingScript) {
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSupport = async (e) => {
    e.preventDefault();
    const amount = getAmount();
    if (amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    try {
      const options = {
        key: 'rzp_test_T8DdJt43u7nw9O', // User's Test Key ID
        amount: amount * 100, // paise
        currency: 'INR',
        name: 'Mayank Kumar',
        description: `Donation: Buy me ${coffeeCount === 'custom' ? 'coffee' : `${coffeeCount} coffee(s)`}`,
        image: 'https://avatars.githubusercontent.com/u/104445899?v=4',
        handler: function (response) {
          setIsSuccess(true);
          setSponsorName('');
          setSponsorMessage('');
          setCustomAmount('');
          setCoffeeCount(1);
        },
        prefill: {
          name: sponsorName || 'Sponsor',
          email: 'mayank78stu@gmail.com',
          contact: '+916200482891'
        },
        notes: {
          message: sponsorMessage || 'No message provided'
        },
        theme: {
          color: '#7C3AED'
        }
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
      });

      paymentObject.open();
    } catch (err) {
      console.error('Razorpay initialization error:', err);
      alert('Failed to initialize Razorpay checkout. Make sure to specify a valid Key ID in Home.jsx.');
    }
  };

  const typewriterRoles = [
    "Full Stack Developer.",
    "MCA Candidate.",
    "AI Integration Enthusiast.",
    "AWS Certified Developer."
  ];

  const techIcons = [
    { name: 'Java', icon: <FaJava />, color: '#E76F51' },
    { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6DB33F' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' }
  ];

  return (
    <motion.div 
      className="home-page page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background glow positioning */}
      <div className="ambient-glow home-glow-1" style={{ top: '10%', left: '5%', width: '500px', height: '500px' }}></div>
      <div className="ambient-glow home-glow-2" style={{ top: '60%', right: '5%', width: '600px', height: '600px' }}></div>

      {/* 1. Hero Section */}
      <section className="hero-section container">
        <div className="hero-grid">
          <div className="hero-info-panel">
            <motion.div 
              className="hero-headline-container"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h1 className="hero-title">
                A Developer who ships the <span className="circle-keyword-container">
                  whole stack
                  <svg className="keyword-circle-svg" viewBox="0 0 230 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      d="M10 40C30 20 110 5 210 20C230 25 220 50 180 60C110 70 30 65 15 50C5 40 12 25 40 18"
                      stroke="var(--accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            <motion.div 
              className="hero-typewriter-container"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="typewriter-prefix">I am a </span>
              <Typewriter strings={typewriterRoles} />
            </motion.div>

            <motion.p 
              className="hero-bio"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Full Stack Developer and MCA candidate with hands-on experience in designing and developing scalable web applications using Java, Spring Boot, React.js, and RESTful APIs. Proficient in SQL/NoSQL databases, AWS Cloud, and AI API integrations.
            </motion.p>

            <motion.div 
              className="hero-ctas"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link to="/projects" className="btn btn-primary">
                <FaRocket /> View Projects
              </Link>
              <a 
                href="https://drive.google.com/file/d/1fLXSrr0QwiilpkEgeA7KbiLsBkLjGAg7/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FaDownload /> View Resume
              </a>
            </motion.div>

            {/* Hero Social Icons */}
            <motion.div 
              className="hero-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a href="https://github.com/mayank78geu" target="_blank" rel="noopener noreferrer" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/mayank78stu" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:mayank78stu@gmail.com" title="Email">
                <FaEnvelope />
              </a>
              <a href="tel:+916200482891" title="Phone">
                <FaPhoneAlt />
              </a>
            </motion.div>
          </div>

          <div className="hero-avatar-panel">
            <DeveloperAvatar />
          </div>
        </div>
      </section>

      {/* 2. Highlights Strip */}
      <section className="highlights-section container">
        <motion.div 
          className="highlights-strip glass-card"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="highlight-item">
            <div className="highlight-icon">
              <FaGraduationCap />
            </div>
            <div className="highlight-content">
              <h3 className="highlight-val">
                <Counter value={8.62} duration={1.5} />
              </h3>
              <p className="highlight-label">Current MCA SGPA</p>
            </div>
          </div>

          <div className="highlight-divider"></div>

          <div className="highlight-item">
            <div className="highlight-icon">
              <FaAward />
            </div>
            <div className="highlight-content">
              <h3 className="highlight-val">AICTE</h3>
              <p className="highlight-label">IDE Bootcamp Winner '25</p>
            </div>
          </div>

          <div className="highlight-divider"></div>

          <div className="highlight-item">
            <div className="highlight-icon">
              <FaRocket />
            </div>
            <div className="highlight-content">
              <h3 className="highlight-val">
                <Counter value={3} duration={1} suffix="+" />
              </h3>
              <p className="highlight-label">Full-Stack Projects</p>
            </div>
          </div>

          <div className="highlight-divider"></div>

          <div className="highlight-item">
            <div className="highlight-icon">
              <FaCloud />
            </div>
            <div className="highlight-content">
              <h3 className="highlight-val">AWS</h3>
              <p className="highlight-label">Cloud Certified</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Tech Stack Strip */}
      <section className="tech-strip-section container">
        <motion.div 
          className="tech-strip-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="tech-strip-statement">
            Building with a <span className="highlight-accent">full-stack & AI-integrated</span> impact focus
          </p>
          <div className="tech-icons-row">
            {techIcons.map((tech) => (
              <div key={tech.name} className="tech-icon-wrapper" style={{ '--hover-color': tech.color }}>
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Orbit Divider */}
      <OrbitDivider />

      {/* 5. Featured Projects Preview */}
      <section className="featured-projects-section container">
        <div className="section-header-centered">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A preview of my recent award-winning and full-stack creations</p>
        </div>

        <div className="featured-projects-grid">
          {/* Project 1: BestPath */}
          <motion.div 
            className="featured-project-card glass-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="project-badge">
              <FaAward /> AICTE IDE Winner
            </div>
            <div className="project-preview-info">
              <h3 className="project-title">BestPath</h3>
              <p className="project-desc">
                Career guidance platform targeting rural students and parents. Generates personalized roadmaps, career awareness, and matches user interests using AI.
              </p>
              <div className="project-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Spring Boot</span>
                <span className="tech-tag">Gemini API</span>
              </div>
              <Link to="/projects" className="project-card-link">
                View Project Details &rarr;
              </Link>
            </div>
          </motion.div>

          {/* Project 2: PrepRush */}
          <motion.div 
            className="featured-project-card glass-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="project-badge badge-alt">
              <FaRocket /> Full Stack AI
            </div>
            <div className="project-preview-info">
              <h3 className="project-title">PrepRush</h3>
              <p className="project-desc">
                AI-powered rapid revision helper ("Last-Night Study Buddy") that takes a topic and instantly creates structured review roadmaps and quizzes via Gemini API.
              </p>
              <div className="project-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Spring Boot</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Gemini API</span>
              </div>
              <Link to="/projects" className="project-card-link">
                View Project Details &rarr;
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="featured-projects-cta">
          <Link to="/projects" className="btn btn-secondary">
            View All Projects
          </Link>
        </div>
      </section>

      {/* 5.5. Buy Me a Coffee Section */}
      <section className="coffee-section container">
        <div className="section-header-centered">
          <h2 className="section-title">Buy Me a Coffee</h2>
          <p className="section-subtitle">If you like my work or want to support my open-source projects, feel free to buy me a coffee!</p>
        </div>

        <motion.div 
          className="coffee-card glass-card"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="coffee-grid">
            {/* Visual Column */}
            <div className="coffee-visual-col">
              <div className="coffee-animation-container">
                <div className="steam-wrapper">
                  <span className="steam-line steam-1"></span>
                  <span className="steam-line steam-2"></span>
                  <span className="steam-line steam-3"></span>
                </div>
                <div className="cup-container">
                  <FaCoffee className="coffee-cup-icon" />
                  <div className="cup-handle"></div>
                </div>
              </div>
              <div className="coffee-visual-text">
                <h4>Support Mayank Kumar</h4>
                <p>Every coffee fuels late-night coding, API debugging, and AWS deployments.</p>
              </div>
            </div>

            {/* Form Column */}
            <div className="coffee-form-col">
              <form onSubmit={handleSupport} className="coffee-form">
                <div className="coffee-quantity-selector">
                  <p className="field-label">Select Quantity</p>
                  <div className="coffee-qty-buttons">
                    {[1, 3, 5].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        className={`qty-btn ${coffeeCount === qty ? 'active' : ''}`}
                        onClick={() => {
                          setCoffeeCount(qty);
                          setCustomAmount('');
                        }}
                      >
                        ☕ x {qty} <span className="price-label">(₹{qty * 50})</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`qty-btn ${coffeeCount === 'custom' ? 'active' : ''}`}
                      onClick={() => setCoffeeCount('custom')}
                    >
                      Custom ☕
                    </button>
                  </div>
                </div>

                {coffeeCount === 'custom' && (
                  <motion.div 
                    className="custom-amount-input-group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="field-label" htmlFor="custom-amt">Amount (₹)</label>
                    <input
                      id="custom-amt"
                      type="number"
                      min="10"
                      max="10000"
                      placeholder="Enter amount (Min ₹10)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      required={coffeeCount === 'custom'}
                      className="coffee-input"
                    />
                  </motion.div>
                )}

                <div className="form-group">
                  <label className="field-label" htmlFor="sponsor-name">Name (Optional)</label>
                  <input
                    id="sponsor-name"
                    type="text"
                    placeholder="Sponsor Name"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    className="coffee-input"
                  />
                </div>

                <div className="form-group">
                  <label className="field-label" htmlFor="sponsor-msg">Message (Optional)</label>
                  <textarea
                    id="sponsor-msg"
                    rows="3"
                    placeholder="Leave a message..."
                    value={sponsorMessage}
                    onChange={(e) => setSponsorMessage(e.target.value)}
                    className="coffee-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary support-submit-btn">
                  <FaCoffee /> Support Mayank with ₹{getAmount()}
                </button>

                <div className="secure-badge">
                  <FaLock /> <span>Secured by Razorpay. Test mode enabled.</span>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="success-modal glass-card"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="success-icon-wrap">
                <FaCheckCircle />
              </div>
              <h3>Thank You So Much!</h3>
              <p>Your test support has been processed successfully. It keeps me motivated to build awesome full-stack projects!</p>
              <button className="btn btn-primary" onClick={() => setIsSuccess(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Call to Action Footer Block */}
      <section className="cta-footer-section container">
        <motion.div 
          className="cta-footer-card glass-card"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="cta-title">Let's build something impactful together</h2>
          <p className="cta-subtitle">
            I am currently exploring full-stack and backend engineering roles. Reach out to collaborate!
          </p>
          <a href="mailto:mayank78stu@gmail.com" className="btn btn-primary">
            <FaEnvelope /> Get In Touch
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
