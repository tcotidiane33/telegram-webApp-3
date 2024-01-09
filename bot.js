// const { Cinetpay } = require('./src/Components/API/cinetpay');
// const sendTelegramNotification = require('./src/Components/API/sendNotify');
const TelegramBot = require('node-telegram-bot-api');
const token = '6465240701:AAEMjbjOjot0IcMYVjDBhbOLs21pl1RPMdQ';

const bot = new TelegramBot(token, { polling: true });
// const cp = new Cinetpay({
//   apikey: '447088687629111c58c3573.70152188',
//   site_id: 911501,
//   notify_url: 'https://telegram-web-app-3.vercel.app/notify/:transId',
//   return_url: 'https://telegram-web-app-3.vercel.app/return/:transId',
//   cancel_url: 'https://telegram-web-app-3.vercel.app',
//   lang: 'fr',
//   mode: 'PRODUCTION'
// });

// Définissez les constantes pour les URL
const webAppUrl = 'https://telegram-web-app-3.vercel.app/';
const webAppUrlOrder = `${webAppUrl}order`;
const webAppUrlCategory = `${webAppUrl}category`;
const webAppUrlPayment = `${webAppUrl}paymentForm`;

// // Définissez l'ID de transaction à surveiller
// const transactionIdToMonitor = 'YOUR_TRANSACTION_ID';

// // Fonction pour vérifier l'état du paiement
// const checkPaymentStatus = async (transactionId) => {
//   try {
//     // Effectuez une requête au serveur CinetPay pour vérifier l'état du paiement
//     const response = await cp.checkPayStatus(transactionId);

//     // Traitez la réponse du serveur CinetPay
//     if (response && response.code === '00' && response.message === 'SUCCES' && response.data) {
//       // Le paiement est réussi, envoyez la notification
//       sendTelegramNotification(response);
//     } else {
//       // Le paiement n'est pas encore confirmé, vérifiez à nouveau plus tard
//       console.log('Le paiement n\'est pas encore confirmé. Vérifiez à nouveau plus tard.');
//     }
//   } catch (error) {
//     console.error('Erreur lors de la vérification de l\'état du paiement :', error);
//   }
// };

// // Vérifiez l'état du paiement toutes les 5 minutes (ajustez selon vos besoins)
// setInterval(() => {
//   checkPaymentStatus(transactionIdToMonitor);
// }, 5 * 60 * 1000); // 5 minutes

// Commandes du bot
const commands = {
  start: {
    description: 'Start command',
    handler: async (chatId) => {
      await bot.sendMessage(chatId, 'Hello <b><i><u>❤️</u></i></b> :) Please Join Channel https://t.me/library_ci for notification !', {
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
    description: 'Orders  https://telegram-web-app-3.vercel.app/order ',
    handler: async (chatId) => {
      // Handle orders command
    }
  },
  category: {
    description: 'Category  command',
    handler: async (chatId) => {
      // Handle category command
      await bot.sendMessage(chatId, '📚 Category command executed! Go To ' + webAppUrlCategory);
    }
  },
  pay: {
    description: 'Pay command',
    handler: async (chatId) => {
      // Handle pay command
      await bot.sendMessage(chatId, '📚 Category command executed! Go To ' + webAppUrlPayment);
    }
  },
  carts: {
    description: 'Carts command',
    handler: async (chatId) => {
      // Handle carts command
      await bot.sendMessage(chatId, '🛒 Carts command executed!  https://telegram-web-app-3.vercel.app/order');
    }
  },
  help: {
    description: 'Help command - Show information about available commands',
    handler: async (chatId) => {
      const helpMessage = `
        ℹ️ <b>Available Commands:</b> ℹ️

        /start - Welcome message and links
        /orders - Handle orders
        /category - Handle category
        /pay - Handle pay
        /carts - Handle carts
        /help - Show this help message
      `;

      await bot.sendMessage(chatId, helpMessage, { parse_mode: 'HTML' });
    }
  }
};

// Gérer les messages du bot
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Vérifiez d'abord si msg.text est défini
  if (text && text.startsWith('/')) {
    const command = text.substring(1).toLowerCase();
    if (commands[command]) {
      await commands[command].handler(chatId);
    }
  }
});
