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
  FaLightbulb,
  FaExclamationTriangle,
  FaCogs
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './GitGitHubHandbook.css';

const chapters = [
  { id: 'ch1', num: '01', title: 'Why Version Control Exists', kicker: 'Foundations', color: '#f0502f' },
  { id: 'ch2', num: '02', title: 'Core Git Vocabulary', kicker: 'Foundations', color: '#f0502f' },
  { id: 'ch3', num: '03', title: 'The Four Zones of a Repo', kicker: 'Foundations', color: '#f0502f' },
  { id: 'ch4', num: '04', title: 'Install & First-Time Setup', kicker: 'Getting Started', color: '#1f6feb' },
  { id: 'ch5', num: '05', title: 'Starting a Project', kicker: 'Getting Started', color: '#1f6feb' },
  { id: 'ch6', num: '06', title: 'The Daily Loop', kicker: 'Getting Started', color: '#1f6feb' },
  { id: 'ch7', num: '07', title: 'Branching', kicker: 'Collaboration', color: '#22863a' },
  { id: 'ch8', num: '08', title: 'Merging & Rebasing', kicker: 'Collaboration', color: '#22863a' },
  { id: 'ch9', num: '09', title: 'Stashing Work', kicker: 'Everyday Tools', color: '#c98a12' },
  { id: 'ch10', num: '10', title: 'Fetch, Pull & Push', kicker: 'Everyday Tools', color: '#c98a12' },
  { id: 'ch11', num: '11', title: 'Remotes: HTTPS vs SSH', kicker: 'Connecting to GitHub', color: '#8957e5' },
  { id: 'ch12', num: '12', title: 'Undoing Things Safely', kicker: 'Recovery', color: '#cf3d6e' },
  { id: 'ch13', num: '13', title: '.gitignore & Hygiene', kicker: 'Recovery', color: '#cf3d6e' },
  { id: 'ch14', num: '14', title: 'Git vs GitHub', kicker: 'The Bigger Picture', color: '#1f6feb' },
  { id: 'ch15', num: '15', title: 'GitHub: PRs, Issues, Forks', kicker: 'The Bigger Picture', color: '#22863a' },
  { id: 'ch16', num: '16', title: 'Git for DevOps & CI/CD', kicker: 'For DevOps', color: '#8957e5' },
  { id: 'ch17', num: '17', title: 'Best Practices', kicker: 'Working Well', color: '#c98a12' },
  { id: 'ch18', num: '18', title: 'Command Cheat Sheet', kicker: 'Quick Reference', color: '#f0502f' },
  { id: 'ch19', num: '19', title: 'Further Reading', kicker: 'Beyond This Page', color: '#6b7280' },
];

const CodeSnippet = ({ code, rawText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText || code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <button 
        className={`copy-code-btn ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copied to clipboard' : 'Copy code'}
        aria-label="Copy code to clipboard"
      >
        {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <pre className="code">{code}</pre>
    </div>
  );
};

const GitGitHubHandbook = () => {
  const [activeChapter, setActiveChapter] = useState('ch1');
  const [copiedShare, setCopiedShare] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Scroll spy and progress bar tracker
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate reading scroll percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // 2. Identify active chapter
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

  // Ensure active chapter link is visible within the sticky sidebar
  useEffect(() => {
    const activeItem = document.querySelector('.graph-nav li.active');
    const sidebar = document.querySelector('.handbook-sidebar');
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
    const text = encodeURIComponent('Check out "The Complete Git & GitHub Handbook" by Mayank Kumar — An A–Z guide for Developers & DevOps!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="handbook-root">
      {/* Top Reading Progress Bar */}
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="handbook-shell">
        {/* ================= STICKY SIDEBAR ================= */}
        <aside className={`handbook-sidebar ${mobileTocOpen ? 'mobile-open' : ''}`} aria-label="Table of contents">
          <div className="side-brand">
            <span className="dot"></span>
            <span>GIT &amp; GITHUB HANDBOOK</span>
          </div>

          <p className="side-caption">Table of Contents ({chapters.length} Chapters)</p>

          <ul className="graph-nav" id="tocList">
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

          <div className="side-foot">
            <strong>Interactive Field Guide</strong>
            <br />
            Scroll or jump to any chapter — index stays pinned to the left while you browse.
          </div>
        </aside>

        {/* Mobile TOC Floating Toggle */}
        <button 
          className="toc-mobile-toggle-btn"
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          aria-label="Toggle Table of Contents"
        >
          <FaListUl /> <span>{mobileTocOpen ? 'Close Outline' : 'Handbook Outline'}</span>
        </button>

        {/* ================= MAIN CONTENT ================= */}
        <main className="handbook-main">
          {/* Breadcrumb Navigation */}
          <div className="handbook-breadcrumbs">
            <Link to="/blog" className="breadcrumb-link">
              <FaArrowLeft size={12} /> All Blogs
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Git &amp; GitHub Handbook</span>
          </div>

          {/* Hero Header */}
          <header className="handbook-hero">
            <div className="eyebrow-container">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span> Complete Reference · Git + GitHub + DevOps
              </span>
            </div>
            
            <h1 className="hero-heading">
              The Complete <em>Git &amp; GitHub</em> Handbook
            </h1>

            <p className="lead">
              An A–Z field guide for developers who write the commits, and the DevOps engineers who build pipelines around them — from your very first <code>git init</code> to branching strategy inside a CI/CD pipeline.
            </p>

            <div className="article-meta-bar">
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>Published: Aug 22, 2026</span>
              </div>
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>15 min read</span>
              </div>
              <div className="meta-item">
                <FaBookmark className="meta-icon" />
                <span>19 Chapters · 60+ Commands</span>
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="hero-terminal">
              <div className="term-bar">
                <span></span><span></span><span></span>
                <span className="term-title">git-cheat-sheet.sh</span>
              </div>
              <pre>
                <span className="c1"># the whole handbook in four lines</span>{'\n'}
                <span className="c2">git</span> init                          <span className="c1"># start tracking</span>{'\n'}
                <span className="c2">git</span> add . <span className="flag">&amp;&amp;</span> <span className="c2">git</span> commit -m <span className="c3">"first pass"</span>{'\n'}
                <span className="c2">git</span> branch feature/login <span className="flag">&amp;&amp;</span> <span className="c2">git</span> checkout feature/login{'\n'}
                <span className="c2">git</span> push -u origin feature/login   <span className="c1"># hand it to GitHub</span>
              </pre>
            </div>

            {/* Quick Share Buttons */}
            <div className="handbook-share-bar">
              <span className="share-label"><FaShareAlt size={12} /> Share this guide:</span>
              <button className="share-btn twitter" onClick={handleShareTwitter} title="Share on Twitter/X">
                <FaTwitter size={14} /> <span>Twitter / X</span>
              </button>
              <button className="share-btn linkedin" onClick={handleShareLinkedIn} title="Share on LinkedIn">
                <FaLinkedin size={14} /> <span>LinkedIn</span>
              </button>
              <button className="share-btn copy" onClick={handleCopyPageUrl} title="Copy link to clipboard">
                {copiedShare ? <FaCheck size={14} /> : <FaCopy size={14} />}
                <span>{copiedShare ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </header>

          <div className="handbook-content-container">

            {/* CH 1 */}
            <section className="chapter" id="ch1" style={{ '--accent': '#f0502f' }}>
              <div className="chapter-head">
                <div className="chapter-num">01</div>
                <div className="chapter-title">
                  <span className="kicker">Foundations</span>
                  <h2>Why Version Control Exists</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>
                  Before Git, developers "versioned" projects by renaming folders — <code>project</code>, <code>project_final</code>, <code>project_final_v2</code>. It worked until two people touched the same file, or someone needed to know <em>why</em> a line changed six months ago. A <strong>Version Control System (VCS)</strong> solves this by recording every change to a project over time, so you can inspect, compare, or restore any version on demand without duplicating folders.
                </p>
                <div className="grid2">
                  <div className="concept-card">
                    <span className="term">Git</span>
                    <p>A free, open-source, <strong>distributed</strong> version control system created by Linus Torvalds in 2005. It runs entirely on your machine — no server required to commit, branch, or view history.</p>
                  </div>
                  <div className="concept-card">
                    <span className="term">GitHub</span>
                    <p>A cloud platform (owned by Microsoft) that hosts Git repositories online, adding collaboration tools on top: pull requests, issues, code review, and — critical for DevOps — automated pipelines via GitHub Actions.</p>
                  </div>
                </div>
                <div className="callout tip">
                  <span className="tag"><FaLightbulb size={11} /> Distributed</span>
                  <p>"Distributed" is the key word: every collaborator has a <strong>full copy</strong> of the project history on their own machine, not just the latest snapshot. You can commit, branch, and browse history completely offline — you only need the network to synchronize with others.</p>
                </div>
              </div>
            </section>

            {/* CH 2 */}
            <section className="chapter" id="ch2" style={{ '--accent': '#f0502f' }}>
              <div className="chapter-head">
                <div className="chapter-num">02</div>
                <div className="chapter-title">
                  <span className="kicker">Foundations</span>
                  <h2>Core Git Vocabulary</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>Eight words carry almost the entire mental model of Git. Learn these and every command below will make structural sense.</p>
                <div className="grid3">
                  <div className="concept-card"><span className="term">Repository</span><p>A folder Git is watching. Contains your files plus a hidden <code>.git/</code> directory holding the full history.</p></div>
                  <div className="concept-card"><span className="term">Clone</span><p>Downloading a copy of a remote repository — files, branches, and full history — onto your machine.</p></div>
                  <div className="concept-card"><span className="term">Stage</span><p>Marking specific changes as "ready" for the next commit, without committing everything at once.</p></div>
                  <div className="concept-card"><span className="term">Commit</span><p>A permanent, named snapshot of staged changes, saved to your local project history.</p></div>
                  <div className="concept-card"><span className="term">Branch</span><p>An independent line of development, so you can build a feature without touching the stable codebase.</p></div>
                  <div className="concept-card"><span className="term">Merge</span><p>Combining the changes from one branch into another.</p></div>
                  <div className="concept-card"><span className="term">Pull</span><p>Downloading commits from a remote repository and merging them into your current branch.</p></div>
                  <div className="concept-card"><span className="term">Push</span><p>Uploading your local commits to a remote repository so others can see them.</p></div>
                </div>
              </div>
            </section>

            {/* CH 3 */}
            <section className="chapter" id="ch3" style={{ '--accent': '#f0502f' }}>
              <div className="chapter-head">
                <div className="chapter-num">03</div>
                <div className="chapter-title">
                  <span className="kicker">Foundations</span>
                  <h2>The Four Zones of a Repository</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>Every change you make travels through the same four zones, in the same order. Understanding this pipeline removes 80% of Git confusion.</p>

                <div className="flow">
                  <div className="zone">
                    <div className="icon" style={{ background: '#6b7280' }}>1</div>
                    <h4>Working Directory</h4>
                    <p>Where you actually edit files.</p>
                    <span className="arrow">→</span>
                  </div>
                  <div className="zone">
                    <div className="icon" style={{ background: '#c98a12' }}>2</div>
                    <h4>Staging Area</h4>
                    <p>A holding zone for the exact changes you want in the next commit.</p>
                    <span className="cmdtag">git add</span>
                    <span className="arrow">→</span>
                  </div>
                  <div className="zone">
                    <div className="icon" style={{ background: '#22863a' }}>3</div>
                    <h4>Local Repository</h4>
                    <p>Your permanent, private history — the <code>.git/</code> folder.</p>
                    <span className="cmdtag">git commit</span>
                    <span className="arrow">→</span>
                  </div>
                  <div className="zone">
                    <div className="icon" style={{ background: '#1f6feb' }}>4</div>
                    <h4>Remote Repository</h4>
                    <p>The shared copy on GitHub, visible to your whole team.</p>
                    <span className="cmdtag">git push</span>
                  </div>
                </div>

                <span className="code-label">The full pipeline, as commands</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># 1 → 2 : working directory to staging area</span>{'\n'}
                      <span className="cmd">git add</span> .{'\n\n'}
                      <span className="cmt"># 2 → 3 : staging area to local repository</span>{'\n'}
                      <span className="cmd">git commit</span> -m <span className="str">"your message here"</span>{'\n\n'}
                      <span className="cmt"># 3 → 4 : local repository to remote (needs internet)</span>{'\n'}
                      <span className="cmd">git push</span>
                    </>
                  }
                  rawText={`# 1 → 2 : working directory to staging area\ngit add .\n\n# 2 → 3 : staging area to local repository\ngit commit -m "your message here"\n\n# 3 → 4 : local repository to remote (needs internet)\ngit push`}
                />
                
                <div className="callout tip">
                  <span className="tag"><FaLightbulb size={11} /> Why stage at all?</span>
                  <p>The staging area lets you build a commit deliberately — say, include only the two files relevant to a bug fix, even if five files are dirty in your working directory. It's a rehearsal space before history is written.</p>
                </div>
              </div>
            </section>

            {/* CH 4 */}
            <section className="chapter" id="ch4" style={{ '--accent': '#1f6feb' }}>
              <div className="chapter-head">
                <div className="chapter-num">04</div>
                <div className="chapter-title">
                  <span className="kicker">Getting Started</span>
                  <h2>Install &amp; First-Time Setup</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>Every fresh machine needs three things before your first commit: Git itself, and your identity attached to every commit you make.</p>
                
                <span className="code-label">Verify installation &amp; set your identity</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># confirm Git is installed</span>{'\n'}
                      <span className="cmd">git</span> --version{'\n\n'}
                      <span className="cmt"># attach your name and email to every future commit</span>{'\n'}
                      <span className="cmd">git config</span> --global user.name  <span className="str">"Your Name"</span>{'\n'}
                      <span className="cmd">git config</span> --global user.email <span className="str">"you@example.com"</span>
                    </>
                  }
                  rawText={`git --version\ngit config --global user.name "Your Name"\ngit config --global user.email "you@example.com"`}
                />

                <div className="callout tip">
                  <span className="tag"><FaLightbulb size={11} /> Global vs local</span>
                  <p><code>--global</code> applies to every repository on your machine. Drop the flag inside a specific project to override it with a work-only or client-only identity.</p>
                </div>
              </div>
            </section>

            {/* CH 5 */}
            <section className="chapter" id="ch5" style={{ '--accent': '#1f6feb' }}>
              <div className="chapter-head">
                <div className="chapter-num">05</div>
                <div className="chapter-title">
                  <span className="kicker">Getting Started</span>
                  <h2>Starting a Project: <code>init</code> vs <code>clone</code></h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>You'll begin a repository one of two ways, depending on whether the project already exists somewhere.</p>
                <div className="grid2">
                  <div className="card">
                    <h3>Brand-new project → <code>git init</code></h3>
                    <p style={{ fontSize: '14px' }}>Creates a hidden <code>.git/</code> folder in your current directory and starts tracking it from scratch.</p>
                    <CodeSnippet 
                      code={
                        <>
                          <span className="cmd">mkdir</span> my-project{'\n'}
                          <span className="cmd">cd</span> my-project{'\n'}
                          <span className="cmd">git init</span>
                        </>
                      }
                      rawText={`mkdir my-project\ncd my-project\ngit init`}
                    />
                  </div>
                  <div className="card">
                    <h3>Existing project → <code>git clone</code></h3>
                    <p style={{ fontSize: '14px' }}>Downloads a full copy of a repository — files, branches, and history — from GitHub to your machine.</p>
                    <CodeSnippet 
                      code={
                        <>
                          <span className="cmd">git clone</span> https://github.com/user/project.git{'\n'}
                          <span className="cmd">cd</span> project
                        </>
                      }
                      rawText={`git clone https://github.com/user/project.git\ncd project`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* CH 6 */}
            <section className="chapter" id="ch6" style={{ '--accent': '#1f6feb' }}>
              <div className="chapter-head">
                <div className="chapter-num">06</div>
                <div className="chapter-title">
                  <span className="kicker">Getting Started</span>
                  <h2>The Daily Loop: status, add, commit, diff</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>This is the cycle you'll repeat dozens of times a day. <code>git status</code> is your compass — run it constantly.</p>
                
                <span className="code-label">Check what changed</span>
                <CodeSnippet code={<span className="cmd">git status</span>} rawText={`git status`} />
                
                <div className="table-responsive">
                  <table className="ref">
                    <thead>
                      <tr><th>Status message</th><th>What it means</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Untracked files</td><td>New files Git has never seen — not yet staged.</td></tr>
                      <tr><td>Changes not staged for commit</td><td>Tracked files you edited after the last <code>git add</code>.</td></tr>
                      <tr><td>Changes to be committed</td><td>Staged and ready — running <code>git commit</code> will save exactly these.</td></tr>
                    </tbody>
                  </table>
                </div>

                <span className="code-label">Stage, inspect, and commit</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># stage everything in the current directory</span>{'\n'}
                      <span className="cmd">git add</span> .{'\n\n'}
                      <span className="cmt"># stage absolutely everything, from repo root</span>{'\n'}
                      <span className="cmd">git add</span> -A{'\n\n'}
                      <span className="cmt"># see the exact line-by-line difference before committing</span>{'\n'}
                      <span className="cmd">git diff</span>{'\n\n'}
                      <span className="cmt"># commit staged changes with a message</span>{'\n'}
                      <span className="cmd">git commit</span> -m <span className="str">"fix: correct null check on login form"</span>{'\n\n'}
                      <span className="cmt"># stage + commit tracked files in one step</span>{'\n'}
                      <span className="cmd">git commit</span> -a -m <span className="str">"message"</span>{'\n\n'}
                      <span className="cmt"># view project history</span>{'\n'}
                      <span className="cmd">git log</span>
                    </>
                  }
                  rawText={`git add .\ngit add -A\ngit diff\ngit commit -m "fix: correct null check on login form"\ngit commit -a -m "message"\ngit log`}
                />

                <div className="callout warn">
                  <span className="tag"><FaExclamationTriangle size={11} /> Note</span>
                  <p><code>git commit -a</code> only picks up changes to files Git <em>already tracks</em>. Brand-new files still need an explicit <code>git add</code> first.</p>
                </div>
              </div>
            </section>

            {/* CH 7 */}
            <section className="chapter" id="ch7" style={{ '--accent': '#22863a' }}>
              <div className="chapter-head">
                <div className="chapter-num">07</div>
                <div className="chapter-title">
                  <span className="kicker">Collaboration</span>
                  <h2>Branching</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>A branch is a movable pointer to a commit — creating one is instant and cheap. Branches let you build a feature, fix a bug, or experiment freely without ever touching the stable <code>main</code> line until you're ready to merge.</p>

                <div className="svg-wrap">
                  <svg viewBox="0 0 760 190" width="100%" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of a main branch with a feature branch merging back in">
                    <line x1="40" y1="40" x2="720" y2="40" stroke="#1f6feb" strokeWidth="3"/>
                    <text x="40" y="24" fontFamily="JetBrains Mono" fontSize="12" fill="#1f6feb" fontWeight="600">main</text>
                    <circle cx="90" cy="40" r="7" fill="#1f6feb"/>
                    <circle cx="230" cy="40" r="7" fill="#1f6feb"/>
                    <circle cx="560" cy="40" r="7" fill="#1f6feb"/>
                    <circle cx="680" cy="40" r="7" fill="#1f6feb"/>
                    <path d="M230,40 C300,40 300,120 370,120" fill="none" stroke="#22863a" strokeWidth="3"/>
                    <line x1="370" y1="120" x2="500" y2="120" stroke="#22863a" strokeWidth="3"/>
                    <path d="M500,120 C560,120 560,40 560,40" fill="none" stroke="#22863a" strokeWidth="3"/>
                    <text x="370" y="145" fontFamily="JetBrains Mono" fontSize="12" fill="#22863a" fontWeight="600">feature/login</text>
                    <circle cx="370" cy="120" r="7" fill="#22863a"/>
                    <circle cx="440" cy="120" r="7" fill="#22863a"/>
                    <circle cx="500" cy="120" r="7" fill="#22863a"/>
                    <text x="60" y="70" fontFamily="Inter" fontSize="11" fill="#8b949e">branch created</text>
                    <text x="545" y="70" fontFamily="Inter" fontSize="11" fill="#8b949e">merged back</text>
                  </svg>
                </div>

                <span className="code-label">Create, switch, list, and delete branches</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># create a branch without switching to it</span>{'\n'}
                      <span className="cmd">git branch</span> feature/login{'\n\n'}
                      <span className="cmt"># create AND switch in one step (most common)</span>{'\n'}
                      <span className="cmd">git checkout</span> -b feature/login{'\n'}
                      <span className="cmt"># modern equivalent:</span>{'\n'}
                      <span className="cmd">git switch</span> -c feature/login{'\n\n'}
                      <span className="cmt"># list all local branches</span>{'\n'}
                      <span className="cmd">git branch</span>{'\n\n'}
                      <span className="cmt"># delete a branch that has already been merged</span>{'\n'}
                      <span className="cmd">git branch</span> -d feature/login{'\n\n'}
                      <span className="cmt"># force-delete a branch, merged or not</span>{'\n'}
                      <span className="cmd">git branch</span> -D feature/login{'\n\n'}
                      <span className="cmt"># delete a branch on the remote (GitHub)</span>{'\n'}
                      <span className="cmd">git push</span> origin --delete feature/login
                    </>
                  }
                  rawText={`git branch feature/login\ngit checkout -b feature/login\ngit switch -c feature/login\ngit branch\ngit branch -d feature/login\ngit branch -D feature/login\ngit push origin --delete feature/login`}
                />
              </div>
            </section>

            {/* CH 8 */}
            <section className="chapter" id="ch8" style={{ '--accent': '#22863a' }}>
              <div className="chapter-head">
                <div className="chapter-num">08</div>
                <div className="chapter-title">
                  <span className="kicker">Collaboration</span>
                  <h2>Merging &amp; Rebasing</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p><strong>Merging</strong> combines two branches' histories with a dedicated merge commit — nothing is rewritten, so it's the safer default for shared branches. <strong>Rebasing</strong> replays your commits on top of another branch, producing a straight, linear history — useful for cleaning up a feature branch before it's shared.</p>
                <div className="grid2">
                  <div className="card">
                    <h3 style={{ color: 'var(--gh-green, #22863a)' }}>Merge workflow</h3>
                    <CodeSnippet 
                      code={
                        <>
                          <span className="cmt"># 1. switch to the branch receiving changes</span>{'\n'}
                          <span className="cmd">git checkout</span> main{'\n\n'}
                          <span className="cmt"># 2. merge the other branch in</span>{'\n'}
                          <span className="cmd">git merge</span> feature-branch{'\n\n'}
                          <span className="cmt"># 3. if conflicts appear, resolve them, then:</span>{'\n'}
                          <span className="cmd">git add</span> .{'\n'}
                          <span className="cmd">git commit</span>
                        </>
                      }
                      rawText={`git checkout main\ngit merge feature-branch\n# after resolving conflicts:\ngit add .\ngit commit`}
                    />
                  </div>
                  <div className="card">
                    <h3 style={{ color: 'var(--violet, #8957e5)' }}>Rebase workflow</h3>
                    <CodeSnippet 
                      code={
                        <>
                          <span className="cmt"># on your feature branch:</span>{'\n'}
                          <span className="cmd">git rebase</span> main{'\n\n'}
                          <span className="cmt"># after resolving any conflicts:</span>{'\n'}
                          <span className="cmd">git rebase</span> --continue{'\n\n'}
                          <span className="cmt"># then push (main is unaffected)</span>{'\n'}
                          <span className="cmd">git push</span> origin main
                        </>
                      }
                      rawText={`git rebase main\ngit rebase --continue\ngit push origin main`}
                    />
                  </div>
                </div>
                <div className="callout warn">
                  <span className="tag"><FaExclamationTriangle size={11} /> Golden rule</span>
                  <p>Never rebase a branch that other people already have checked out or based work on — it rewrites commit history and will break everyone else's copy of that branch.</p>
                </div>
              </div>
            </section>

            {/* CH 9 */}
            <section className="chapter" id="ch9" style={{ '--accent': '#c98a12' }}>
              <div className="chapter-head">
                <div className="chapter-num">09</div>
                <div className="chapter-title">
                  <span className="kicker">Everyday Tools</span>
                  <h2>Stashing Work</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p><code>git stash</code> is a shelf for uncommitted work. Use it when you need to switch branches urgently but aren't ready to commit what you have.</p>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># shelve current changes (staged + unstaged), reset working dir to clean</span>{'\n'}
                      <span className="cmd">git stash</span>{'\n\n'}
                      <span className="cmt"># shelve with a label so you remember what it was</span>{'\n'}
                      <span className="cmd">git stash</span> save <span className="str">"WIP: login form validation"</span>{'\n\n'}
                      <span className="cmt"># see everything on the shelf</span>{'\n'}
                      <span className="cmd">git stash</span> list{'\n\n'}
                      <span className="cmt"># re-apply the most recent stash, keep it on the shelf too</span>{'\n'}
                      <span className="cmd">git stash</span> apply{'\n\n'}
                      <span className="cmt"># re-apply a specific stash</span>{'\n'}
                      <span className="cmd">git stash</span> apply stash@&#123;1&#125;{'\n\n'}
                      <span className="cmt"># re-apply the latest stash AND remove it from the shelf</span>{'\n'}
                      <span className="cmd">git stash</span> pop{'\n\n'}
                      <span className="cmt"># wipe every stash</span>{'\n'}
                      <span className="cmd">git stash</span> clear
                    </>
                  }
                  rawText={`git stash\ngit stash save "WIP: login form validation"\ngit stash list\ngit stash apply\ngit stash apply stash@{1}\ngit stash pop\ngit stash clear`}
                />
              </div>
            </section>

            {/* CH 10 */}
            <section className="chapter" id="ch10" style={{ '--accent': '#c98a12' }}>
              <div className="chapter-head">
                <div className="chapter-num">10</div>
                <div className="chapter-title">
                  <span className="kicker">Everyday Tools</span>
                  <h2>Fetch, Pull &amp; Push</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>These three commands are how your local repository stays in sync with the remote on GitHub. The distinction between <code>fetch</code> and <code>pull</code> trips up almost everyone once — and only once.</p>
                
                <div className="table-responsive">
                  <table className="ref">
                    <thead>
                      <tr><th>Command</th><th>What it does</th><th>Touches your working files?</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><code>git fetch</code></td><td>Downloads new commits from the remote, but does <strong>not</strong> merge them into your branch.</td><td>No — safe to run anytime</td></tr>
                      <tr><td><code>git pull</code></td><td>Runs <code>fetch</code>, then immediately merges the remote branch into your current branch.</td><td>Yes — may create merge commits or conflicts</td></tr>
                      <tr><td><code>git push</code></td><td>Uploads your local commits to the remote so others can see them.</td><td>Affects the remote, not your local files</td></tr>
                    </tbody>
                  </table>
                </div>

                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># download changes from the default remote (origin) without merging</span>{'\n'}
                      <span className="cmd">git fetch</span>{'\n\n'}
                      <span className="cmt"># fetch a specific branch only</span>{'\n'}
                      <span className="cmd">git fetch</span> origin feature-branch{'\n\n'}
                      <span className="cmt"># see what's new before merging it in yourself</span>{'\n'}
                      <span className="cmd">git log</span> HEAD..origin/main{'\n\n'}
                      <span className="cmt"># pull = fetch + merge, always do this before you start working</span>{'\n'}
                      <span className="cmd">git pull</span> origin main{'\n\n'}
                      <span className="cmt"># push your branch and set it to track the remote one</span>{'\n'}
                      <span className="cmd">git push</span> -u origin feature-branch
                    </>
                  }
                  rawText={`git fetch\ngit fetch origin feature-branch\ngit log HEAD..origin/main\ngit pull origin main\ngit push -u origin feature-branch`}
                />

                <div className="callout tip">
                  <span className="tag"><FaLightbulb size={11} /> Habit</span>
                  <p>Pull before you push. Syncing with your team's latest work first is the single easiest way to avoid painful merge conflicts.</p>
                </div>
              </div>
            </section>

            {/* CH 11 */}
            <section className="chapter" id="ch11" style={{ '--accent': '#8957e5' }}>
              <div className="chapter-head">
                <div className="chapter-num">11</div>
                <div className="chapter-title">
                  <span className="kicker">Connecting to GitHub</span>
                  <h2>Remotes: HTTPS vs SSH</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>To push or pull, Git needs to know where the remote repository lives and how to authenticate with it. There are two connection methods.</p>
                <div className="grid2">
                  <div className="concept-card" style={{ '--accent': '#8957e5' }}>
                    <span className="term">HTTPS</span>
                    <p>The default, simplest option. Uses a URL like <code>https://github.com/user/repo.git</code> and authenticates with a username and a personal access token.</p>
                  </div>
                  <div className="concept-card" style={{ '--accent': '#8957e5' }}>
                    <span className="term">SSH</span>
                    <p>Authenticates with a cryptographic key pair instead of a password every time — the standard for frequent pushers and automated (DevOps) systems.</p>
                  </div>
                </div>

                <span className="code-label">Set up SSH access to GitHub</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># 1. generate a new SSH key pair</span>{'\n'}
                      <span className="cmd">ssh-keygen</span> -t rsa -b 4096 -C <span className="str">"your_email@example.com"</span>{'\n\n'}
                      <span className="cmt"># 2. start the ssh-agent in the background</span>{'\n'}
                      <span className="cmd">eval</span> <span className="str">"$(ssh-agent -s)"</span>{'\n\n'}
                      <span className="cmt"># 3. add your new key to the agent</span>{'\n'}
                      <span className="cmd">ssh-add</span> ~/.ssh/id_rsa{'\n\n'}
                      <span className="cmt"># 4. copy the PUBLIC key</span>{'\n'}
                      <span className="cmd">cat</span> ~/.ssh/id_rsa.pub{'\n\n'}
                      <span className="cmt"># 5. paste it into GitHub → Settings → SSH and GPG keys → New SSH key</span>{'\n\n'}
                      <span className="cmt"># 6. test the connection</span>{'\n'}
                      <span className="cmd">ssh</span> -T git@github.com
                    </>
                  }
                  rawText={`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"\neval "$(ssh-agent -s)"\nssh-add ~/.ssh/id_rsa\ncat ~/.ssh/id_rsa.pub\nssh -T git@github.com`}
                />

                <span className="code-label">Point a repository at its remote</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># link a local repo to a GitHub remote named "origin"</span>{'\n'}
                      <span className="cmd">git remote add</span> origin git@github.com:user/repo.git{'\n\n'}
                      <span className="cmt"># confirm it worked</span>{'\n'}
                      <span className="cmd">git remote</span> -v
                    </>
                  }
                  rawText={`git remote add origin git@github.com:user/repo.git\ngit remote -v`}
                />
              </div>
            </section>

            {/* CH 12 */}
            <section className="chapter" id="ch12" style={{ '--accent': '#cf3d6e' }}>
              <div className="chapter-head">
                <div className="chapter-num">12</div>
                <div className="chapter-title">
                  <span className="kicker">Recovery</span>
                  <h2>Undoing Things Safely</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>Everyone breaks something eventually. Git almost never truly deletes work — pick the right undo for how far the mistake has traveled.</p>
                
                <div className="table-responsive">
                  <table className="ref">
                    <thead>
                      <tr><th>Situation</th><th>Command</th><th>Effect</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Discard uncommitted edits to one file</td><td><code>git checkout -- file.txt</code></td><td>Reverts the file to its last committed state</td></tr>
                      <tr><td>Discard <em>all</em> uncommitted edits</td><td><code>git checkout -f</code></td><td>Resets every tracked file to the last commit</td></tr>
                      <tr><td>Unstage a file (keep the edits)</td><td><code>git restore --staged file.txt</code></td><td>Moves the file back to "changes not staged"</td></tr>
                      <tr><td>Change the last commit message</td><td><code>git commit --amend</code></td><td>Rewrites the most recent commit</td></tr>
                      <tr><td>Undo a commit, keep the changes</td><td><code>git reset --soft HEAD~1</code></td><td>Removes the commit, re-stages its changes</td></tr>
                      <tr><td>Undo a commit completely</td><td><code>git reset --hard HEAD~1</code></td><td>Removes the commit and its changes — destructive</td></tr>
                      <tr><td>Undo a <em>pushed</em> commit safely</td><td><code>git revert &lt;hash&gt;</code></td><td>Creates a new commit that reverses the old one</td></tr>
                      <tr><td>Restore an old version of one file</td><td><code>git checkout &lt;commit&gt; -- file.txt</code></td><td>Brings back that file from a past commit</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="callout warn">
                  <span className="tag"><FaExclamationTriangle size={11} /> Danger zone</span>
                  <p><code>--hard</code> resets and force-pushes permanently discard work with no confirmation. On any branch other people share, use <code>git revert</code> instead of rewriting history.</p>
                </div>
              </div>
            </section>

            {/* CH 13 */}
            <section className="chapter" id="ch13" style={{ '--accent': '#cf3d6e' }}>
              <div className="chapter-head">
                <div className="chapter-num">13</div>
                <div className="chapter-title">
                  <span className="kicker">Recovery</span>
                  <h2>.gitignore &amp; Repository Hygiene</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>Not everything belongs in version control — build artifacts, dependency folders, logs, and secrets should never be committed. A <code>.gitignore</code> file tells Git which paths to skip entirely.</p>
                
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># create the file</span>{'\n'}
                      <span className="cmd">touch</span> .gitignore{'\n\n'}
                      <span className="cmt"># ignore one specific file</span>{'\n'}
                      <span className="cmd">echo</span> <span className="str">"config/secrets.env"</span> &gt;&gt; .gitignore{'\n\n'}
                      <span className="cmt"># ignore every file with a .log extension</span>{'\n'}
                      <span className="cmd">echo</span> <span className="str">"*.log"</span> &gt;&gt; .gitignore{'\n\n'}
                      <span className="cmt"># common DevOps-relevant entries</span>{'\n'}
                      node_modules/{'\n'}
                      dist/{'\n'}
                      .env{'\n'}
                      *.pem{'\n'}
                      __pycache__/
                    </>
                  }
                  rawText={`touch .gitignore\necho "config/secrets.env" >> .gitignore\necho "*.log" >> .gitignore\n\nnode_modules/\ndist/\n.env\n*.pem\n__pycache__/`}
                />

                <span className="code-label">Remove a file from tracking (e.g. added by mistake)</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># delete from disk AND from Git</span>{'\n'}
                      <span className="cmd">git rm</span> <span className="str">"secrets.env"</span>{'\n\n'}
                      <span className="cmt"># keep the file locally, only stop tracking it</span>{'\n'}
                      <span className="cmd">git rm</span> --cached <span className="str">"secrets.env"</span>
                    </>
                  }
                  rawText={`git rm "secrets.env"\ngit rm --cached "secrets.env"`}
                />
              </div>
            </section>

            {/* CH 14 */}
            <section className="chapter" id="ch14" style={{ '--accent': '#1f6feb' }}>
              <div className="chapter-head">
                <div className="chapter-num">14</div>
                <div className="chapter-title">
                  <span className="kicker">The Bigger Picture</span>
                  <h2>Git vs GitHub</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>They're often said in the same breath, but they solve different problems — one is the engine, the other is the platform built around it.</p>
                
                <div className="table-responsive">
                  <table className="ref">
                    <thead>
                      <tr><th>Aspect</th><th>Git</th><th>GitHub</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>What it is</td><td>A version control system (software)</td><td>A web-based hosting service (product)</td></tr>
                      <tr><td>Runs</td><td>Locally, on your machine</td><td>In the cloud, accessed via browser or CLI</td></tr>
                      <tr><td>Core job</td><td>Tracks and manages code history</td><td>Hosts repositories and enables team collaboration</td></tr>
                      <tr><td>Installation</td><td>Must be installed on your computer</td><td>No installation — accessible through a browser</td></tr>
                      <tr><td>Collaboration</td><td>Manual — patches, shared drives, emailed diffs</td><td>Built-in — pull requests, reviews, comments, issues</td></tr>
                      <tr><td>Offline use</td><td>Fully functional offline</td><td>Needs internet for remote features</td></tr>
                      <tr><td>Automation</td><td>Hooks (local scripts)</td><td>GitHub Actions (cloud CI/CD pipelines)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* CH 15 */}
            <section className="chapter" id="ch15" style={{ '--accent': '#22863a' }}>
              <div className="chapter-head">
                <div className="chapter-num">15</div>
                <div className="chapter-title">
                  <span className="kicker">The Bigger Picture</span>
                  <h2>GitHub Essentials: PRs, Issues &amp; Forks</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>GitHub's collaboration layer is what turns a personal Git habit into team and open-source workflow.</p>
                <div className="grid3">
                  <div className="concept-card" style={{ '--accent': '#22863a' }}><span className="term">Issue</span><p>A tracked unit of work — a bug report, feature request, or task, discussed in one thread.</p></div>
                  <div className="concept-card" style={{ '--accent': '#22863a' }}><span className="term">Pull Request (PR)</span><p>A proposal to merge one branch into another, with a diff, discussion, and review before it's accepted.</p></div>
                  <div className="concept-card" style={{ '--accent': '#22863a' }}><span className="term">Fork</span><p>Your own copy of someone else's repository, letting you make changes without needing write access to the original.</p></div>
                </div>

                <span className="code-label">Typical open-source contribution flow</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># 1. fork the repo on GitHub (via the web UI), then:</span>{'\n'}
                      <span className="cmd">git clone</span> https://github.com/your-username/project.git{'\n'}
                      <span className="cmd">cd</span> project{'\n\n'}
                      <span className="cmt"># 2. create a branch for your change</span>{'\n'}
                      <span className="cmd">git checkout</span> -b fix/typo-in-readme{'\n\n'}
                      <span className="cmt"># 3. commit and push to YOUR fork</span>{'\n'}
                      <span className="cmd">git add</span> .{'\n'}
                      <span className="cmd">git commit</span> -m <span className="str">"docs: fix typo in README"</span>{'\n'}
                      <span className="cmd">git push</span> origin fix/typo-in-readme{'\n\n'}
                      <span className="cmt"># 4. open a Pull Request from your fork into the original repo</span>
                    </>
                  }
                  rawText={`git clone https://github.com/your-username/project.git\ncd project\ngit checkout -b fix/typo-in-readme\ngit add .\ngit commit -m "docs: fix typo in README"\ngit push origin fix/typo-in-readme`}
                />
              </div>
            </section>

            {/* CH 16 */}
            <section className="chapter" id="ch16" style={{ '--accent': '#8957e5' }}>
              <div className="chapter-head">
                <div className="chapter-num">16</div>
                <div className="chapter-title">
                  <span className="kicker">For DevOps</span>
                  <h2>Git for DevOps &amp; CI/CD</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>For a DevOps engineer, Git isn't just a personal history tool — it's the trigger mechanism for automated pipelines. Every push or merged PR can kick off a build, a test suite, or a deployment.</p>

                <div className="callout devops">
                  <span className="tag"><FaCogs size={11} /> Core idea</span>
                  <p>GitHub Actions listens for repository events (a push, a PR, a tag) and runs a defined workflow in response — this is how "commit to deploy" pipelines are built.</p>
                </div>

                <span className="code-label">A minimal GitHub Actions workflow</span>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># .github/workflows/ci.yml</span>{'\n'}
                      name: CI{'\n\n'}
                      <span className="flag">on</span>:{'\n'}
                      {'  '}push:{'\n'}
                      {'    '}branches: [ main ]{'\n'}
                      {'  '}pull_request:{'\n'}
                      {'    '}branches: [ main ]{'\n\n'}
                      jobs:{'\n'}
                      {'  '}build:{'\n'}
                      {'    '}runs-on: ubuntu-latest{'\n'}
                      {'    '}steps:{'\n'}
                      {'      '}- uses: actions/checkout@v4{'\n'}
                      {'      '}- name: Install dependencies{'\n'}
                      {'        '}run: npm install{'\n'}
                      {'      '}- name: Run tests{'\n'}
                      {'        '}run: npm test
                    </>
                  }
                  rawText={`name: CI\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Install dependencies\n        run: npm install\n      - name: Run tests\n        run: npm test`}
                />

                <h3 style={{ marginTop: '26px' }}>Branching strategies teams automate around</h3>
                <div className="grid2">
                  <div className="card">
                    <h3 style={{ fontSize: '15px' }}>Git Flow</h3>
                    <p style={{ fontSize: '14px' }}>Long-lived <code>main</code> and <code>develop</code> branches, with <code>feature/</code>, <code>release/</code>, and <code>hotfix/</code> branches merging in through defined stages. Favors structure over speed — good for scheduled releases.</p>
                  </div>
                  <div className="card">
                    <h3 style={{ fontSize: '15px' }}>Trunk-Based Development</h3>
                    <p style={{ fontSize: '14px' }}>Everyone commits small, frequent changes directly to (or via short-lived branches into) <code>main</code>, protected by CI. Favors speed and continuous deployment.</p>
                  </div>
                </div>

                <h3 style={{ marginTop: '22px' }}>Tags &amp; releases</h3>
                <CodeSnippet 
                  code={
                    <>
                      <span className="cmt"># tag a specific commit as a release point</span>{'\n'}
                      <span className="cmd">git tag</span> -a v1.2.0 -m <span className="str">"Release 1.2.0"</span>{'\n\n'}
                      <span className="cmt"># push the tag to trigger a release pipeline</span>{'\n'}
                      <span className="cmd">git push</span> origin v1.2.0
                    </>
                  }
                  rawText={`git tag -a v1.2.0 -m "Release 1.2.0"\ngit push origin v1.2.0`}
                />

                <div className="callout tip">
                  <span className="tag"><FaLightbulb size={11} /> Pipeline habit</span>
                  <p>Protect <code>main</code> with branch protection rules — require passing CI checks and at least one review before a PR can merge. This is what turns Git history into a reliable deployment record.</p>
                </div>
              </div>
            </section>

            {/* CH 17 */}
            <section className="chapter" id="ch17" style={{ '--accent': '#c98a12' }}>
              <div className="chapter-head">
                <div className="chapter-num">17</div>
                <div className="chapter-title">
                  <span className="kicker">Working Well</span>
                  <h2>Best Practices</h2>
                </div>
              </div>
              <div className="chapter-body">
                <div className="grid2">
                  <div className="card">
                    <h3>Commit messages</h3>
                    <p style={{ fontSize: '14px' }}>Write in the imperative ("Add," not "Added"). Keep the summary line under ~50 characters. Consider Conventional Commits: <code>feat:</code>, <code>fix:</code>, <code>docs:</code>, <code>chore:</code>.</p>
                  </div>
                  <div className="card">
                    <h3>Commit size</h3>
                    <p style={{ fontSize: '14px' }}>One logical change per commit. Small, focused commits are easy to review, revert, and bisect when hunting a bug.</p>
                  </div>
                  <div className="card">
                    <h3>Branch naming</h3>
                    <p style={{ fontSize: '14px' }}>Use a consistent prefix: <code>feature/</code>, <code>fix/</code>, <code>hotfix/</code>, <code>chore/</code> — followed by a short, kebab-case description.</p>
                  </div>
                  <div className="card">
                    <h3>Never commit secrets</h3>
                    <p style={{ fontSize: '14px' }}>Keys and credentials belong in environment variables or a secrets manager, never in the repo — even a deleted commit still lives in history.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CH 18 : CHEAT SHEET */}
            <section className="chapter" id="ch18" style={{ '--accent': '#f0502f' }}>
              <div className="chapter-head">
                <div className="chapter-num">18</div>
                <div className="chapter-title">
                  <span className="kicker">Quick Reference</span>
                  <h2>Command Cheat Sheet</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>Every command from this handbook, grouped by category, for a fast scan when you're mid-terminal.</p>
                <div className="cheat-grid">

                  <div className="cheat-cat">
                    <div className="hd" style={{ background: '#1f6feb' }}>Setup &amp; Start</div>
                    <ul>
                      <li><code>git config --global user.name</code><span className="desc">set identity</span></li>
                      <li><code>git init</code><span className="desc">new repo</span></li>
                      <li><code>git clone &lt;url&gt;</code><span className="desc">copy a repo</span></li>
                      <li><code>git remote add origin &lt;url&gt;</code><span className="desc">link remote</span></li>
                    </ul>
                  </div>

                  <div className="cheat-cat">
                    <div className="hd" style={{ background: '#6b7280' }}>Daily Loop</div>
                    <ul>
                      <li><code>git status</code><span className="desc">what changed</span></li>
                      <li><code>git add .</code><span className="desc">stage all</span></li>
                      <li><code>git diff</code><span className="desc">see edits</span></li>
                      <li><code>git commit -m "…"</code><span className="desc">save snapshot</span></li>
                      <li><code>git log</code><span className="desc">view history</span></li>
                    </ul>
                  </div>

                  <div className="cheat-cat">
                    <div className="hd" style={{ background: '#22863a' }}>Branching</div>
                    <ul>
                      <li><code>git branch</code><span className="desc">list branches</span></li>
                      <li><code>git checkout -b &lt;name&gt;</code><span className="desc">create + switch</span></li>
                      <li><code>git merge &lt;branch&gt;</code><span className="desc">combine history</span></li>
                      <li><code>git branch -d &lt;name&gt;</code><span className="desc">delete (safe)</span></li>
                    </ul>
                  </div>

                  <div className="cheat-cat">
                    <div className="hd" style={{ background: '#c98a12' }}>Sync with Remote</div>
                    <ul>
                      <li><code>git fetch</code><span className="desc">download only</span></li>
                      <li><code>git pull</code><span className="desc">fetch + merge</span></li>
                      <li><code>git push</code><span className="desc">upload commits</span></li>
                      <li><code>git push -u origin &lt;branch&gt;</code><span className="desc">push + track</span></li>
                    </ul>
                  </div>

                  <div className="cheat-cat">
                    <div className="hd" style={{ background: '#8957e5' }}>Stash</div>
                    <ul>
                      <li><code>git stash</code><span className="desc">shelve changes</span></li>
                      <li><code>git stash list</code><span className="desc">see shelf</span></li>
                      <li><code>git stash pop</code><span className="desc">restore + clear</span></li>
                      <li><code>git stash clear</code><span className="desc">empty shelf</span></li>
                    </ul>
                  </div>

                  <div className="cheat-cat">
                    <div className="hd" style={{ background: '#cf3d6e' }}>Undo</div>
                    <ul>
                      <li><code>git restore --staged &lt;f&gt;</code><span className="desc">unstage</span></li>
                      <li><code>git commit --amend</code><span className="desc">edit last commit</span></li>
                      <li><code>git reset --soft HEAD~1</code><span className="desc">undo, keep edits</span></li>
                      <li><code>git revert &lt;hash&gt;</code><span className="desc">safe public undo</span></li>
                    </ul>
                  </div>

                </div>
              </div>
            </section>

            {/* CH 19 */}
            <section className="chapter" id="ch19" style={{ '--accent': '#6b7280' }}>
              <div className="chapter-head">
                <div className="chapter-num">19</div>
                <div className="chapter-title">
                  <span className="kicker">Beyond This Page</span>
                  <h2>Further Reading</h2>
                </div>
              </div>
              <div className="chapter-body">
                <p>This handbook covers the 80% you'll use daily. For deeper dives, the official documentation is the most reliable next stop:</p>
                
                <div className="table-responsive">
                  <table className="ref">
                    <thead>
                      <tr><th>Topic</th><th>Where to go</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Full command reference</td><td>Official Git documentation (git-scm.com)</td></tr>
                      <tr><td>GitHub Actions &amp; workflows</td><td>GitHub Docs — Actions section</td></tr>
                      <tr><td>Advanced history rewriting</td><td><code>git rebase -i</code>, <code>git bisect</code>, <code>git reflog</code></td></tr>
                      <tr><td>Large-scale repo management</td><td>Git submodules, Git LFS, monorepo tooling</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </div>

          {/* Author Bio Card */}
          <div className="author-bio-card glass-card">
            <div className="author-avatar-badge">
              <span className="author-initials">MK</span>
            </div>
            <div className="author-bio-info">
              <span className="author-subtitle">Authored by</span>
              <h3 className="author-name">Mayank Kumar</h3>
              <p className="author-desc">
                Full Stack Developer &amp; MCA Candidate specializing in Java, Spring Boot, React.js, and Cloud Architectures. Creator of open-source handbooks and tools for developer productivity.
              </p>
              <div className="author-links">
                <a href="https://github.com/mayank78geu" target="_blank" rel="noopener noreferrer" className="author-link-btn">
                  <FaGithub /> GitHub
                </a>
                <a href="https://linkedin.com/in/mayank78stu" target="_blank" rel="noopener noreferrer" className="author-link-btn">
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Back to Blog Button */}
          <div className="handbook-footer-actions">
            <Link to="/blog" className="btn btn-primary">
              <FaArrowLeft /> Back to All Articles
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GitGitHubHandbook;
