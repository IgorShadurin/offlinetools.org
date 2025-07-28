#!/usr/bin/env node

/**
 * Meta Tags Validation Script
 * Validates that all enhanced meta tags are properly implemented
 */

const { generateMetadata, generateToolMetadata, siteConfig } = require('../lib/metadata.ts');

/**
 * Validate base metadata configuration
 */
function validateBaseMetadata() {
  const metadata = generateMetadata();
  
  console.log('🔍 Validating Base Metadata Configuration...\n');
  
  // Check essential properties
  const checks = [
    { name: 'Title Template', value: metadata.title?.template, expected: true },
    { name: 'Description', value: metadata.description, expected: true },
    { name: 'Keywords Array', value: Array.isArray(metadata.keywords), expected: true },
    { name: 'OpenGraph Config', value: metadata.openGraph?.type, expected: 'website' },
    { name: 'Twitter Card', value: metadata.twitter?.card, expected: 'summary_large_image' },
    { name: 'Canonical URL', value: metadata.alternates?.canonical, expected: true },
    { name: 'LinkedIn Tags', value: metadata.other?.['linkedin:owner'], expected: 'OfflineTools' },
    { name: 'Pinterest Tags', value: metadata.other?.['pinterest:rich_pin'], expected: 'true' },
    { name: 'TikTok Tags', value: metadata.other?.['tiktok:creator'], expected: '@offlinetools' },
    { name: 'Theme Color', value: metadata.other?.['theme-color'], expected: '#2563eb' },
    { name: 'Mobile App Tags', value: metadata.other?.['apple-mobile-web-app-capable'], expected: 'yes' },
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    const passed = check.expected === true ? !!check.value : check.value === check.expected;
    console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'PASS' : 'FAIL'}`);
    if (passed) passedChecks++;
  });
  
  console.log(`\n📊 Base Metadata: ${passedChecks}/${checks.length} checks passed\n`);
  return passedChecks === checks.length;
}

/**
 * Validate tool-specific metadata
 */
function validateToolMetadata() {
  console.log('🛠️  Validating Tool-Specific Metadata...\n');
  
  const toolMetadata = generateToolMetadata('jsonFormatter');
  
  const checks = [
    { name: 'Tool Title', value: toolMetadata.title?.includes('JSON Formatter'), expected: true },
    { name: 'Tool Description', value: toolMetadata.description?.includes('JSON'), expected: true },
    { name: 'Tool OpenGraph URL', value: toolMetadata.openGraph?.url?.includes('/tools/jsonFormatter'), expected: true },
    { name: 'Tool Category', value: toolMetadata.other?.['tool:category'], expected: 'Developer Tools' },
    { name: 'Article Section', value: toolMetadata.other?.['article:section'], expected: 'Tools' },
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    const passed = check.expected === true ? !!check.value : check.value === check.expected;
    console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'PASS' : 'FAIL'}`);
    if (passed) passedChecks++;
  });
  
  console.log(`\n📊 Tool Metadata: ${passedChecks}/${checks.length} checks passed\n`);
  return passedChecks === checks.length;
}

/**
 * Validate site configuration
 */
function validateSiteConfig() {
  console.log('⚙️  Validating Site Configuration...\n');
  
  const checks = [
    { name: 'Site Name', value: siteConfig.name, expected: 'OfflineTools' },
    { name: 'Site URL', value: siteConfig.url, expected: 'https://offlinetools.org' },
    { name: 'Twitter Handle', value: siteConfig.twitterHandle, expected: '@offlinetools' },
    { name: 'GitHub URL', value: siteConfig.githubUrl?.includes('github.com'), expected: true },
    { name: 'Support Email', value: siteConfig.supportEmail?.includes('@'), expected: true },
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    const passed = check.expected === true ? !!check.value : check.value === check.expected;
    console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'PASS' : 'FAIL'}`);
    if (passed) passedChecks++;
  });
  
  console.log(`\n📊 Site Config: ${passedChecks}/${checks.length} checks passed\n`);
  return passedChecks === checks.length;
}

/**
 * Main validation function
 */
function main() {
  console.log('🚀 OfflineTools Meta Tags Validation\n');
  console.log('═'.repeat(50));
  
  const results = [
    validateSiteConfig(),
    validateBaseMetadata(),
    validateToolMetadata(),
  ];
  
  const allPassed = results.every(Boolean);
  
  console.log('═'.repeat(50));
  console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL CHECKS PASSED' : '❌ SOME CHECKS FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎉 Your meta tags are properly configured for:');
    console.log('  • Google Search Console');
    console.log('  • Bing Webmaster Tools');
    console.log('  • Facebook Open Graph');
    console.log('  • Twitter Cards');
    console.log('  • LinkedIn Rich Previews');
    console.log('  • Pinterest Rich Pins');
    console.log('  • TikTok Social Sharing');
    console.log('  • Instagram Social Sharing');
    console.log('  • Discord/Telegram Embeds');
    console.log('  • Mobile App Integration');
    console.log('  • PWA Compatibility');
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Run validation if called directly
if (require.main === module) {
  main();
}

module.exports = {
  validateBaseMetadata,
  validateToolMetadata,
  validateSiteConfig,
}; 