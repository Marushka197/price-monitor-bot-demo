# Price Monitor Bot

It is an elementary bot for price monitoring on web sites with the notification in Telegram. This bot created for a small business: follow your competitors and do not loose your clients because of discounts. 


## How is works
1. It is launched every hour through Windows Task Scheduler
2. It checks prices according to the list of links
3. If the price drops lower than yours - sends notification to a Telegram 
4. It works on the regular PC or laptop. You do not need a server. 

## Demo
![Telegram notification](screenshot.jpg)

Notification includes: name of the product, old and new price, link.

## Quick start

### 1. Identify the relationships
```bash
npm install puppeteer
npx puppeteer install chromium
