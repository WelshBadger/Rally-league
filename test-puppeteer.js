const puppeteer = require('puppeteer');

async function testPuppeteer() {
  console.log('🚀 Testing Puppeteer with Codespace settings...');
  
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    await page.goto('https://www.rallies.info');
    console.log('✅ Successfully loaded Rallies.info');
    
    await browser.close();
    console.log('✅ Puppeteer test complete!');
  } catch (error) {
    console.error('❌ Puppeteer test failed:', error.message);
  }
}

testPuppeteer();
