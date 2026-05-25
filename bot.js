const { chromium } = require('playwright');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

if (!botToken || !chatId) {
  console.error('BOT_TOKEN или CHAT_ID не заданы в .env');
  process.exit(1);
}

const URL = 'https://www.alza.cz/iphone-16e-128gb-cerny-d12812524.htm';
const TARGET_PRICE = 13990;

async function checkPrice() {
  const bot = new TelegramBot(botToken, { polling: false });
  const browser = await chromium.launch({ 
    headless: false, // omportant: false
    args: ['--disable-blink-features=AutomationControlled']
  });
  const page = await browser.newPage();

  try {
    await page.goto(encodeURI(URL), { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Close coocky
    await page.getByText('Rozumím').click({ timeout: 5000 }).catch(() => {});
    
    // Go through Cloudflare
    await page.locator('input[type="checkbox"]').click({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(4000);

    const bodyText = await page.locator('body').innerText();
    const match = bodyText.match(/(\d[\s\u00a0\d]+)\s*Kč/);
    
    await browser.close();

    if (!match) {
      console.log('Цена не найдена');
      return;
    }

    const price = parseInt(match[1].replace(/[\s\u00a0]/g, ''));
    console.log('Price:', price, 'Kč');

    const encodedUrl = encodeURI(URL);
    await bot.sendMessage(CHAT_ID, `iPhone 16e сейчас стоит: ${price} Kč\n${encodedUrl}`);

    if (price < TARGET_PRICE) {
      await bot.sendMessage(CHAT_ID, `🔥 Цена упала ниже ${TARGET_PRICE} Kč!\n${encodedUrl}`);
    }

  } catch (e) {
    console.log('Error:', e.message);
    await browser.close();
  }
}

checkPrice();