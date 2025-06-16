import { test, expect } from '@playwright/test';
import { ElectronApplication, Page } from 'playwright';
import { _electron as electron } from 'playwright';
import { navigateToTool, waitForComponentTitle } from './utils';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['.'] });
  page = await electronApp.firstWindow();
});

test.afterAll(async () => {
  await electronApp.close();
});

test.describe('Timezone Converter', () => {
  test('should convert time between timezones', async () => {
    await navigateToTool(page, 'Timezone Converter');
    
    const dateTimeInput = await page.waitForSelector('input[type="datetime-local"]');
    await dateTimeInput.fill('2024-01-01T12:00');
    
    const fromSelect = await page.waitForSelector('select >> nth=0');
    await fromSelect.selectOption('America/New_York');
    
    const toSelect = await page.waitForSelector('select >> nth=1');
    await toSelect.selectOption('Europe/London');
    
    const resultElement = await page.waitForSelector('[data-testid="conversion-result"]');
    expect(await resultElement.isVisible()).toBe(true);
    
    const copyButton = await page.waitForSelector('button:has-text("Copy Result")');
    expect(await copyButton.isVisible()).toBe(true);
  });

  test('should search timezones', async () => {
    await navigateToTool(page, 'Timezone Converter');
    
    const searchInput = await page.waitForSelector('input[placeholder*="Search timezones"]');
    await searchInput.fill('New York');
    
    const select = await page.waitForSelector('select >> nth=0');
    const options = await page.$$eval('select >> nth=0 option', elements => 
      elements.map(el => el.textContent || '')
    );
    expect(options.some(option => option.includes('Eastern Time'))).toBe(true);
  });

  test('should swap timezones', async () => {
    await navigateToTool(page, 'Timezone Converter');
    
    const fromSelect = await page.waitForSelector('select >> nth=0');
    await fromSelect.selectOption('America/New_York');
    
    const toSelect = await page.waitForSelector('select >> nth=1');
    await toSelect.selectOption('Europe/London');
    
    const swapButton = await page.waitForSelector('button:has-text("Swap")');
    await swapButton.click();
    
    expect(await fromSelect.inputValue()).toBe('Europe/London');
    expect(await toSelect.inputValue()).toBe('America/New_York');
  });

  test('should display popular timezones', async () => {
    await navigateToTool(page, 'Timezone Converter');
    
    const popularSection = await page.waitForSelector('text=Popular Timezones');
    expect(await popularSection.isVisible()).toBe(true);
    
    const timezoneCards = await page.locator('[data-testid="popular-timezone"]').count();
    expect(timezoneCards).toBeGreaterThan(0);
  });
});
