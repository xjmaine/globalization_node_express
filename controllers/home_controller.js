import { getCurrencyCode } from '../utilities/currency_handler.js';

export default class HomeController {
  getHomeData = (req, res) => {
    const number = 1234567.89;
    const amount = 99.99;
    const name = 'Freddie';

    const locale = req.language ?? 'en-GH';
    const currencyCode = getCurrencyCode(locale);

    // Ensure res.locals.intl is available
    if (!res.locals.intl) {
      console.error('Intl is not set in res.locals');
      res.status(500).send('Internal Server Error');
      return;
    }

    const formattedNumber = res.locals.intl.formatNumber(number, { maximumFractionDigits: 2 });
    const formattedCurrency = res.locals.intl.formatCurrency(amount, currencyCode);

    const responseData = {
      greeting: req.t('greeting'),
      welcome: req.t('user.welcome', { name }),
      formattedNumber,
      formattedCurrency,
      locale,
    };

    const acceptHeader = req.get('Accept') ?? '';
    if (acceptHeader.includes('application/json')) {
      res.json(responseData);
    } else {
      res.render('index', {
        t: req.t,
        ...responseData,
      });
    }
  };
}