export const blogsData = [
  {
    id: 'docker-handbook',
    slug: 'docker-handbook',
    title: 'The Complete Docker Handbook — A–Z for Developers & DevOps',
    subtitle: 'An A–Z field guide from your very first docker run to multi-stage builds & CI/CD deployment pipelines',
    excerpt: 'Master Docker and containerization from core architecture and Dockerfiles to volume persistence, bridge networking, Docker Compose multi-service stacks, multi-stage builds, and CI/CD automation.',
    category: 'DevOps & Containers',
    tags: ['Docker', 'Containers', 'DevOps', 'CI/CD', 'Docker Compose', 'Dockerfiles', 'Microservices', 'Cheatsheet'],
    readTime: '16 min read',
    publishedDate: '2026-10-07',
    lastUpdated: '2026-10-07',
    featured: true,
    chaptersCount: 19,
    commandsCount: '60+',
    author: {
      name: 'Mayank Kumar',
      role: 'Full Stack Developer & DevOps Enthusiast',
      avatar: '/mb.jpg'
    },
    metaDescription: 'The Complete Docker Handbook for Developers and DevOps Engineers authored by Mayank Kumar. 19 chapters covering Docker architecture, Dockerfile syntax, multi-stage builds, volumes, Compose, and CI/CD pipelines.',
    keywords: 'Mayank Kumar, Docker Handbook Mayank Kumar, Docker Tutorial, Complete Docker Guide, Docker Cheat Sheet, Dockerfile tutorial, Docker Compose guide, DevOps Docker Mayank Kumar, Containerization tutorial, Docker CI CD GitHub Actions, Docker architecture, Docker volumes networking, Mayank Bhadani'
  },
  {
    id: 'git-github-handbook',
    slug: 'git-github-handbook',
    title: 'The Complete Git & GitHub Handbook — A–Z for Developers & DevOps',
    subtitle: 'An A–Z field guide from your very first git init to branch automation & GitHub Actions CI/CD pipelines',
    excerpt: 'Master Git and GitHub from foundational version control concepts to advanced branching strategies, pull requests, merge conflict resolution, and GitHub Actions CI/CD workflows.',
    category: 'DevOps & Tools',
    tags: ['Git', 'GitHub', 'DevOps', 'CI/CD', 'Version Control', 'GitHub Actions', 'Cheatsheet'],
    readTime: '15 min read',
    publishedDate: '2026-08-22',
    lastUpdated: '2026-08-22',
    featured: false,
    chaptersCount: 19,
    commandsCount: '60+',
    author: {
      name: 'Mayank Kumar',
      role: 'Full Stack Developer & DevOps Enthusiast',
      avatar: '/mb.jpg'
    },
    metaDescription: 'Comprehensive Git and GitHub Handbook for Developers and DevOps Engineers authored by Mayank Kumar. 19 chapters with 60+ commands, branching diagrams, cheat sheets, and GitHub Actions CI/CD.',
    keywords: 'Mayank Kumar, Mayank Kumar Git, Mayank Kumar GitHub Handbook, Mayank Kumar DevOps, Git tutorial Mayank Kumar, Git Cheat Sheet Mayank Kumar, Mayank Bhadani'
  }
];

export const getBlogBySlug = (slug) => {
  return blogsData.find((b) => b.slug === slug);
};
