import * as fs from 'node:fs'
import * as path from 'node:path'

/**
 * Ensures the screenshots directory exists for tests
 */
function ensureScreenshotsDir() {
  try {
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  } catch (error) {
    console.error('Error creating screenshots directory:', error);
  }
}

// Run setup on import
ensureScreenshotsDir(); 