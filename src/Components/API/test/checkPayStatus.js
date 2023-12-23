// eslint-disable-next-line no-undef
const { CinetPayConfig } = require('../models');
// eslint-disable-next-line no-undef
const { Cinetpay } = require('../cinetpay');

test('Check payment status', () => {
  const config = {
    apikey: '447088687629111c58c3573.70152188',
    site_id: 911501,
    notify_url: 'https://google.com/notify',
    return_url: 'https://youtube.com/return',
    lang: 'fr',
  };

  // eslint-disable-next-line no-undef
  const cp = new Cinetpay(config);

  const uniqId = 'TEST_ID';
  cp.checkPayStatus(uniqId)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  expect(cp);
});
