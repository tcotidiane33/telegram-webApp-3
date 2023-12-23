const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6801831511:AAFrnpNUI-exTl2Em4P0GMjLM-MeFcPlAZ8';
const webAppUrl = 'https://ecopayci.netlify.app/';
const webAppUrlOrder = 'https://ecopayci.netlify.app/order';
const webAppUrlPayment = 'https://ecopayci.netlify.app/paymentForm';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Hello <b><i><u>❤️</u></i></b> :)', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Welcome  !', web_app: { url: webAppUrl },
          thumb_url: 'https://st3.depositphotos.com/1915171/18493/v/450/depositphotos_184934276-stock-illustration-set-clothing-accessories-icons-speech.jpg',
        },
          {
            text: 'Enfants', web_app: { url: webAppUrl },
            callback_data: 'option1',
            thumb_url: 'https://ediltex.co.uk/wp-content/uploads/2014/11/cash4clothes-logo-big.png',
          },
          {
            text: 'Ados', web_app: { url: webAppUrl },
            callback_data: 'option2',
            thumb_url: 'https://axonaut.com/blog/wp-content/uploads/2023/01/pipe-commercial-sans-card-9-1.png',
          },
          {
            text: 'Adulte', web_app: { url: webAppUrl },
            callback_data: 'option3',
            thumb_url: 'https://img.freepik.com/free-vector/set-clothes-isolated_1308-133273.jpg',
          },]
        ]
      }
    });
  }

  if (text === '/orders' && text === '/carts') {
    await bot.sendMessage(chatId, 'Carts <b><i><u>❤️</u></i></b> :)', {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          [{ text: 'Your Order !', web_app: { url: webAppUrlOrder } }]
        ]
      }
    });
  }

  if (text === '/pay') {
    await bot.sendMessage(chatId, 'Payment <b><i><u>❤️</u></i></b> :)', {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          [{ text: 'Go To Pay !', web_app: { url: webAppUrlPayment } }]
        ]
      }
    });
  }
});
