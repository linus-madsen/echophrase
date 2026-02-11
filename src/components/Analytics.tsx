'use client';

import Script from 'next/script';

export default function Analytics() {
  // Using Plausible for privacy-friendly analytics
  // Can switch to Google Analytics if preferred
  return (
    <>
      <Script
        defer
        data-domain="echophrase.app"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    </>
  );
}
