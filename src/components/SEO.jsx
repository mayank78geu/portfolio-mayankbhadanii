import { useEffect } from 'react';

/**
 * Dynamic SEO component to manage document title, meta tags, OpenGraph,
 * Twitter cards, and Schema.org JSON-LD structured data for Google Search ranking.
 */
const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://mayankbhadanii.dev/android-chrome-512x512.png',
  publishedTime,
  modifiedTime,
  author = 'Mayank Kumar',
  schemaData = null,
}) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title.includes('Mayank Kumar') ? title : `${title} | Mayank Kumar`;
    }

    // Helper to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    if (description) {
      updateMetaTag('meta[name="description"]', 'name', 'description', description);
      updateMetaTag('meta[name="title"]', 'name', 'title', document.title);
    }
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }
    if (author) {
      updateMetaTag('meta[name="author"]', 'name', 'author', author);
    }

    // 3. Canonical URL
    const canonical = canonicalUrl || window.location.href.split('?')[0];
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // 4. OpenGraph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', document.title);
    if (description) {
      updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    }
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Mayank Kumar Portfolio');

    if (publishedTime) {
      updateMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      updateMetaTag('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);
    }
    if (author) {
      updateMetaTag('meta[property="article:author"]', 'property', 'article:author', author);
    }

    // 5. Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', document.title);
    if (description) {
      updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    updateMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', canonical);

    // 6. Structured Data (JSON-LD)
    let dynamicSchemaScript = document.getElementById('dynamic-seo-schema');
    if (schemaData) {
      if (!dynamicSchemaScript) {
        dynamicSchemaScript = document.createElement('script');
        dynamicSchemaScript.id = 'dynamic-seo-schema';
        dynamicSchemaScript.type = 'application/ld+json';
        document.head.appendChild(dynamicSchemaScript);
      }
      dynamicSchemaScript.textContent = JSON.stringify(schemaData);
    } else if (dynamicSchemaScript) {
      dynamicSchemaScript.remove();
    }

    // Cleanup when component unmounts
    return () => {
      const scriptToRemove = document.getElementById('dynamic-seo-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, publishedTime, modifiedTime, author, schemaData]);

  return null;
};

export default SEO;
