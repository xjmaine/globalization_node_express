import { getCurrencyCode } from '../utilities/currency_handler.js';

export default class HomeController {
  getHomeData(req, res) {
    const number = 1234567.89;
    const amount = 99.99;
    const name = 'Freddie';

    // Globalize usage
    const formattedNumber = res.locals.globalize.formatNumber(number, { maximumFractionDigits: 2 });
    // const currencyCode = 'GHC';
    const currencyCode = getCurrencyCode(req.getLocale());
    const formattedCurrency = res.locals.globalize.formatCurrency(amount, currencyCode);

    const responseData = {
      greeting: req.__('greeting'),
      welcome: req.__('user.welcome', { name }),
      formattedNumber,
      formattedCurrency,
      locale: req.getLocale()
    };

    // Response
    const acceptHeader = req.get('Accept') || '';
    if (acceptHeader.includes('application/json')) {
      res.json(responseData);
    } else {
      res.render('index', {
        __: res.__,
        ...responseData
      });
    }
  }
}