# Price Monitor Bot

A simple bot for monitoring product prices on websites and sending notifications to Telegram when prices drop.

## How it works

1. Runs automatically every hour via Windows Task Scheduler
2. Checks prices on the list of product links you provide
3. If the price drops below your target, it sends a notification to your Telegram
4. Works on any regular PC or laptop - no server required

## Demo

![Telegram notification](screenshot.jpg)

Notifications include: product name, old price, new price, and direct link.

## Quick Start

### 1. Install dependencies
```bash
npm install puppeteer
npx puppeteer browsers install chrome
