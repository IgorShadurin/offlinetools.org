/**
 * Article promo component to display content within articles
 */
'use client';

import Link from 'next/link';
import { useArticlePromo } from './article-promo-context';

/**
 * Component to display an article promotion with a link to a related tool
 */
export function ArticlePromo() {
  const { title, description, linkText, linkUrl } = useArticlePromo();
  
  return (
    <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2">
        {description}{' '}
        <Link href={linkUrl} className="text-blue-600 hover:underline dark:text-blue-400">
          {linkText}
        </Link>
      </p>
    </div>
  );
} 