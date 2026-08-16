import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  applicationCategory?: string;
  schemaType?: 'WebApplication' | 'WebPage' | 'AboutPage' | 'ContactPage';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  applicationCategory = 'FinanceApplication',
  schemaType = 'WebApplication',
}) => {
  const fullCanonicalUrl = `https://vatcalcs.net${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // 3. Update Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonicalUrl;

    // 4. Update OpenGraph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:url', fullCanonicalUrl);
    updateOrCreateMeta('og:type', 'website');

    // 5. Update Twitter Card Tags
    const updateOrCreateTwitter = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateOrCreateTwitter('twitter:title', title);
    updateOrCreateTwitter('twitter:description', description);
    updateOrCreateTwitter('twitter:url', fullCanonicalUrl);
    updateOrCreateTwitter('twitter:card', 'summary_large_image');

    // 6. Inject Schema.org JSON-LD for WebApplication
    const schemaScriptId = 'page-jsonld-schema';
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaScriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: title.split('|')[0].trim(),
      url: fullCanonicalUrl,
      description: description,
      applicationCategory: applicationCategory,
      operatingSystem: 'All Modern Web Browsers',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'EUR',
      },
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      softwareVersion: '1.0.0',
    };

    schemaScript.text = JSON.stringify(schemaData);

    return () => {
      // Optional cleanup
    };
  }, [title, description, fullCanonicalUrl, applicationCategory, schemaType]);

  return null;
};
