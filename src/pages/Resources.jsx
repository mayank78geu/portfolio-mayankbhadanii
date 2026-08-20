import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBookOpen, 
  FaExternalLinkAlt, 
  FaSearch, 
  FaFilter, 
  FaGithub, 
  FaCode, 
  FaTerminal, 
  FaCopy, 
  FaCheck, 
  FaBookmark,
  FaLightbulb
} from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import resourcesData from '../data/resources.json';
import './Resources.css';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  // Extract unique categories dynamically from JSON data
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(resourcesData.map((res) => res.category).filter(Boolean))
    );
    return ['All', ...unique];
  }, []);

  // Filter resources based on category and search query
  const filteredResources = useMemo(() => {
    return resourcesData.filter((resource) => {
      const matchesCategory =
        selectedCategory === 'All' || resource.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        resource.title?.toLowerCase().includes(query) ||
        resource.subtitle?.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.category?.toLowerCase().includes(query) ||
        resource.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyLink = (e, id, link) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // Helper to pick icon based on resource category or icon field
  const getResourceIcon = (iconName, category) => {
    if (iconName === 'github' || category?.toLowerCase().includes('git')) {
      return <FaGithub />;
    }
    if (category?.toLowerCase().includes('code') || category?.toLowerCase().includes('dev')) {
      return <FaCode />;
    }
    if (category?.toLowerCase().includes('terminal') || category?.toLowerCase().includes('cloud')) {
      return <FaTerminal />;
    }
    return <FaBookOpen />;
  };

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
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
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

  return (
    <motion.div
      className="resources-page page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Ambient background glows */}
      <div
        className="ambient-glow resources-glow-1"
        style={{ top: '12%', left: '8%', width: '480px', height: '480px' }}
      ></div>
      <div
        className="ambient-glow resources-glow-2"
        style={{ bottom: '15%', right: '8%', width: '520px', height: '520px' }}
      ></div>

      <div className="container">
        {/* Section Header */}
        <motion.div className="section-header-centered" variants={itemVariants}>
          <h2 className="section-title">Developer Resources</h2>
          <p className="section-subtitle">
            Curated handbooks, technical cheat sheets, and practical guides for Developers and DevOps engineers
          </p>
        </motion.div>

        {/* Search & Filter Controls */}
        <motion.div className="resources-controls-bar glass-card" variants={itemVariants}>
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search resources, topics, tags (e.g. Git, DevOps, CI/CD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="resources-search-input"
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
                <FaFilter size={12} /> Categories:
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
        <motion.div className="resources-meta-row" variants={itemVariants}>
          <span className="resources-count-label">
            Showing <strong>{filteredResources.length}</strong> {filteredResources.length === 1 ? 'resource' : 'resources'}
            {(searchQuery || selectedCategory !== 'All') && ' matching filters'}
          </span>
          {(searchQuery || selectedCategory !== 'All') && (
            <button className="reset-filters-link" onClick={clearFilters}>
              Reset all filters
            </button>
          )}
        </motion.div>

        {/* Resources Grid */}
        <div className="resources-grid">
          <AnimatePresence mode="popLayout">
            {filteredResources.length > 0 ? (
              filteredResources.map((res) => (
                <motion.div
                  key={res.id}
                  className="resource-card-container"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="resource-card glass-card">
                    {/* Top Header / Badges */}
                    <div className="resource-card-header">
                      <div className="resource-icon-badge">
                        {getResourceIcon(res.icon, res.category)}
                      </div>
                      <div className="resource-badges-group">
                        {res.badge && (
                          <span className="resource-badge badge-highlight">
                            <FaBookmark size={10} /> {res.badge}
                          </span>
                        )}
                        {res.category && (
                          <span className="resource-badge badge-category">
                            {res.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="resource-card-body">
                      <h3 className="resource-title">{res.title}</h3>
                      {res.subtitle && (
                        <h4 className="resource-subtitle">{res.subtitle}</h4>
                      )}
                      <p className="resource-description">{res.description}</p>
                    </div>

                    {/* Tags List */}
                    {res.tags && res.tags.length > 0 && (
                      <div className="resource-tags-row">
                        {res.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="tech-tag resource-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="resource-card-footer">
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary resource-access-btn"
                        title={`Open ${res.title}`}
                      >
                        <span>Access Resource</span>
                        <FaExternalLinkAlt size={13} />
                      </a>

                      <button
                        type="button"
                        className={`btn btn-secondary resource-copy-btn ${copiedId === res.id ? 'copied' : ''}`}
                        onClick={(e) => handleCopyLink(e, res.id, res.link)}
                        title={copiedId === res.id ? 'Link copied to clipboard!' : 'Copy resource URL'}
                        aria-label="Copy resource URL"
                      >
                        {copiedId === res.id ? (
                          <>
                            <FaCheck size={13} className="copy-success-icon" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <FaCopy size={13} />
                            <span>Share</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              /* Empty State */
              <motion.div
                className="resources-empty-state glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="empty-icon-wrap">
                  <FaSearch size={32} />
                </div>
                <h3>No resources found</h3>
                <p>
                  We couldn't find any resources matching{' '}
                  {searchQuery && (
                    <span className="empty-search-highlight">"{searchQuery}"</span>
                  )}
                  {searchQuery && selectedCategory !== 'All' && ' in '}
                  {selectedCategory !== 'All' && (
                    <span className="empty-search-highlight">"{selectedCategory}"</span>
                  )}.
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestion / Contribution Note */}
        <motion.div className="resources-info-box glass-card" variants={itemVariants}>
          <div className="info-icon">
            <FaLightbulb />
          </div>
          <div className="info-content">
            <h4>Constantly Updated</h4>
            <p>
              More developer handbooks, cheatsheets, and architecture blueprints are added regularly. Have a topic suggestion or feedback? Feel free to reach out or connect on LinkedIn!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Resources;
