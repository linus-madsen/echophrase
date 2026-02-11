const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const page = await browser.newPage();
  
  await page.goto('https://chat.aidia.dk/login');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  try { await page.getByText('View in Browser').click({ timeout: 5000 }); } catch {}
  await page.waitForLoadState('networkidle');
  
  await page.locator('input').first().fill('eli@aidia.dk');
  await page.locator('input[type="password"]').fill('XBK4zkg-bzk2eak.bdu');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('**/channels/**', { timeout: 20000 });
  
  await page.goto('https://chat.aidia.dk/aidia-aps/channels/town-square');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const textbox = await page.waitForSelector('textarea', { timeout: 10000 });
  await textbox.click();
  await textbox.fill(`@linus Update: I deployed EchoPhrase via SSH! 🚀

**Running:** \`http://135.181.81.11:3005\` (port 3005)
**Location:** \`/srv/games/echophrase\`

Just need nginx config added for:
- Either \`games.aidia.dk/echophrase/\` route
- Or \`echophrase.aidia.dk\` subdomain

Let me know which you prefer!`);
  
  await page.keyboard.press('Control+Enter');
  await page.waitForTimeout(3000);
  console.log('Update posted!');
  await browser.close();
})();
