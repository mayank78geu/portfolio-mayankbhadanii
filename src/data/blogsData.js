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
    metaDescription: 'Comprehensive Git and GitHub Handbook for Developers and DevOps Engineers authored by Mayank Kumar. 19 chapters with 60+ commands, branching diagrams, cheat sheets, and GitHub Actions CI/CD.',
    keywords: 'Mayank Kumar, Mayank Kumar Git, Mayank Kumar GitHub Handbook, Mayank Kumar DevOps, Git tutorial Mayank Kumar, Git Cheat Sheet Mayank Kumar, Mayank Bhadani'
  }
];

export const getBlogBySlug = (slug) => {
  return blogsData.find((b) => b.slug === slug);
};
