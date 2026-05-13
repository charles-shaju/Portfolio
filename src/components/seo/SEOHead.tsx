import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * SEO component for managing page meta tags
 * Handles title, description, canonical, and Open Graph tags
 */
export function SEOHead({
  title,
  description,
  image,
  type = 'website'
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} | ${photographerInfo.name}`
    : `${photographerInfo.name} — ${photographerInfo.tagline}`;

  const defaultDescription = photographerInfo.heroIntroduction;
  const fullDescription = description || defaultDescription;

  const SITE_URL = 'https://charles-shaju.lovable.app';
  const fullUrl = `${SITE_URL}${location.pathname}`;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    updateMetaTag('description', fullDescription);
    updateLinkTag('canonical', fullUrl);

    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', photographerInfo.name, true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', ogImage);

    updateMetaTag('author', photographerInfo.name);
    updateMetaTag(
      'keywords',
      'Charles Shaju, embedded systems engineer, IoT, robotics, ESP32, Raspberry Pi, Pixhawk, ArduPilot, autonomous marine vehicles, ROV, ASV, embedded AI, machine learning, Kerala, India'
    );
  }, [fullTitle, fullDescription, fullUrl, ogImage, type]);

  return null;
}
