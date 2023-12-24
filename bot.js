const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const token = '6465240701:AAEMjbjOjot0IcMYVjDBhbOLs21pl1RPMdQ';
// const bot = new Telegraf(token);
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});



// replace the value below with the Telegram token you receive from @BotFather
const webAppUrl = 'https://libraryci.netlify.app/';
const webAppUrlOrder = 'https://libraryci.netlify.app/order';
const webAppUrlCategory = 'https://libraryci.netlify.app/category';
const webAppUrlPayment = 'https://libraryci.netlify.app/paymentForm';

// // Exemple de stockage en mémoire (ne pas utiliser en production)
// const userSubscriptions = new Map();
// // Commande pour s'abonner aux notifications
// bot.command('subscribe', (ctx) => {
//   const userId = ctx.message.from.id;
//   userSubscriptions.set(userId, true);
//   ctx.reply('Vous êtes maintenant abonné aux notifications.');
// });

// // Commande pour se désabonner des notifications
// bot.command('unsubscribe', (ctx) => {
//   const userId = ctx.message.from.id;
//   userSubscriptions.delete(userId);
//   ctx.reply('Vous êtes maintenant désabonné aux notifications.');
// });

// // Fonction pour envoyer une notification à un utilisateur
// function sendNotification(userId, message) {
//   if (userSubscriptions.has(userId)) {
//     bot.telegram.sendMessage(userId, message);
//   }
// }

// // Exemple d'utilisation de la fonction
// const userIdToNotify = 123456789; // Remplacez par l'ID réel de l'utilisateur
// sendNotification(userIdToNotify, 'Nouvelle notification : Opération réussie !');

// -----------------------------------------------------------------------------------------------//:/


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
            text: 'Category', web_app: { url: webAppUrlCategory },
            callback_data: 'option1',
            thumb_url: 'https://ediltex.co.uk/wp-content/uploads/2014/11/cash4clothes-logo-big.png',
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
  if (text === '/category' && text === '/carts') {
    await bot.sendMessage(chatId, 'Carts <b><i><u>❤️</u></i></b> :)', {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          [{ text: 'Category !', web_app: { url: webAppUrlCategory } }]
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
