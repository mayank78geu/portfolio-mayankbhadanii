import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, 
  FaSearch, 
  FaFilter, 
  FaClock, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaBookmark,
  FaTerminal,
  FaFire
} from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { blogsData } from '../data/blogsData';
import SEO from '../components/SEO';
import './Blog.css';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogsData.map((b) => b.category).filter(Boolean)));
    return ['All', ...unique];
  }, []);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        blog.title?.toLowerCase().includes(query) ||
        blog.subtitle?.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const featuredBlog = blogsData.find((b) => b.featured) || blogsData[0];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Mayank Kumar Engineering Blog',
    'description': 'Technical engineering blog, architecture guides, and developer handbooks by Mayank Kumar.',
    'url': 'https://mayankbhadanii.dev/blog',
    'publisher': {
      '@type': 'Person',
      'name': 'Mayank Kumar',
      'url': 'https://mayankbhadanii.dev/'
    },
    'blogPost': blogsData.map((b) => ({
      '@type': 'BlogPosting',
      'headline': b.title,
      'description': b.excerpt,
      'url': `https://mayankbhadanii.dev/blog/${b.slug}`,
      'datePublished': b.publishedDate,
      'author': {
        '@type': 'Person',
        'name': b.author.name
      }
    }))
  };

  return (
    <motion.div
      className="blog-page page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Primary SEO Tagging */}
      <SEO
        title="Engineering Blog & Technical Handbooks"
        description="Explore in-depth technical guides, Git & GitHub handbooks, full-stack architecture patterns, and DevOps tutorials by Mayank Kumar."
        keywords="Mayank Kumar Blog, Git Handbook, GitHub Handbook, Full Stack Engineering, DevOps Tutorials, Java Spring Boot Articles, React.js guides"
        canonicalUrl="https://mayankbhadanii.dev/blog"
        schemaData={blogListSchema}
      />

      {/* Ambient background glows */}
      <div
        className="ambient-glow blog-list-glow-1"
        style={{ top: '10%', left: '10%', width: '480px', height: '480px' }}
      ></div>
      <div
        className="ambient-glow blog-list-glow-2"
        style={{ bottom: '15%', right: '8%', width: '520px', height: '520px' }}
      ></div>

      <div className="container">
        {/* Section Header */}
        <motion.div className="section-header-centered" variants={itemVariants}>
          <h2 className="section-title">Engineering Blog &amp; Handbooks</h2>
          <p className="section-subtitle">
            Comprehensive field guides, developer cheat sheets, and practical engineering blueprints
          </p>
        </motion.div>

        {/* Featured Article Highlight Hero Card */}
        {featuredBlog && (
          <motion.div className="featured-blog-section" variants={itemVariants}>
            <div className="featured-blog-card glass-card">
              <div className="featured-blog-badge-row">
                <span className="featured-pill">
                  <FaFire size={12} /> Featured Handbook
                </span>
                <span className="category-pill">{featuredBlog.category}</span>
              </div>

              <div className="featured-blog-body">
                <h3 className="featured-blog-title">
                  <Link to={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                </h3>
                <p className="featured-blog-subtitle">{featuredBlog.subtitle}</p>
                <p className="featured-blog-excerpt">{featuredBlog.excerpt}</p>
              </div>

              {/* Quick stats highlight */}
              <div className="featured-stats-row">
                <div className="stat-bubble">
                  <FaTerminal className="stat-icon" />
                  <span><strong>{featuredBlog.chaptersCount}</strong> Chapters</span>
                </div>
                <div className="stat-bubble">
                  <FaBookmark className="stat-icon" />
                  <span><strong>{featuredBlog.commandsCount}</strong> Commands</span>
                </div>
                <div className="stat-bubble">
                  <FaClock className="stat-icon" />
                  <span>{featuredBlog.readTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="featured-tags-row">
                {featuredBlog.tags.map((tag, i) => (
                  <span key={i} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="featured-footer">
                <div className="author-meta-mini">
                  <div className="author-avatar-mini">MK</div>
                  <div>
                    <span className="author-name-mini">{featuredBlog.author.name}</span>
                    <span className="published-date-mini">
                      <FaCalendarAlt size={10} /> Aug 22, 2026
                    </span>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredBlog.slug}`}
                  className="btn btn-primary read-article-btn"
                  title="Read Full Handbook"
                >
                  <span>Read Full Handbook</span>
                  <FaArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search & Filter Bar */}
        <motion.div className="blog-controls-bar glass-card" variants={itemVariants}>
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or technology (e.g. Git, DevOps, CI/CD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                title="Clear search"
              >
                <HiX size={18} />
              </button>
            )}
          </div>

          {categories.length > 1 && (
            <div className="category-filters-wrapper">
              <div className="filter-label">
                <FaFilter size={12} /> Filter:
              </div>
              <div className="category-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Counter */}
        <motion.div className="blog-meta-row" variants={itemVariants}>
          <span className="blog-count-label">
            Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'}
            {(searchQuery || selectedCategory !== 'All') && ' matching search'}
          </span>
          {(searchQuery || selectedCategory !== 'All') && (
            <button className="reset-filters-link" onClick={clearFilters}>
              Reset filters
            </button>
          )}
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="blog-grid">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.article
                  key={blog.id}
                  className="blog-card-container"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="blog-card glass-card">
                    {/* Header */}
                    <div className="blog-card-header">
                      <span className="blog-category-badge">{blog.category}</span>
                      <span className="blog-read-time">
                        <FaClock size={11} /> {blog.readTime}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="blog-card-body">
                      <h3 className="blog-card-title">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="blog-card-excerpt">{blog.excerpt}</p>
                    </div>

                    {/* Tags */}
                    {blog.tags && (
                      <div className="blog-card-tags">
                        {blog.tags.slice(0, 4).map((tag, idx) => (
                          <span key={idx} className="tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="blog-card-footer">
                      <div className="blog-card-meta">
                        <span className="author-name-small">{blog.author.name}</span>
                        <span className="blog-date-small">Aug 22, 2026</span>
                      </div>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="btn btn-secondary blog-read-btn"
                        title="Read Article"
                      >
                        <span>Read</span>
                        <FaArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                className="blog-empty-state glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="empty-icon-wrap">
                  <FaBookOpen size={32} />
                </div>
                <h3>No articles found</h3>
                <p>
                  No posts matched{' '}
                  {searchQuery && <span className="empty-search-highlight">"{searchQuery}"</span>}.
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
