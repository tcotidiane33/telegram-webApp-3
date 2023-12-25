const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const token = '6465240701:AAEMjbjOjot0IcMYVjDBhbOLs21pl1RPMdQ';
// const bot = new Telegraf(token);
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});



// replace the value below with the Telegram token you receive from @BotFather
const webAppUrl = 'https://telegram-web-app-3.vercel.app/';
const webAppUrlOrder = 'https://telegram-web-app-3.vercel.app/order';
const webAppUrlCategory = 'https://telegram-web-app-3.vercel.app/category';
const webAppUrlPayment = 'https://telegram-web-app-3.vercel.app/paymentForm';

const commands = {
  start: {
    description: 'Start command',
    handler: async (chatId) => {
      await bot.sendMessage(chatId, 'Hello <b><i><u>❤️</u></i></b> :)', {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Welcome!', url: webAppUrl, thumb_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJo_fmeQyjBw86PTcMb9wUrZT_PmXOHYEtQ&usqp=CAU' }],
            [{ text: 'Category', url: webAppUrlCategory, callback_data: 'option1', thumb_url: 'https://sharonkapoor45.files.wordpress.com/2014/08/buy-books-online.jpg?w=640' }],
          ]
        }
      });
    }
  },
  orders: {
    description: 'Orders command',
    handler: async (chatId) => {
      // Handle orders command
    }
  },
  category: {
    description: 'Category command',
    handler: async (chatId) => {
      // Handle category command
    }
  },
  pay: {
    description: 'Pay command',
    handler: async (chatId) => {
      // Handle pay command
    }
  }
};

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Handle dynamic commands
  if (text.startsWith('/')) {
    const command = text.substring(1).toLowerCase();
    if (commands[command]) {
      await commands[command].handler(chatId);
    }
  }
});