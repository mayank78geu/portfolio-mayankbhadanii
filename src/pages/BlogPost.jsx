import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { getBlogBySlug } from '../data/blogsData';
import SEO from '../components/SEO';
import GitGitHubHandbook from '../components/blog/GitGitHubHandbook';
import DockerHandbook from '../components/blog/DockerHandbook';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const currentSlug = slug || 'docker-handbook';
  const blog = getBlogBySlug(currentSlug);

  // Schema.org TechArticle & BlogPosting Structured Data for Google Rich Snippets & Search Rankings
  const blogSchema = blog ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': blog.title,
    'alternativeHeadline': blog.subtitle,
    'description': blog.metaDescription || blog.excerpt,
    'image': 'https://mayankbhadanii.dev/android-chrome-512x512.png',
    'datePublished': blog.publishedDate,
    'dateModified': blog.lastUpdated || blog.publishedDate,
    'inLanguage': 'en-US',
    'author': {
      '@type': 'Person',
      'name': 'Mayank Kumar',
      'url': 'https://mayankbhadanii.dev/',
      'sameAs': [
        'https://github.com/mayank78geu',
        'https://linkedin.com/in/mayank78stu'
      ]
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Mayank Kumar',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mayankbhadanii.dev/favicon-32x32.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://mayankbhadanii.dev/blog/${blog.slug}`
    },
    'keywords': blog.keywords,
    'articleSection': blog.category,
    'proficiencyLevel': 'Beginner to Advanced',
    'dependencies': blog.slug === 'docker-handbook' ? 'Docker Engine, Docker Compose' : 'Git, GitHub, GitHub Actions'
  } : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25 }
    }
  };

  if (!blog) {
    return (
      <div className="blog-not-found page-wrapper">
        <SEO 
          title="Article Not Found" 
          description="The requested blog post could not be found on Mayank Kumar's engineering blog."
        />
        <div className="container text-center py-5">
          <h2>Article Not Found</h2>
          <p>We couldn't find the article you were looking for.</p>
          <Link to="/blog" className="btn btn-primary mt-3">
            <FaArrowLeft /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="blog-post-page page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Comprehensive SEO Meta Tags for Search Ranking */}
      <SEO
        title={blog.title}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.keywords}
        canonicalUrl={`https://mayankbhadanii.dev/blog/${blog.slug}`}
        ogType="article"
        publishedTime={blog.publishedDate}
        modifiedTime={blog.lastUpdated}
        schemaData={blogSchema}
      />

      {/* Ambient background glows */}
      <div
        className="ambient-glow blog-glow-1"
        style={{ top: '8%', left: '5%', width: '500px', height: '500px' }}
      ></div>
      <div
        className="ambient-glow blog-glow-2"
        style={{ top: '50%', right: '5%', width: '550px', height: '550px' }}
      ></div>

      <div className="blog-post-full-container">
        {blog.slug === 'docker-handbook' ? (
          <DockerHandbook />
        ) : blog.slug === 'git-github-handbook' ? (
          <GitGitHubHandbook />
        ) : (
          <div className="container text-center py-5">
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPost;
