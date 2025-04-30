'use client';

import {
  OrganizationSchema,
  WebApplicationSchema,
  ToolsSoftwareApplicationSchema,
  BreadcrumbSchema,
  ToolPageSchema,
  FAQPageSchema,
  ArticleSchema
} from '@/lib/structured-data';
import { usePathname } from 'next/navigation';

type StructuredDataProps = {
  type?: 'home' | 'tools' | 'tool' | 'faq' | 'article';
  toolName?: string;
  toolDescription?: string;
  toolUrl?: string;
  toolCategory?: string;
  faqs?: { question: string; answer: string }[];
  articleData?: {
    title: string;
    description: string;
    publishDate: string;
    modifiedDate?: string;
    image: string;
    authorName: string;
  };
};

/**
 * Component that renders appropriate structured data based on the current page type
 */
export function StructuredData({
  type,
  toolName,
  toolDescription,
  toolUrl,
  toolCategory,
  faqs,
  articleData
}: StructuredDataProps) {
  const pathname = usePathname();
  
  // Generate breadcrumb data based on the current URL path
  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbItems = [{ name: 'Home', url: 'https://offlinetools.org' }];
    
    let cumulativePath = '';
    pathSegments.forEach((segment) => {
      cumulativePath += `/${segment}`;
      const formattedName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbItems.push({
        name: formattedName,
        url: `https://offlinetools.org${cumulativePath}`
      });
    });
    
    return breadcrumbItems;
  };

  // Always render organization schema for all pages
  return (
    <>
      <OrganizationSchema />
      
      {/* Generate breadcrumbs for all pages except home */}
      {pathname !== '/' && <BreadcrumbSchema items={getBreadcrumbItems()} />}
      
      {/* Render specific structured data based on page type */}
      {(type === 'home' || pathname === '/') && <WebApplicationSchema />}
      
      {(type === 'tools' || pathname === '/tools') && <ToolsSoftwareApplicationSchema />}
      
      {type === 'tool' && toolName && toolDescription && toolUrl && toolCategory && (
        <ToolPageSchema 
          toolName={toolName}
          toolDescription={toolDescription}
          toolUrl={toolUrl}
          toolCategory={toolCategory}
        />
      )}
      
      {type === 'faq' && faqs && faqs.length > 0 && (
        <FAQPageSchema faqs={faqs} />
      )}
      
      {type === 'article' && articleData && (
        <ArticleSchema
          title={articleData.title}
          description={articleData.description}
          publishDate={articleData.publishDate}
          modifiedDate={articleData.modifiedDate}
          image={articleData.image}
          authorName={articleData.authorName}
        />
      )}
    </>
  );
} 