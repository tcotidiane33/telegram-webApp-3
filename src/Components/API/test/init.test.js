// eslint-disable-next-line no-undef
const { CinetPayConfig } = require('../models');
// eslint-disable-next-line no-undef
const { Cinetpay } = require('../cinetpay');

/* eslint-disable no-undef */
test('Init library', () => {
  const config = {
    apikey: '447088687629111c58c3573.70152188',
    site_id: 911501,
    notify_url: 'https://google.com/notify',
    return_url: 'https://youtube.com/return',
    lang: 'fr',
  };

  // eslint-disable-next-line no-undef
  expect(new Cinetpay(config));
});
