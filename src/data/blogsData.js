export const blogsData = [
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
    featured: true,
    chaptersCount: 19,
    commandsCount: '60+',
    author: {
      name: 'Mayank Kumar',
      role: 'Full Stack Developer & DevOps Enthusiast',
      avatar: '/myimg.png'
    },
    metaDescription: 'Comprehensive Git and GitHub Handbook for Developers and DevOps Engineers. 19 chapters with 60+ commands, branching diagrams, cheat sheets, and GitHub Actions CI/CD setup.',
    keywords: 'Git tutorial, GitHub Handbook, DevOps Git Guide, Git Cheat Sheet, GitHub Actions CI/CD, Git branching, Git merge vs rebase, Mayank Kumar Git Guide, Dehradun software developer'
  }
];

export const getBlogBySlug = (slug) => {
  return blogsData.find((b) => b.slug === slug);
};
