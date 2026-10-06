import React, { useState, useEffect } from 'react';
import { 
  FaCopy, 
  FaCheck, 
  FaBookmark, 
  FaShareAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaGithub, 
  FaClock, 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaListUl,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DockerHandbook.css';

const chapters = [
  { id: 'ch1', num: '01', title: 'Why Containers Exist', kicker: 'Foundations', color: '#2496ed' },
  { id: 'ch2', num: '02', title: 'Core Docker Vocabulary', kicker: 'Foundations', color: '#2496ed' },
  { id: 'ch3', num: '03', title: 'Docker Architecture', kicker: 'Foundations', color: '#2496ed' },
  { id: 'ch4', num: '04', title: 'Install & First-Time Setup', kicker: 'Getting Started', color: '#1a6fb5' },
  { id: 'ch5', num: '05', title: 'Images & the Dockerfile', kicker: 'Getting Started', color: '#1a6fb5' },
  { id: 'ch6', num: '06', title: 'Building Images', kicker: 'Getting Started', color: '#1a6fb5' },
  { id: 'ch7', num: '07', title: 'Running Containers', kicker: 'Working With Containers', color: '#22863a' },
  { id: 'ch8', num: '08', title: 'Managing the Lifecycle', kicker: 'Working With Containers', color: '#22863a' },
  { id: 'ch9', num: '09', title: 'Volumes & Data Persistence', kicker: 'Data & Storage', color: '#0a9f78' },
  { id: 'ch10', num: '10', title: 'Bind Mounts', kicker: 'Data & Storage', color: '#0a9f78' },
  { id: 'ch11', num: '11', title: 'Networking', kicker: 'Connectivity', color: '#8957e5' },
  { id: 'ch12', num: '12', title: 'Environment & Config', kicker: 'Configuration', color: '#c98a12' },
  { id: 'ch13', num: '13', title: 'Docker Compose', kicker: 'Multi-Container Apps', color: '#2496ed' },
  { id: 'ch14', num: '14', title: 'Multi-Stage & Best Practices', kicker: 'Production Readiness', color: '#1a6fb5' },
  { id: 'ch15', num: '15', title: 'Docker Hub & Registries', kicker: 'Distribution', color: '#c98a12' },
  { id: 'ch16', num: '16', title: 'Docker for DevOps & CI/CD', kicker: 'For DevOps', color: '#8957e5' },
  { id: 'ch17', num: '17', title: 'Security Best Practices', kicker: 'Hardening', color: '#cf3d6e' },
  { id: 'ch18', num: '18', title: 'Command Cheat Sheet', kicker: 'Quick Reference', color: '#2496ed' },
  { id: 'ch19', num: '19', title: 'Further Reading', kicker: 'Beyond This Page', color: '#6b7280' },
];

const CodeSnippet = ({ code, rawText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText || (typeof code === 'string' ? code : ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="docker-code-block-wrapper">
      <button 
        className={`docker-copy-code-btn ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copied to clipboard' : 'Copy code'}
        aria-label="Copy code to clipboard"
      >
        {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <pre className="docker-code">{code}</pre>
    </div>
  );
};

const DockerHandbook = () => {
  const [activeChapter, setActiveChapter] = useState('ch1');
  const [copiedShare, setCopiedShare] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Scroll spy & reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      const chapterEls = chapters.map(ch => document.getElementById(ch.id)).filter(Boolean);
      const scrollPos = window.scrollY + 200;

      for (let i = chapterEls.length - 1; i >= 0; i--) {
        const el = chapterEls[i];
        if (el.offsetTop <= scrollPos) {
          setActiveChapter(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active chapter in sidebar viewport
  useEffect(() => {
    const activeItem = document.querySelector('.docker-graph-nav li.active');
    const sidebar = document.querySelector('.docker-handbook-sidebar');
    if (activeItem && sidebar) {
      const sidebarRect = sidebar.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      if (itemRect.top < sidebarRect.top + 50 || itemRect.bottom > sidebarRect.bottom - 50) {
        activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeChapter]);

  const handleChapterClick = (e, chapterId) => {
    e.preventDefault();
    setMobileTocOpen(false);
    const target = document.getElementById(chapterId);
    if (target) {
      const topOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveChapter(chapterId);
      window.history.replaceState(null, '', `#${chapterId}`);
    }
  };

  const handleCopyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out "The Complete Docker Handbook" by Mayank Kumar — An A–Z guide for Developers & DevOps!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="docker-handbook-root">
      {/* Top Reading Progress Bar */}
      <div 
        className="docker-reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="docker-handbook-shell">
        {/* ================= STICKY SIDEBAR ================= */}
        <aside className={`docker-handbook-sidebar ${mobileTocOpen ? 'mobile-open' : ''}`} aria-label="Table of contents">
          <div className="docker-side-brand">
            <span className="docker-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10h4v4H3v-4zM8 10h4v4H8v-4zM13 10h4v4h-4v-4zM8 5h4v4H8V5zM13 5h4v4h-4V5zM18 10h4c0 5-4 9-11 9-4 0-7-2-7-5h18z" fill="white"/>
              </svg>
            </span>
            <span>DOCKER HANDBOOK</span>
          </div>

          <p className="docker-side-caption">Table of Contents ({chapters.length} Chapters)</p>

          <ul className="docker-graph-nav" id="tocList">
            {chapters.map((ch) => (
              <li 
                key={ch.id} 
                style={{ '--dot': ch.color }}
                className={activeChapter === ch.id ? 'active' : ''}
              >
                <a 
                  href={`#${ch.id}`}
                  onClick={(e) => handleChapterClick(e, ch.id)}
                >
                  <span className="num">{ch.num}</span>
                  <span className="nav-text">{ch.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="docker-side-foot">
            <strong>Interactive Field Guide</strong>
            <br />
            Scroll or jump to any chapter — each section links directly to official Docker docs.
          </div>
        </aside>

        {/* Mobile TOC Floating Toggle */}
        <button 
          className="docker-toc-mobile-toggle-btn"
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          aria-label="Toggle Table of Contents"
        >
          <FaListUl /> <span>{mobileTocOpen ? 'Close Outline' : 'Handbook Outline'}</span>
        </button>

        {/* ================= MAIN CONTENT ================= */}
        <main className="docker-handbook-main">
          {/* Breadcrumb Navigation */}
          <div className="docker-handbook-breadcrumbs">
            <Link to="/blog" className="docker-breadcrumb-link">
              <FaArrowLeft size={12} /> All Blogs
            </Link>
            <span className="docker-breadcrumb-separator">/</span>
            <span className="docker-breadcrumb-current">Docker Handbook</span>
          </div>

          {/* Hero Header */}
          <header className="docker-handbook-hero">
            <div className="docker-eyebrow-container">
              <span className="docker-eyebrow">
                <span className="docker-eyebrow-dot"></span> Complete Reference · Docker + Compose + DevOps
              </span>
            </div>
            
            <h1 className="docker-hero-heading">
              The Complete <em>Docker</em> Handbook
            </h1>

            <p className="docker-lead">
              An A–Z field guide for developers who containerize their apps, and the DevOps engineers who run them in production — from your first <code>docker run</code> to multi-stage builds in a CI/CD pipeline. Every chapter links back to the official documentation.
            </p>

            <div className="docker-article-meta-bar">
              <div className="docker-meta-item">
                <FaCalendarAlt className="docker-meta-icon" />
                <span>Published: Oct 07, 2026</span>
              </div>
              <div className="docker-meta-item">
                <FaClock className="docker-meta-icon" />
                <span>16 min read</span>
              </div>
              <div className="docker-meta-item">
                <FaBookmark className="docker-meta-icon" />
                <span>19 Chapters · 60+ Commands · 19 Official Doc Links</span>
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="docker-hero-terminal">
              <div className="docker-term-bar">
                <span></span><span></span><span></span>
                <span className="docker-term-title">docker-quickstart.sh</span>
              </div>
              <pre>
                <span className="c1"># the whole handbook in four lines</span>{'\n'}
                <span className="c2">docker</span> build -t myapp:1.0 .            <span className="c1"># build an image</span>{'\n'}
                <span className="c2">docker</span> run -d -p 8080:80 myapp:1.0    <span className="c1"># run a container</span>{'\n'}
                <span className="c2">docker</span> compose up -d                  <span className="c1"># run a whole stack</span>{'\n'}
                <span className="c2">docker</span> push myrepo/myapp:1.0          <span className="c1"># ship it</span>
              </pre>
            </div>

            {/* Quick Share Buttons */}
            <div className="docker-handbook-share-bar">
              <span className="docker-share-label"><FaShareAlt size={12} /> Share this guide:</span>
              <button 
                className={`docker-share-btn ${copiedShare ? 'copied' : ''}`}
                onClick={handleCopyPageUrl}
                aria-label="Copy link to clipboard"
              >
                {copiedShare ? <FaCheck size={12} /> : <FaCopy size={12} />}
                <span>{copiedShare ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <button 
                className="docker-share-btn"
                onClick={handleShareTwitter}
                aria-label="Share on X Twitter"
              >
                <FaTwitter size={12} />
                <span>Twitter / X</span>
              </button>
              <button 
                className="docker-share-btn"
                onClick={handleShareLinkedIn}
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin size={12} />
                <span>LinkedIn</span>
              </button>
            </div>
          </header>

          {/* ================= CHAPTERS ================= */}
          <div className="docker-handbook-container">

            {/* CH 1 */}
            <section className="docker-chapter" id="ch1" style={{ '--accent': '#2496ed' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">01</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Foundations</span>
                  <h2>Why Containers Exist</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>
                  "It works on my machine" is the oldest problem in software delivery. A developer's laptop has a different OS version, different library versions, and different environment variables than the production server — and any of those gaps can break a deployment. <strong>Containers</strong> solve this by packaging an application together with everything it needs to run — code, runtime, system libraries, settings — into one portable unit that behaves identically everywhere.
                </p>
                <div className="docker-grid2">
                  <div className="docker-concept-card">
                    <span className="docker-term">Virtual Machine</span>
                    <p>Virtualizes an entire computer, including its own OS kernel. Heavy (gigabytes), slow to boot (minutes), but fully isolated.</p>
                  </div>
                  <div className="docker-concept-card">
                    <span className="docker-term">Container</span>
                    <p>Shares the host machine's OS kernel and isolates just the application's processes and filesystem. Lightweight (megabytes), boots in milliseconds.</p>
                  </div>
                </div>
                <div className="docker-callout tip">
                  <span className="docker-tag">Docker's role</span>
                  <p>Docker is the platform that makes containers practical for everyday development: it builds images, runs containers from them, and gives you a consistent CLI and file format (the Dockerfile) across every machine — laptop, CI runner, or cloud server.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Docker's own "Get started" overview, covering containers, images, and why they matter.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/get-started <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 2 */}
            <section className="docker-chapter" id="ch2" style={{ '--accent': '#2496ed' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">02</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Foundations</span>
                  <h2>Core Docker Vocabulary</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Eight terms carry almost the entire mental model of Docker. Learn these and every command below will make structural sense.</p>
                <div className="docker-grid3">
                  <div className="docker-concept-card"><span className="docker-term">Image</span><p>A read-only template — your app plus its dependencies — built from a Dockerfile. Images don't run; containers do.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Container</span><p>A running (or stopped) instance of an image. You can start, stop, and delete containers without touching the image they came from.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Dockerfile</span><p>A text file of instructions describing how to build an image, step by step.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Registry</span><p>A server that stores and distributes images. Docker Hub is the default public registry.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Volume</span><p>Docker-managed storage that persists data outside a container's own writable layer.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Network</span><p>A virtual network that lets containers talk to each other and to the outside world.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Daemon (dockerd)</span><p>The background service that builds, runs, and manages everything — the engine behind every command.</p></div>
                  <div className="docker-concept-card"><span className="docker-term">Compose</span><p>A tool for defining and running multi-container applications from a single YAML file.</p></div>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    The full Docker glossary, with precise definitions for every term used across the docs.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/reference/glossary/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/reference/glossary <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 3 */}
            <section className="docker-chapter" id="ch3" style={{ '--accent': '#2496ed' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">03</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Foundations</span>
                  <h2>Docker Architecture: Client, Daemon, Registry</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Every Docker command you type travels the same three-part path. Understanding it removes most of the "where did my container go?" confusion.</p>

                <div className="docker-svg-wrap">
                  <svg viewBox="0 0 760 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of the Docker CLI talking to the Docker daemon, which runs containers and pulls images from a registry">
                    <rect x="30" y="60" width="150" height="60" rx="10" fill="rgba(36, 150, 237, 0.12)" stroke="#2496ed" strokeWidth="1.5"/>
                    <text x="105" y="85" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="700" fill="#2496ed">docker CLI</text>
                    <text x="105" y="102" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#8b949e">your terminal</text>

                    <rect x="305" y="40" width="160" height="100" rx="10" fill="#0d1117" stroke="#2496ed" strokeWidth="1.5"/>
                    <text x="385" y="75" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">dockerd</text>
                    <text x="385" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#9aa4b2">the daemon</text>
                    <text x="385" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#9aa4b2">builds · runs · manages</text>

                    <rect x="590" y="60" width="150" height="60" rx="10" fill="rgba(137, 87, 229, 0.12)" stroke="#8957e5" strokeWidth="1.5"/>
                    <text x="665" y="85" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="700" fill="#a371f7">Registry</text>
                    <text x="665" y="102" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#8b949e">Docker Hub, etc.</text>

                    <line x1="180" y1="90" x2="305" y2="90" stroke="#2496ed" strokeWidth="2.5" markerEnd="url(#arrow1)"/>
                    <text x="242" y="82" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#79c0ff">REST API</text>

                    <line x1="465" y1="90" x2="590" y2="90" stroke="#8957e5" strokeWidth="2.5" markerEnd="url(#arrow2)"/>
                    <text x="527" y="82" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#d2a8ff">pull / push</text>

                    <defs>
                      <marker id="arrow1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#2496ed"/></marker>
                      <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8957e5"/></marker>
                    </defs>
                  </svg>
                </div>

                <p>
                  You type a command into the <strong>Docker CLI</strong>, which sends it over a REST API to the <strong>Docker daemon</strong> (<code>dockerd</code>) — a background process that does the actual work of building images and running containers. When the daemon needs an image it doesn't have locally, it pulls it from a <strong>registry</strong>; when you publish an image, it pushes to one.
                </p>

                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Docker Engine documentation, covering the daemon, its CLI, and how the pieces fit together.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 4 */}
            <section className="docker-chapter" id="ch4" style={{ '--accent': '#1a6fb5' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">04</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Getting Started</span>
                  <h2>Install &amp; First-Time Setup</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Most developers install <strong>Docker Desktop</strong> (Mac, Windows, Linux) for a GUI plus the full CLI; servers and CI runners typically install the <strong>Docker Engine</strong> directly (Linux-only, CLI only). Either way, the commands below are identical.</p>
                <span className="docker-code-label">Verify the installation</span>
                <CodeSnippet 
                  rawText={`# check the CLI and daemon are both reachable\ndocker --version\ndocker info\n\n# the classic sanity check — pulls and runs a tiny test image\ndocker run hello-world`}
                  code={<>
                    <span className="cmt"># check the CLI and daemon are both reachable</span>{'\n'}
                    <span className="cmd">docker</span> --version{'\n'}
                    <span className="cmd">docker</span> info{'\n\n'}
                    <span className="cmt"># the classic sanity check — pulls and runs a tiny test image</span>{'\n'}
                    <span className="cmd">docker</span> run hello-world
                  </>}
                />
                <div className="docker-callout tip">
                  <span className="docker-tag">Linux note</span>
                  <p>On Linux, add your user to the <code>docker</code> group (<code>sudo usermod -aG docker $USER</code>) so you don't need <code>sudo</code> before every command — then log out and back in for it to take effect.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Step-by-step install guides for Docker Engine on every supported Linux distribution.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine/install <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 5 */}
            <section className="docker-chapter" id="ch5" style={{ '--accent': '#1a6fb5' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">05</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Getting Started</span>
                  <h2>Images &amp; the Dockerfile</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>A Dockerfile is a recipe: a plain-text list of instructions that Docker executes top to bottom to produce an image. Each instruction adds one layer on top of the last.</p>
                <span className="docker-code-label">A minimal Dockerfile for a Node.js app</span>
                <CodeSnippet 
                  rawText={`# Dockerfile\nFROM node:20-alpine        # start from an official base image\nWORKDIR /app               # set the working directory inside the image\nCOPY package*.json ./      # copy dependency manifests first (caching!)\nRUN npm install            # install dependencies as a build step\nCOPY . .                   # copy the rest of the source code\nEXPOSE 3000                # document the port the app listens on\nCMD ["node", "server.js"]  # the command that runs when a container starts`}
                  code={<>
                    <span className="cmt"># Dockerfile</span>{'\n'}
                    <span className="key">FROM</span> node:20-alpine        <span className="cmt"># start from an official base image</span>{'\n'}
                    <span className="key">WORKDIR</span> /app               <span className="cmt"># set the working directory inside the image</span>{'\n'}
                    <span className="key">COPY</span> package*.json ./      <span className="cmt"># copy dependency manifests first (caching!)</span>{'\n'}
                    <span className="key">RUN</span> npm install            <span className="cmt"># install dependencies as a build step</span>{'\n'}
                    <span className="key">COPY</span> . .                   <span className="cmt"># copy the rest of the source code</span>{'\n'}
                    <span className="key">EXPOSE</span> 3000                <span className="cmt"># document the port the app listens on</span>{'\n'}
                    <span className="key">CMD</span> ["node", "server.js"]  <span className="cmt"># the command that runs when a container starts</span>
                  </>}
                />
                <div className="docker-table-responsive">
                  <table className="docker-ref">
                    <thead>
                      <tr><th>Instruction</th><th>What it does</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><code>FROM</code></td><td>Sets the base image everything else builds on top of.</td></tr>
                      <tr><td><code>WORKDIR</code></td><td>Sets the directory subsequent instructions run in.</td></tr>
                      <tr><td><code>COPY</code> / <code>ADD</code></td><td>Copies files from your machine into the image.</td></tr>
                      <tr><td><code>RUN</code></td><td>Executes a command at build time, creating a new layer.</td></tr>
                      <tr><td><code>CMD</code></td><td>The default command a container runs on startup (overridable).</td></tr>
                      <tr><td><code>ENTRYPOINT</code></td><td>Like <code>CMD</code>, but harder to override — defines the executable.</td></tr>
                      <tr><td><code>EXPOSE</code></td><td>Documents which port the container listens on (doesn't publish it).</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    The complete Dockerfile reference — every instruction, every flag, every edge case.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/reference/dockerfile/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/reference/dockerfile <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 6 */}
            <section className="docker-chapter" id="ch6" style={{ '--accent': '#1a6fb5' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">06</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Getting Started</span>
                  <h2>Building Images</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p><code>docker build</code> reads a Dockerfile and a <strong>build context</strong> (the files around it) and produces an image, layer by layer, caching each step so unchanged layers rebuild instantly.</p>
                <span className="docker-code-label">Build, tag, and inspect an image</span>
                <CodeSnippet 
                  rawText={`# build the image in the current directory, tag it myapp:1.0\ndocker build -t myapp:1.0 .\n\n# build using a Dockerfile with a different name/location\ndocker build -f docker/Dockerfile.prod -t myapp:prod .\n\n# list local images\ndocker images\n\n# see the layer-by-layer history of an image\ndocker history myapp:1.0\n\n# remove an image\ndocker rmi myapp:1.0`}
                  code={<>
                    <span className="cmt"># build the image in the current directory, tag it myapp:1.0</span>{'\n'}
                    <span className="cmd">docker build</span> -t myapp:1.0 .{'\n\n'}
                    <span className="cmt"># build using a Dockerfile with a different name/location</span>{'\n'}
                    <span className="cmd">docker build</span> -f docker/Dockerfile.prod -t myapp:prod .{'\n\n'}
                    <span className="cmt"># list local images</span>{'\n'}
                    <span className="cmd">docker images</span>{'\n\n'}
                    <span className="cmt"># see the layer-by-layer history of an image</span>{'\n'}
                    <span className="cmd">docker history</span> myapp:1.0{'\n\n'}
                    <span className="cmt"># remove an image</span>{'\n'}
                    <span className="cmd">docker rmi</span> myapp:1.0
                  </>}
                />
                <div className="docker-callout tip">
                  <span className="docker-tag">Caching tip</span>
                  <p>Order matters: put instructions that change rarely (like installing dependencies) <em>before</em> instructions that change often (like copying source code), so Docker can reuse cached layers on every rebuild.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    <code>docker build</code> CLI reference, plus the conceptual overview of how builds work.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/reference/cli/docker/image/build/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/reference/cli/docker/image/build <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 7 */}
            <section className="docker-chapter" id="ch7" style={{ '--accent': '#22863a' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">07</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Working With Containers</span>
                  <h2>Running Containers</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p><code>docker run</code> is the single most-used Docker command: it creates a new container from an image and starts it.</p>
                <span className="docker-code-label">The essentials</span>
                <CodeSnippet 
                  rawText={`# run in the foreground, see output live\ndocker run myapp:1.0\n\n# run in the background (detached)\ndocker run -d myapp:1.0\n\n# map host port 8080 to container port 3000\ndocker run -d -p 8080:3000 myapp:1.0\n\n# give the container a friendly name\ndocker run -d --name my-container -p 8080:3000 myapp:1.0\n\n# remove the container automatically when it stops\ndocker run --rm myapp:1.0\n\n# open an interactive shell inside a NEW container\ndocker run -it ubuntu bash`}
                  code={<>
                    <span className="cmt"># run in the foreground, see output live</span>{'\n'}
                    <span className="cmd">docker run</span> myapp:1.0{'\n\n'}
                    <span className="cmt"># run in the background (detached)</span>{'\n'}
                    <span className="cmd">docker run</span> -d myapp:1.0{'\n\n'}
                    <span className="cmt"># map host port 8080 to container port 3000</span>{'\n'}
                    <span className="cmd">docker run</span> -d -p 8080:3000 myapp:1.0{'\n\n'}
                    <span className="cmt"># give the container a friendly name</span>{'\n'}
                    <span className="cmd">docker run</span> -d --name my-container -p 8080:3000 myapp:1.0{'\n\n'}
                    <span className="cmt"># remove the container automatically when it stops</span>{'\n'}
                    <span className="cmd">docker run</span> --rm myapp:1.0{'\n\n'}
                    <span className="cmt"># open an interactive shell inside a NEW container</span>{'\n'}
                    <span className="cmd">docker run</span> -it ubuntu bash
                  </>}
                />
                <div className="docker-table-responsive">
                  <table className="docker-ref">
                    <thead>
                      <tr><th>Flag</th><th>Meaning</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><code>-d</code></td><td>Detached — run in the background</td></tr>
                      <tr><td><code>-p host:container</code></td><td>Publish a container port to the host</td></tr>
                      <tr><td><code>-it</code></td><td>Interactive terminal — for shells and REPLs</td></tr>
                      <tr><td><code>--name</code></td><td>Assign a readable container name</td></tr>
                      <tr><td><code>--rm</code></td><td>Auto-remove the container on exit</td></tr>
                      <tr><td><code>-e KEY=value</code></td><td>Set an environment variable</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    The full <code>docker run</code> CLI reference — every flag this command accepts.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/reference/cli/docker/container/run/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/reference/cli/docker/container/run <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 8 */}
            <section className="docker-chapter" id="ch8" style={{ '--accent': '#22863a' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">08</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Working With Containers</span>
                  <h2>Managing the Container Lifecycle</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>A container moves through a predictable lifecycle: created → running → stopped → removed. These commands control every stage.</p>

                <div className="docker-flow">
                  <div className="docker-zone">
                    <div className="docker-zone-icon" style={{ background: '#6b7280' }}>1</div>
                    <h4>Created</h4>
                    <p>Exists, hasn't started.</p>
                    <span className="docker-cmdtag">docker create</span>
                    <span className="docker-arrow">→</span>
                  </div>
                  <div className="docker-zone">
                    <div className="docker-zone-icon" style={{ background: '#22863a' }}>2</div>
                    <h4>Running</h4>
                    <p>Process is active.</p>
                    <span className="docker-cmdtag">docker start</span>
                    <span className="docker-arrow">→</span>
                  </div>
                  <div className="docker-zone">
                    <div className="docker-zone-icon" style={{ background: '#c98a12' }}>3</div>
                    <h4>Stopped</h4>
                    <p>Process ended, container remains.</p>
                    <span className="docker-cmdtag">docker stop</span>
                    <span className="docker-arrow">→</span>
                  </div>
                  <div className="docker-zone">
                    <div className="docker-zone-icon" style={{ background: '#cf3d6e' }}>4</div>
                    <h4>Removed</h4>
                    <p>Container is deleted.</p>
                    <span className="docker-cmdtag">docker rm</span>
                  </div>
                </div>

                <span className="docker-code-label">Inspect, log, and control running containers</span>
                <CodeSnippet 
                  rawText={`# list running containers\ndocker ps\n\n# list ALL containers, including stopped ones\ndocker ps -a\n\n# stream a container's logs\ndocker logs -f my-container\n\n# run a command inside an ALREADY-running container\ndocker exec -it my-container sh\n\n# stop / start / restart\ndocker stop my-container\ndocker start my-container\ndocker restart my-container\n\n# remove a stopped container\ndocker rm my-container\n\n# clean up every stopped container, unused network, dangling image\ndocker system prune`}
                  code={<>
                    <span className="cmt"># list running containers</span>{'\n'}
                    <span className="cmd">docker ps</span>{'\n\n'}
                    <span className="cmt"># list ALL containers, including stopped ones</span>{'\n'}
                    <span className="cmd">docker ps</span> -a{'\n\n'}
                    <span className="cmt"># stream a container's logs</span>{'\n'}
                    <span className="cmd">docker logs</span> -f my-container{'\n\n'}
                    <span className="cmt"># run a command inside an ALREADY-running container</span>{'\n'}
                    <span className="cmd">docker exec</span> -it my-container sh{'\n\n'}
                    <span className="cmt"># stop / start / restart</span>{'\n'}
                    <span className="cmd">docker stop</span> my-container{'\n'}
                    <span className="cmd">docker start</span> my-container{'\n'}
                    <span className="cmd">docker restart</span> my-container{'\n\n'}
                    <span className="cmt"># remove a stopped container</span>{'\n'}
                    <span className="cmd">docker rm</span> my-container{'\n\n'}
                    <span className="cmt"># clean up every stopped container, unused network, dangling image</span>{'\n'}
                    <span className="cmd">docker system prune</span>
                  </>}
                />
                <div className="docker-callout warn">
                  <span className="docker-tag">exec vs run</span>
                  <p><code>docker run</code> always creates a brand-new container. <code>docker exec</code> opens a session <em>inside a container that's already running</em> — the command to reach for when debugging a live app.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Guide to running containers day-to-day, plus the full <code>docker container</code> command family.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/containers/run/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine/containers/run <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 9 */}
            <section className="docker-chapter" id="ch9" style={{ '--accent': '#0a9f78' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">09</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Data &amp; Storage</span>
                  <h2>Volumes &amp; Data Persistence</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Containers are disposable by design — delete one and everything written inside it disappears too. <strong>Volumes</strong> are Docker-managed storage that lives outside the container's own filesystem, so data survives container removal, restarts, and upgrades.</p>
                <span className="docker-code-label">Create and use a volume</span>
                <CodeSnippet 
                  rawText={`# create a named volume\ndocker volume create my-data\n\n# list volumes\ndocker volume ls\n\n# mount it into a container at /app/data\ndocker run -d -v my-data:/app/data myapp:1.0\n\n# the --mount flag is more explicit (preferred in scripts)\ndocker run -d --mount source=my-data,target=/app/data myapp:1.0\n\n# inspect where Docker actually stores it on the host\ndocker volume inspect my-data\n\n# remove a volume (only when no container uses it)\ndocker volume rm my-data`}
                  code={<>
                    <span className="cmt"># create a named volume</span>{'\n'}
                    <span className="cmd">docker volume create</span> my-data{'\n\n'}
                    <span className="cmt"># list volumes</span>{'\n'}
                    <span className="cmd">docker volume ls</span>{'\n\n'}
                    <span className="cmt"># mount it into a container at /app/data</span>{'\n'}
                    <span className="cmd">docker run</span> -d -v my-data:/app/data myapp:1.0{'\n\n'}
                    <span className="cmt"># the --mount flag is more explicit (preferred in scripts)</span>{'\n'}
                    <span className="cmd">docker run</span> -d --mount source=my-data,target=/app/data myapp:1.0{'\n\n'}
                    <span className="cmt"># inspect where Docker actually stores it on the host</span>{'\n'}
                    <span className="cmd">docker volume inspect</span> my-data{'\n\n'}
                    <span className="cmt"># remove a volume (only when no container uses it)</span>{'\n'}
                    <span className="cmd">docker volume rm</span> my-data
                  </>}
                />
                <div className="docker-callout tip">
                  <span className="docker-tag">Why volumes over writing to the container</span>
                  <p>Volumes are managed by Docker, work identically on Linux and Windows, can be backed up with standard tools, and — unlike a container's writable layer — don't slow down with heavy I/O.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    The full volumes guide — lifecycle, drivers, backup/restore, and Compose integration.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/storage/volumes/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine/storage/volumes <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 10 */}
            <section className="docker-chapter" id="ch10" style={{ '--accent': '#0a9f78' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">10</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Data &amp; Storage</span>
                  <h2>Bind Mounts</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>A <strong>bind mount</strong> maps a specific file or folder from your host machine directly into a container — unlike a volume, Docker doesn't manage its contents. It's the go-to for local development: edit code on your laptop, see the change immediately inside the running container.</p>
                <span className="docker-code-label">Mount your source code into a dev container</span>
                <CodeSnippet 
                  rawText={`# mount the current directory into /app inside the container\ndocker run -d -v $(pwd):/app -p 3000:3000 myapp:dev\n\n# the --mount flag, explicit form\ndocker run -d --mount type=bind,source="$(pwd)",target=/app myapp:dev`}
                  code={<>
                    <span className="cmt"># mount the current directory into /app inside the container</span>{'\n'}
                    <span className="cmd">docker run</span> -d -v $(pwd):/app -p 3000:3000 myapp:dev{'\n\n'}
                    <span className="cmt"># the --mount flag, explicit form</span>{'\n'}
                    <span className="cmd">docker run</span> -d --mount type=bind,source="$(pwd)",target=/app myapp:dev
                  </>}
                />
                <div className="docker-table-responsive">
                  <table className="docker-ref">
                    <thead>
                      <tr><th>Feature</th><th>Volume</th><th>Bind mount</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><strong>Managed by</strong></td><td>Docker internal engine</td><td>You (host filesystem path)</td></tr>
                      <tr><td><strong>Best for</strong></td><td>Persistent app data, production databases</td><td>Local hot reloading development, custom config files</td></tr>
                      <tr><td><strong>Portability</strong></td><td>High — works identically across hosts</td><td>Low — bound to specific host system directory</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Bind mounts guide — syntax, read-only mounts, and when to prefer them over volumes.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/storage/bind-mounts/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine/storage/bind-mounts <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 11 */}
            <section className="docker-chapter" id="ch11" style={{ '--accent': '#8957e5' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">11</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Connectivity</span>
                  <h2>Networking</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>By default, every container gets attached to a private network, isolated from others unless you explicitly connect them. Docker ships several network drivers for different situations.</p>
                <div className="docker-grid3">
                  <div className="docker-concept-card" style={{ '--accent': '#8957e5' }}>
                    <span className="docker-term">bridge</span>
                    <p>The default driver. A private internal network on a single host — containers on it can reach each other by name.</p>
                  </div>
                  <div className="docker-concept-card" style={{ '--accent': '#8957e5' }}>
                    <span className="docker-term">host</span>
                    <p>Removes network isolation — the container shares the host's network stack directly without port mapping.</p>
                  </div>
                  <div className="docker-concept-card" style={{ '--accent': '#8957e5' }}>
                    <span className="docker-term">none</span>
                    <p>No networking at all — fully isolated loopback-only environment.</p>
                  </div>
                </div>
                <span className="docker-code-label">Create a network and connect containers on it</span>
                <CodeSnippet 
                  rawText={`# create a custom bridge network\ndocker network create my-app-net\n\n# run two containers on it — they can reach each other by NAME\ndocker run -d --name api --network my-app-net myapi:1.0\ndocker run -d --name db --network my-app-net postgres:16\n\n# inside "api", this just works thanks to Docker's internal DNS:\n# postgres://db:5432/mydb\n\n# list / inspect / remove networks\ndocker network ls\ndocker network inspect my-app-net\ndocker network rm my-app-net`}
                  code={<>
                    <span className="cmt"># create a custom bridge network</span>{'\n'}
                    <span className="cmd">docker network create</span> my-app-net{'\n\n'}
                    <span className="cmt"># run two containers on it — they can reach each other by NAME</span>{'\n'}
                    <span className="cmd">docker run</span> -d --name api --network my-app-net myapi:1.0{'\n'}
                    <span className="cmd">docker run</span> -d --name db --network my-app-net postgres:16{'\n\n'}
                    <span className="cmt"># inside "api", this just works thanks to Docker's internal DNS:</span>{'\n'}
                    <span className="cmt"># postgres://db:5432/mydb</span>{'\n\n'}
                    <span className="cmt"># list / inspect / remove networks</span>{'\n'}
                    <span className="cmd">docker network ls</span>{'\n'}
                    <span className="cmd">docker network inspect</span> my-app-net{'\n'}
                    <span className="cmd">docker network rm</span> my-app-net
                  </>}
                />
                <div className="docker-callout tip">
                  <span className="docker-tag">Service discovery</span>
                  <p>Containers on the same custom network can resolve each other by container name through Docker's built-in DNS — no hardcoded IP addresses needed. This is exactly how Compose connects your services.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Networking overview, plus a deep dive into the bridge driver that most setups use.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/network/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine/network <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 12 */}
            <section className="docker-chapter" id="ch12" style={{ '--accent': '#c98a12' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">12</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Configuration</span>
                  <h2>Environment Variables &amp; Config</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Hardcoding config (database URLs, API keys, feature flags) into an image defeats the point of building one image and running it everywhere. Environment variables let the same image behave differently in development, staging, and production.</p>
                <span className="docker-code-label">Pass environment variables into a container</span>
                <CodeSnippet 
                  rawText={`# set individual variables\ndocker run -e NODE_ENV=production -e PORT=3000 myapp:1.0\n\n# load many variables from a file\ndocker run --env-file .env myapp:1.0\n\n# inspect what a running container actually sees\ndocker exec my-container env`}
                  code={<>
                    <span className="cmt"># set individual variables</span>{'\n'}
                    <span className="cmd">docker run</span> -e NODE_ENV=production -e PORT=3000 myapp:1.0{'\n\n'}
                    <span className="cmt"># load many variables from a file</span>{'\n'}
                    <span className="cmd">docker run</span> --env-file .env myapp:1.0{'\n\n'}
                    <span className="cmt"># inspect what a running container actually sees</span>{'\n'}
                    <span className="cmd">docker exec</span> my-container env
                  </>}
                />
                <div className="docker-callout warn">
                  <span className="docker-tag">Secrets</span>
                  <p>Plain environment variables are visible via <code>docker inspect</code> and process listings — fine for non-sensitive config, but not for passwords or API keys. For those, use Docker secrets (Swarm) or your platform's dedicated secrets manager.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    How to set, layer, and template environment variables in Compose projects.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/compose/how-tos/environment-variables/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/compose/how-tos/environment-variables <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 13 */}
            <section className="docker-chapter" id="ch13" style={{ '--accent': '#2496ed' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">13</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Multi-Container Apps</span>
                  <h2>Docker Compose</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Real applications are rarely one container — an API, a database, a cache, a frontend. <strong>Compose</strong> defines your whole stack in one YAML file and brings it up (or down) with a single command.</p>
                <span className="docker-code-label">A compose.yaml for an app + database</span>
                <CodeSnippet 
                  rawText={`# compose.yaml\nservices:\n  api:\n    build: .\n    ports:\n      - "8080:3000"\n    environment:\n      - DATABASE_URL=postgres://db:5432/mydb\n    depends_on:\n      - db\n\n  db:\n    image: postgres:16\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_PASSWORD=secret\n\nvolumes:\n  db-data:`}
                  code={<>
                    <span className="cmt"># compose.yaml</span>{'\n'}
                    <span className="key">services</span>:{'\n'}
                    {'  '}api:{'\n'}
                    {'    '}<span className="key">build</span>: .{'\n'}
                    {'    '}<span className="key">ports</span>:{'\n'}
                    {'      '}- <span className="str">"8080:3000"</span>{'\n'}
                    {'    '}<span className="key">environment</span>:{'\n'}
                    {'      '}- DATABASE_URL=postgres://db:5432/mydb{'\n'}
                    {'    '}<span className="key">depends_on</span>:{'\n'}
                    {'      '}- db{'\n\n'}
                    {'  '}db:{'\n'}
                    {'    '}<span className="key">image</span>: postgres:16{'\n'}
                    {'    '}<span className="key">volumes</span>:{'\n'}
                    {'      '}- db-data:/var/lib/postgresql/data{'\n'}
                    {'    '}<span className="key">environment</span>:{'\n'}
                    {'      '}- POSTGRES_PASSWORD=secret{'\n\n'}
                    <span className="key">volumes</span>:{'\n'}
                    {'  '}db-data:
                  </>}
                />
                <span className="docker-code-label">The commands you'll actually use</span>
                <CodeSnippet 
                  rawText={`# build images and start every service, in the background\ndocker compose up -d\n\n# view logs across all services\ndocker compose logs -f\n\n# see what's running\ndocker compose ps\n\n# run a one-off command in a service's container\ndocker compose exec api sh\n\n# stop and remove everything Compose created\ndocker compose down\n\n# also remove named volumes (careful — deletes data)\ndocker compose down -v`}
                  code={<>
                    <span className="cmt"># build images and start every service, in the background</span>{'\n'}
                    <span className="cmd">docker compose up</span> -d{'\n\n'}
                    <span className="cmt"># view logs across all services</span>{'\n'}
                    <span className="cmd">docker compose logs</span> -f{'\n\n'}
                    <span className="cmt"># see what's running</span>{'\n'}
                    <span className="cmd">docker compose ps</span>{'\n\n'}
                    <span className="cmt"># run a one-off command in a service's container</span>{'\n'}
                    <span className="cmd">docker compose exec</span> api sh{'\n\n'}
                    <span className="cmt"># stop and remove everything Compose created</span>{'\n'}
                    <span className="cmd">docker compose down</span>{'\n\n'}
                    <span className="cmt"># also remove named volumes (careful — deletes data)</span>{'\n'}
                    <span className="cmd">docker compose down</span> -v
                  </>}
                />
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Compose quickstart, plus the full Compose file reference for every key shown above.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/compose/gettingstarted/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/compose/gettingstarted <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 14 */}
            <section className="docker-chapter" id="ch14" style={{ '--accent': '#1a6fb5' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">14</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Production Readiness</span>
                  <h2>Multi-Stage Builds &amp; Best Practices</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>A naive Dockerfile often ships compilers, build tools, and dev dependencies into production — bloating the image and widening its attack surface. <strong>Multi-stage builds</strong> use one stage to build the app and a second, minimal stage to run it, copying across only what's needed.</p>
                <span className="docker-code-label">Multi-stage Dockerfile for a Go app</span>
                <CodeSnippet 
                  rawText={`# ---- stage 1: build ----\nFROM golang:1.22 AS builder\nWORKDIR /src\nCOPY . .\nRUN go build -o /out/app .\n\n# ---- stage 2: run (tiny final image) ----\nFROM alpine:3.19\nCOPY --from=builder /out/app /app\nENTRYPOINT ["/app"]`}
                  code={<>
                    <span className="cmt"># ---- stage 1: build ----</span>{'\n'}
                    <span className="key">FROM</span> golang:1.22 <span className="key">AS</span> builder{'\n'}
                    <span className="key">WORKDIR</span> /src{'\n'}
                    <span className="key">COPY</span> . .{'\n'}
                    <span className="key">RUN</span> go build -o /out/app .{'\n\n'}
                    <span className="cmt"># ---- stage 2: run (tiny final image) ----</span>{'\n'}
                    <span className="key">FROM</span> alpine:3.19{'\n'}
                    <span className="key">COPY</span> --from=builder /out/app /app{'\n'}
                    <span className="key">ENTRYPOINT</span> ["/app"]
                  </>}
                />
                <p>The final image contains only Alpine Linux plus the compiled binary — no Go toolchain, no source code, often a 20x size reduction.</p>
                <div className="docker-grid2">
                  <div className="docker-card">
                    <h3>Keep images small</h3>
                    <p>Use slim/alpine base images, combine <code>RUN</code> commands to reduce layers, and add a <code>.dockerignore</code> to exclude <code>node_modules</code>, <code>.git</code>, and build artifacts from the build context.</p>
                  </div>
                  <div className="docker-card">
                    <h3>Keep builds fast</h3>
                    <p>Order instructions from least to most frequently changing, and copy dependency manifests before source code so Docker's cache survives code-only changes.</p>
                  </div>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Multi-stage builds guide, plus Docker's own checklist of image-building best practices.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/build/building/multi-stage/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/build/building/multi-stage <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 15 */}
            <section className="docker-chapter" id="ch15" style={{ '--accent': '#c98a12' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">15</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Distribution</span>
                  <h2>Docker Hub &amp; Registries</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p><strong>Docker Hub</strong> is Docker's own public registry — the default source for base images like <code>node</code>, <code>postgres</code>, and <code>nginx</code>, and a place to publish your own. Private registries (GitHub Container Registry, AWS ECR, Google Artifact Registry, a self-hosted registry) work the same way once authenticated.</p>
                <span className="docker-code-label">Tag, push, and pull images</span>
                <CodeSnippet 
                  rawText={`# log in (prompts for username / access token)\ndocker login\n\n# tag a local image for your Docker Hub namespace\ndocker tag myapp:1.0 myusername/myapp:1.0\n\n# push it\ndocker push myusername/myapp:1.0\n\n# pull it down on any other machine\ndocker pull myusername/myapp:1.0\n\n# search Docker Hub from the CLI\ndocker search postgres`}
                  code={<>
                    <span className="cmt"># log in (prompts for username / access token)</span>{'\n'}
                    <span className="cmd">docker login</span>{'\n\n'}
                    <span className="cmt"># tag a local image for your Docker Hub namespace</span>{'\n'}
                    <span className="cmd">docker tag</span> myapp:1.0 myusername/myapp:1.0{'\n\n'}
                    <span className="cmt"># push it</span>{'\n'}
                    <span className="cmd">docker push</span> myusername/myapp:1.0{'\n\n'}
                    <span className="cmt"># pull it down on any other machine</span>{'\n'}
                    <span className="cmd">docker pull</span> myusername/myapp:1.0{'\n\n'}
                    <span className="cmt"># search Docker Hub from the CLI</span>{'\n'}
                    <span className="cmd">docker search</span> postgres
                  </>}
                />
                <div className="docker-callout tip">
                  <span className="docker-tag">Tagging convention</span>
                  <p>Avoid relying on <code>:latest</code> in production — it's just a tag, not a guarantee of what's "newest." Tag releases explicitly (<code>v1.4.2</code>, a git SHA, a build number) so every deployment is reproducible and reversible.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Docker Hub quickstart — creating repositories, access tokens, and pushing your first image.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/docker-hub/quickstart/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/docker-hub/quickstart <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 16 */}
            <section className="docker-chapter" id="ch16" style={{ '--accent': '#8957e5' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">16</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">For DevOps</span>
                  <h2>Docker for DevOps &amp; CI/CD</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>In a CI/CD pipeline, Docker is usually the unit of deployment: every merged change builds a fresh image, tests run inside a container, and a passing image gets pushed to a registry and deployed.</p>
                <div className="docker-callout devops">
                  <span className="docker-tag">Core idea</span>
                  <p>Building once and promoting the same image through dev → staging → production (rather than rebuilding at each stage) guarantees that what you tested is exactly what ships.</p>
                </div>
                <span className="docker-code-label">A minimal GitHub Actions workflow</span>
                <CodeSnippet 
                  rawText={`# .github/workflows/docker.yml\nname: Build and Push\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Log in to Docker Hub\n        uses: docker/login-action@v3\n        with:\n          username: \${{ secrets.DOCKERHUB_USERNAME }}\n          password: \${{ secrets.DOCKERHUB_TOKEN }}\n      - name: Build and push\n        uses: docker/build-push-action@v6\n        with:\n          push: true\n          tags: myusername/myapp:\${{ github.sha }}`}
                  code={<>
                    <span className="cmt"># .github/workflows/docker.yml</span>{'\n'}
                    name: Build and Push{'\n\n'}
                    <span className="flag">on</span>:{'\n'}
                    {'  '}push:{'\n'}
                    {'    '}branches: [ main ]{'\n\n'}
                    jobs:{'\n'}
                    {'  '}build:{'\n'}
                    {'    '}runs-on: ubuntu-latest{'\n'}
                    {'    '}steps:{'\n'}
                    {'      '}- uses: actions/checkout@v4{'\n'}
                    {'      '}- name: Log in to Docker Hub{'\n'}
                    {'        '}uses: docker/login-action@v3{'\n'}
                    {'        '}with:{'\n'}
                    {'          '}username: {'${{ secrets.DOCKERHUB_USERNAME }}'}{'\n'}
                    {'          '}password: {'${{ secrets.DOCKERHUB_TOKEN }}'}{'\n'}
                    {'      '}- name: Build and push{'\n'}
                    {'        '}uses: docker/build-push-action@v6{'\n'}
                    {'        '}with:{'\n'}
                    {'          '}push: true{'\n'}
                    {'          '}tags: myusername/myapp:{'${{ github.sha }}'}
                  </>}
                />
                <div className="docker-grid2">
                  <div className="docker-card">
                    <h3>Build caching in CI</h3>
                    <p>CI runners start cold every time, so layer caching from your local machine doesn't help — use a registry cache or GitHub Actions cache backend to keep builds fast.</p>
                  </div>
                  <div className="docker-card">
                    <h3>Immutable image tags</h3>
                    <p>Tag each build with its Git SHA so a deployment can always be traced back to the exact commit that produced it, and rollbacks are just re-deploying an older tag.</p>
                  </div>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Docker's official GitHub Actions guide — the build-push-action, caching, and multi-platform builds.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/build/ci/github-actions/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/build/ci/github-actions <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 17 */}
            <section className="docker-chapter" id="ch17" style={{ '--accent': '#cf3d6e' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">17</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Hardening</span>
                  <h2>Security Best Practices</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>A container is not a security boundary by default — it shares the host's kernel. A few habits close most of the common gaps.</p>
                <div className="docker-grid2">
                  <div className="docker-concept-card" style={{ '--accent': '#cf3d6e' }}>
                    <span className="docker-term">Don't run as root</span>
                    <p>Add a <code>USER</code> instruction in your Dockerfile so the process inside the container runs unprivileged, limiting the damage of a container breakout.</p>
                  </div>
                  <div className="docker-concept-card" style={{ '--accent': '#cf3d6e' }}>
                    <span className="docker-term">Use official / minimal base images</span>
                    <p>Smaller images (alpine, distroless, Docker Hardened Images) ship fewer packages — and fewer packages means fewer CVEs to track.</p>
                  </div>
                  <div className="docker-concept-card" style={{ '--accent': '#cf3d6e' }}>
                    <span className="docker-term">Scan images</span>
                    <p>Run a vulnerability scanner (<code>docker scout</code>, Trivy, Grype) in CI and block pushes that introduce known-critical CVEs.</p>
                  </div>
                  <div className="docker-concept-card" style={{ '--accent': '#cf3d6e' }}>
                    <span className="docker-term">Never bake in secrets</span>
                    <p>A secret <code>COPY</code>'d or <code>RUN</code> into an image layer persists in image history even if a later layer deletes it. Use build secrets or runtime environment injection instead.</p>
                  </div>
                </div>
                <span className="docker-code-label">Add a non-root user to a Dockerfile</span>
                <CodeSnippet 
                  rawText={`FROM node:20-alpine\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\n# ...rest of the Dockerfile`}
                  code={<>
                    <span className="key">FROM</span> node:20-alpine{'\n'}
                    <span className="key">RUN</span> addgroup -S appgroup &amp;&amp; adduser -S appuser -G appgroup{'\n'}
                    <span className="key">USER</span> appuser{'\n'}
                    <span className="cmt"># ...rest of the Dockerfile</span>
                  </>}
                />
                <div className="docker-callout danger">
                  <span className="docker-tag">Rootless mode</span>
                  <p>For an extra layer of defense, the Docker <em>daemon itself</em> can run without root privileges on the host — see Rootless mode in the docs below.</p>
                </div>
                <div className="docker-ref-box">
                  <div className="docker-ref-text">
                    <strong>Read the official docs</strong>
                    Docker Engine security overview — rootless mode, seccomp profiles, and content trust.
                  </div>
                  <a className="docker-ref-link" href="https://docs.docker.com/engine/security/" target="_blank" rel="noopener noreferrer">
                    docs.docker.com/engine/security <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* CH 18 : CHEAT SHEET */}
            <section className="docker-chapter" id="ch18" style={{ '--accent': '#2496ed' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">18</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Quick Reference</span>
                  <h2>Command Cheat Sheet</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>Every command from this handbook, grouped by category, for a fast scan when you're mid-terminal.</p>
                <div className="docker-cheat-grid">

                  <div className="docker-cheat-cat">
                    <div className="hd" style={{ background: '#1a6fb5' }}>Images</div>
                    <ul>
                      <li><code>docker build -t name .</code><span className="desc">build image</span></li>
                      <li><code>docker images</code><span className="desc">list images</span></li>
                      <li><code>docker tag src dst</code><span className="desc">rename / version</span></li>
                      <li><code>docker rmi name</code><span className="desc">remove image</span></li>
                    </ul>
                  </div>

                  <div className="docker-cheat-cat">
                    <div className="hd" style={{ background: '#22863a' }}>Containers</div>
                    <ul>
                      <li><code>docker run -d -p 8080:80 img</code><span className="desc">start one</span></li>
                      <li><code>docker ps -a</code><span className="desc">list all</span></li>
                      <li><code>docker exec -it c sh</code><span className="desc">shell in</span></li>
                      <li><code>docker logs -f c</code><span className="desc">stream logs</span></li>
                      <li><code>docker stop / rm c</code><span className="desc">stop / delete</span></li>
                    </ul>
                  </div>

                  <div className="docker-cheat-cat">
                    <div className="hd" style={{ background: '#0a9f78' }}>Volumes</div>
                    <ul>
                      <li><code>docker volume create v</code><span className="desc">new volume</span></li>
                      <li><code>docker volume ls</code><span className="desc">list</span></li>
                      <li><code>-v v:/path</code><span className="desc">mount flag</span></li>
                      <li><code>docker volume rm v</code><span className="desc">remove</span></li>
                    </ul>
                  </div>

                  <div className="docker-cheat-cat">
                    <div className="hd" style={{ background: '#8957e5' }}>Networks</div>
                    <ul>
                      <li><code>docker network create n</code><span className="desc">new network</span></li>
                      <li><code>docker network ls</code><span className="desc">list</span></li>
                      <li><code>--network n</code><span className="desc">attach flag</span></li>
                      <li><code>docker network rm n</code><span className="desc">remove</span></li>
                    </ul>
                  </div>

                  <div className="docker-cheat-cat">
                    <div className="hd" style={{ background: '#2496ed' }}>Compose</div>
                    <ul>
                      <li><code>docker compose up -d</code><span className="desc">start stack</span></li>
                      <li><code>docker compose ps</code><span className="desc">list services</span></li>
                      <li><code>docker compose logs -f</code><span className="desc">stream logs</span></li>
                      <li><code>docker compose down</code><span className="desc">stop + remove</span></li>
                    </ul>
                  </div>

                  <div className="docker-cheat-cat">
                    <div className="hd" style={{ background: '#c98a12' }}>Registry</div>
                    <ul>
                      <li><code>docker login</code><span className="desc">authenticate</span></li>
                      <li><code>docker tag a user/a</code><span className="desc">tag for push</span></li>
                      <li><code>docker push user/a</code><span className="desc">publish</span></li>
                      <li><code>docker pull user/a</code><span className="desc">download</span></li>
                    </ul>
                  </div>

                </div>
              </div>
            </section>

            {/* CH 19 : FURTHER READING */}
            <section className="docker-chapter" id="ch19" style={{ '--accent': '#6b7280' }}>
              <div className="docker-chapter-head">
                <div className="docker-chapter-num">19</div>
                <div className="docker-chapter-title">
                  <span className="docker-kicker">Beyond This Page</span>
                  <h2>Further Reading — Official Documentation</h2>
                </div>
              </div>
              <div className="docker-chapter-body">
                <p>This handbook covers the 80% you'll use daily. Every official page referenced throughout is collected here — the actual source to go deeper on any topic.</p>
                <div className="docker-reading-list">
                  <a className="docker-reading-item" href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Foundations</span><span className="r-title">Get started with Docker</span><span className="r-url">docs.docker.com/get-started</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/reference/glossary/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Foundations</span><span className="r-title">Glossary of Docker terms</span><span className="r-url">docs.docker.com/reference/glossary</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Foundations</span><span className="r-title">Docker Engine overview</span><span className="r-url">docs.docker.com/engine</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Setup</span><span className="r-title">Install Docker Engine</span><span className="r-url">docs.docker.com/engine/install</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/reference/dockerfile/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Images</span><span className="r-title">Dockerfile reference</span><span className="r-url">docs.docker.com/reference/dockerfile</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/reference/cli/docker/image/build/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Images</span><span className="r-title">docker build reference</span><span className="r-url">docs.docker.com/reference/cli/docker/image/build</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/reference/cli/docker/container/run/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Containers</span><span className="r-title">docker run reference</span><span className="r-url">docs.docker.com/reference/cli/docker/container/run</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/containers/run/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Containers</span><span className="r-title">Running containers guide</span><span className="r-url">docs.docker.com/engine/containers/run</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/storage/volumes/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Storage</span><span className="r-title">Volumes</span><span className="r-url">docs.docker.com/engine/storage/volumes</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/storage/bind-mounts/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Storage</span><span className="r-title">Bind mounts</span><span className="r-url">docs.docker.com/engine/storage/bind-mounts</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/network/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Networking</span><span className="r-title">Networking overview</span><span className="r-url">docs.docker.com/engine/network</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/compose/how-tos/environment-variables/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Config</span><span className="r-title">Environment variables in Compose</span><span className="r-url">docs.docker.com/compose/how-tos/environment-variables</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/compose/gettingstarted/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Compose</span><span className="r-title">Compose quickstart</span><span className="r-url">docs.docker.com/compose/gettingstarted</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/reference/compose-file/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Compose</span><span className="r-title">Compose file reference</span><span className="r-url">docs.docker.com/reference/compose-file</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/build/building/multi-stage/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Build</span><span className="r-title">Multi-stage builds</span><span className="r-url">docs.docker.com/build/building/multi-stage</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/build/building/best-practices/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Build</span><span className="r-title">Dockerfile best practices</span><span className="r-url">docs.docker.com/build/building/best-practices</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/docker-hub/quickstart/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Registry</span><span className="r-title">Docker Hub quickstart</span><span className="r-url">docs.docker.com/docker-hub/quickstart</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/build/ci/github-actions/" target="_blank" rel="noopener noreferrer"><span className="r-cat">DevOps</span><span className="r-title">Docker + GitHub Actions</span><span className="r-url">docs.docker.com/build/ci/github-actions</span></a>
                  <a className="docker-reading-item" href="https://docs.docker.com/engine/security/" target="_blank" rel="noopener noreferrer"><span className="r-cat">Security</span><span className="r-title">Docker Engine security</span><span className="r-url">docs.docker.com/engine/security</span></a>
                </div>
              </div>
            </section>

          </div>

          {/* Author Bio Card */}
          <div className="docker-author-bio-card">
            <div className="docker-author-avatar-badge">
              <span>MK</span>
            </div>
            <div className="docker-author-bio-info">
              <span className="docker-author-subtitle">Authored by</span>
              <h3 className="docker-author-name">Mayank Kumar</h3>
              <p className="docker-author-desc">
                Full Stack Developer &amp; MCA Candidate specializing in Java, Spring Boot, React.js, and Cloud Architectures. Creator of open-source handbooks and tools for developer productivity.
              </p>
              <div className="docker-author-links">
                <a href="https://github.com/mayank78geu" target="_blank" rel="noopener noreferrer" className="docker-author-link-btn">
                  <FaGithub /> GitHub
                </a>
                <a href="https://linkedin.com/in/mayank78stu" target="_blank" rel="noopener noreferrer" className="docker-author-link-btn">
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Back to Blog Button */}
          <div className="docker-handbook-footer-actions">
            <Link to="/blog" className="btn btn-primary">
              <FaArrowLeft /> Back to All Articles
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DockerHandbook;
