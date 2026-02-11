const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome'
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to Mattermost
  await page.goto('https://chat.aidia.dk/login');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Check for "View in Browser" button
  console.log('Looking for View in Browser button...');
  try {
    await page.getByText('View in Browser').click({ timeout: 5000 });
    console.log('Clicked View in Browser');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log('No View in Browser dialog');
  }
  
  console.log('Current URL:', page.url());
  
  // Fill login form using generic selectors
  // The form has Email/Username input and Password input
  const emailInput = page.locator('input').first();
  const passwordInput = page.locator('input[type="password"]');
  
  await emailInput.fill('eli@aidia.dk');
  console.log('Filled email');
  
  await passwordInput.fill('XBK4zkg-bzk2eak.bdu');
  console.log('Filled password');
  
  // Click login button
  await page.getByRole('button', { name: 'Log in' }).click();
  console.log('Clicked login');
  
  // Wait for navigation to channels
  await page.waitForURL('**/channels/**', { timeout: 20000 });
  console.log('Logged in!');
  
  // Navigate to Town Square
  await page.goto('https://chat.aidia.dk/aidia-aps/channels/town-square');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Find and fill the textbox
  const textbox = await page.waitForSelector('textarea', { timeout: 10000 });
  
  const message = `@linus Hey! 👋 Just finished the EchoPhrase MVP - an AI shadowing workout app for language learning.

Can you set up deployment on your server?

**Repo:** https://github.com/linus-madsen/echophrase
**Tech:** Next.js 16, needs \`OPENAI_API_KEY\` env var
**Build:** \`npm install && npm run build && npm start\` (port 3000)

Let me know if you need anything!`;

  await textbox.click();
  await textbox.fill(message);
  await page.keyboard.press('Control+Enter');
  await page.waitForTimeout(3000);
  
  console.log('Message posted successfully!');
  await page.screenshot({ path: '/tmp/mm_posted.png' });
  
  await browser.close();
})();
