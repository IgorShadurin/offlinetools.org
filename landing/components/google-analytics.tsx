'use client';

import Script from 'next/script';

/**
 * GoogleAnalytics component that loads Google Analytics tracking scripts
 * Uses next/script for optimized loading
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XGGHRP0JGM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XGGHRP0JGM');
        `}
      </Script>
    </>
  );
} 