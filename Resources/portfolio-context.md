# Portfolio Website — Project Context Document

> This document is the single source of truth for content, structure, and functional requirements of Mayank Kumar's personal portfolio website. It is meant to be fed directly into a vibe-coding platform (e.g. Lovable, Bolt, v0, Cursor) as project context. Design system, color palette, and visual styling are intentionally NOT included here — that is handled separately.

---

## 1. Tech Stack

- **Frontend Framework:** React.js (Vite preferred for fast setup)
- **Animation Library:** Framer Motion (for page transitions, scroll reveals, hover interactions, staggered lists)
- **Routing:** React Router (multi-page feel, even if SPA)
- **Styling:** Any utility-first CSS approach compatible with the chosen platform (design system defined separately)
- **Deployment target:** Static hosting (Vercel / Netlify friendly build)

---

## 2. Site Structure / Navigation

Persistent navbar (all pages) with links to:

1. Home
2. About
3. Academics & Skills
4. Projects
5. Work Experience
6. Contact (can be a section on Home or footer — see Section 8)

Footer (all pages) with:
- Social links: GitHub, LinkedIn, Email
- Copyright line

---

## 3. Page 1 — Home / Landing Page

**Purpose:** First impression, quick summary, clear CTA to explore more or contact.

**Content blocks:**

- **Hero Section**
  - Name: **Mayank Kumar**
  - Title/Tagline: *Full Stack Developer | MCA Candidate | AI Integration Enthusiast*
  - One-line hook: Builds scalable full-stack applications using Java, Spring Boot, React.js, and integrates AI (Google Gemini) into real-world products.
  - Location: Dehradun, India
  - CTA Buttons: "View Projects", "Download Resume", "Contact Me"
  - Social icons: GitHub (github.com/mayank78geu), LinkedIn (linkedin.com/in/mayank78stu), Email (mayank78stu@gmail.com), Phone (+91-6200482891)

- **Quick Highlights Strip** (animated counters or badges)
  - Current SGPA: 8.62/10 (MCA)
  - Regional Award Winner — AICTE IDE Bootcamp 2025
  - 3+ Full-Stack Projects Shipped
  - AWS Certified

- **Snapshot Summary** (short version of professional summary, 2-3 lines max)
  - Full Stack Developer and MCA candidate with hands-on experience in designing and developing scalable web applications using Java, Spring Boot, React.js, and RESTful APIs. Proficient in SQL/NoSQL databases, AWS Cloud, and AI/ML API integration.

- **Featured Projects Preview** (2-3 cards, links to full Projects page)
  - BestPath
  - PrepRush
  - MedNext

- **Call to Action Footer Block**
  - "Let's build something impactful together" + Contact button

---

## 4. Page 2 — About

**Purpose:** Personal narrative, who Mayank is beyond the resume bullet points.

**Content blocks:**

- **About Me Narrative** (expand naturally from summary — write in first person, conversational, 3-4 short paragraphs)
  - Journey: BCA (Arcade Business College, Patliputra University) → MCA (Graphic Era Deemed to be University, Dehradun)
  - Passion: end-to-end product building — from database architecture to REST APIs to responsive frontends
  - AI angle: interest in integrating AI/ML APIs (Google Gemini) into practical, social-impact products
  - Current role: Skill Development Team Member at Tech Business Incubator (TBI), Graphic Era University

- **Education Timeline** (visual timeline component, animated on scroll)
  - **MCA — Graphic Era Deemed to be University**, Dehradun, Uttarakhand (2025–2027)
    - Current SGPA: 8.62/10
    - Coursework: Data Structures & Algorithms, Advanced DBMS, Software Engineering, Cloud Computing, OOP, Web Technologies
  - **BCA — Arcade Business College** (Patliputra University), Patna, Bihar (2022–2025)
    - Honours: 79.75%
    - Coursework: C/C++ Programming, Desktop Application Development, RDBMS, Operating Systems, Computer Networks, Data Structures

- **Achievements & Awards** (can be cards or list)
  - **Winner — IDE Bootcamp 2025, Phase II** | AICTE, MoE & MoE's Innovation Cell (2025)
    - Regional-level winner among hundreds of teams across India for BestPath, a tech-for-social-good career guidance platform for rural students.
  - **9th Rank — Cloud Ignite '26 Quiz** | AWS Cloud Club, GEU (2026)
    - Achieved 9th rank in a competitive cloud computing quiz testing AWS fundamentals, architecture best practices, and cloud services knowledge.

- **Certifications** (badge/card grid)
  - AWS Cloud Essentials — Amazon Web Services (2025)
  - AWS Cloud Practitioner Essentials — Amazon Web Services (2025)
  - Java Programming Training — Spoken Tutorial, IIT Bombay — Score: 84% (2024)
  - C Programming Training — Spoken Tutorial, IIT Bombay — Score: 100% (2023)

- **Positions of Responsibility**
  - **Evaluation & Mentorship Team — Graph-e-thon 3.0** (2026), Tech Business Incubator, Graphic Era University
    - Part of the official Evaluation & Mentorship Team — evaluated student projects on technical depth, innovation, and feasibility; provided structured feedback to participating teams.
    - Mentored student developers on REST API design, Spring Boot architecture, and frontend-backend integration best practices.

- **Hobbies / Personal Touch** (small closing section)
  - Reading books
  - Exploring new tools to improve productivity

---

## 5. Page 3 — Academics & Skills

**Purpose:** Technical depth showcase, scannable by recruiters.

**Content blocks:**

- **Academic Snapshot** (can reuse condensed version of education from About, or link to About page for full detail)

- **Skills Section** — organized into categorized groups (use animated skill tags/pills or progress-style cards, grouped exactly as below):

  - **Programming Languages**
    - Java, Python, C, JavaScript, PHP, SQL, HTML5, CSS3

  - **Frameworks & Libraries**
    - Spring Boot, React.js, Next.js, Spring MVC, Spring Data JPA, REST API

  - **Databases**
    - MySQL, PostgreSQL, MongoDB (NoSQL), JDBC

  - **Cloud & DevOps**
    - AWS (EC2, S3, IAM), Git, GitHub, Linux (Basic)

  - **AI / API Integration**
    - Google Gemini API, RESTful API Design, JSON, Postman

  - **Developer Tools**
    - IntelliJ IDEA, VS Code, Postman, Maven

  - **Core CS Concepts**
    - Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Agile/Scrum

  - **Other**
    - Microsoft Office Suite, Project Documentation

- **Optional:** Skill proficiency indicators can be omitted or kept qualitative (avoid fabricated percentage scores not present in the resume).

---

## 6. Page 4 — Projects

**Purpose:** Core proof-of-work section. Each project as a detailed card/section with tech stack tags, description, and GitHub link placeholder.

**Content blocks (one card/section per project):**

### Project 1 — BestPath
- **Tags:** React.js, Spring Boot, REST API, Gemini API
- **Badge:** 🏆 Regional Award-Winning Project — AICTE IDE Bootcamp 2025 (Phase II Winner)
- **Year:** 2025
- **Description:**
  - A career guidance platform targeting rural students and parents with limited exposure to modern career paths; provides personalised career roadmaps, domain awareness, and interest-based suggestions.
  - Integrated Google Gemini API to generate dynamic, personalised career roadmaps based on user interests, academic background, and skill level.
  - Designed full-stack architecture covering React.js frontend, Spring Boot REST backend, and database integration — handling end-to-end user flow from onboarding to roadmap delivery.
- **Link:** GitHub (placeholder — insert actual repo URL)

### Project 2 — PrepRush (Last-Night Study Buddy)
- **Tags:** React.js, Spring Boot, MongoDB, Gemini API
- **Year:** 2025
- **Description:**
  - An AI-powered rapid revision tool — enables students to input a topic and instantly receive a structured learning roadmap tailored to their academic level via Google Gemini API.
  - Built RESTful APIs in Spring Boot to handle topic submissions, Gemini API orchestration, quiz generation, and user session data persistence in MongoDB.
  - Developed responsive React.js frontend supporting profile creation, roadmap rendering, explanation modules, and interactive quizzes for targeted last-minute exam preparation.
  - Implemented NoSQL data modeling in MongoDB for flexible storage of user profiles, study history, and AI-generated content.
- **Role:** Full Stack Developer
- **Link:** GitHub (placeholder — insert actual repo URL)

### Project 3 — MedNext (Patient-Centric Appointment Management System)
- **Tags:** React.js, Spring Boot, MySQL
- **Year:** 2024
- **Description:**
  - A full-stack healthcare platform enabling patients to book, manage, and track medical appointments online.
  - Designed and developed RESTful APIs using Spring Boot to handle CRUD operations for patient records, appointment scheduling, doctor availability, and status updates.
  - Implemented MySQL relational database schema to efficiently store and retrieve patient and appointment data with referential integrity.
  - Ensured clean API contract design enabling seamless integration with the React.js frontend through well-documented, stateless REST endpoints.
- **Role:** Team Leader & Backend Developer
- **Link:** GitHub (placeholder — insert actual repo URL)

**Layout notes:**
- Grid or alternating layout, filterable by tech tag is a nice-to-have (not mandatory).
- Each card should support hover/tap animation (Framer Motion) revealing more detail or a "View Details" expand.

---

## 7. Page 5 — Work Experience

**Purpose:** Professional/organizational experience, presented as a timeline.

**Content block:**

### Skill Development Team Member
**Tech Business Incubator (TBI), Graphic Era University** — Dehradun, Uttarakhand
**February 2026 – Present**

- Actively contribute to planning and execution of skill development initiatives including Graph-e-thon Hackathon and the Summer Internship Program, impacting 1000+ students.
- Served on the Evaluation & Mentorship Team at Graph-e-thon 3.0 — collaborated with industry experts and mentors in evaluating student projects, providing structured technical feedback, and mentoring participants on software development best practices.
- Collaborated cross-functionally with faculty, industry mentors, and student teams to deliver high-quality technical and non-technical programs aligned with industry skill requirements.
- Supported curriculum design, outreach emails, documentation, evaluation, and intern onboarding for the Summer Internship Program.

**Layout notes:**
- Timeline/card format, animated entry on scroll.
- Leave structure extensible — component should support adding future roles without redesign.

---

## 8. Contact Section / Footer (site-wide)

**Purpose:** Easy way for recruiters/collaborators to reach out.

**Content:**
- Email: mayank78stu@gmail.com
- Phone: +91-6200482891
- Location: Dehradun, India
- LinkedIn: linkedin.com/in/mayank78stu
- GitHub: github.com/mayank78geu
- Optional: simple contact form (name, email, message) — no backend required initially, can mailto: fallback

---

## 9. Animation Guidelines (functional, not visual)

Use Framer Motion for:
- Page transition fades/slides between routes
- Scroll-triggered reveal animations for sections (fade + slide up, staggered for lists like skills/achievements)
- Hover/tap micro-interactions on project cards, buttons, and nav links
- Animated counters for the Home page highlights strip
- Timeline line-draw animation for Education and Work Experience pages

Keep animations subtle and performant — avoid anything that blocks readability or delays content visibility beyond ~300-500ms.

---

## 10. Content Notes / Constraints

- Do not fabricate metrics, testimonials, or skill percentages not present in the resume.
- GitHub links for projects are placeholders — must be replaced with real repo URLs before launch.
- Resume PDF should be downloadable from the Home page (link to an uploaded PDF asset).
- All content above is sourced directly from Mayank Kumar's resume (April 2026 version) — keep wording accurate to this source when generating final copy, light rewriting for tone/flow is acceptable.
