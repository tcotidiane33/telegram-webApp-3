// eslint-disable-next-line no-undef
const { PaymentConfig, CinetPayConfig } = require('../models');
// eslint-disable-next-line no-undef
const { Cinetpay } = require('../cinetpay');

/* eslint-disable no-undef */
test('Make payment', () => {
  const config = {
    apikey: '447088687629111c58c3573.70152188',
    site_id: 911501,
    notify_url: 'https://google.com/notify',
    return_url: 'https://youtube.com/return',
    lang: 'fr',
  };

  // eslint-disable-next-line no-undef
  const cp = new Cinetpay(config);

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  const uniqId = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

  const payConfig = {
    transaction_id: uniqId,
    amount: 300,
    currency: 'XOF',
    channels: 'ALL',
    description: 'Test de paiement',
  };
  cp.makePayment(payConfig)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
  expect(cp);
});
