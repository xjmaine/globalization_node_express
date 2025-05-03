const {getCurrencyCode} = require('../utilities/localeUtils')

class HomeController {
  getHomeData(req, res) {
    const number = 1234567.89;
    const amount = 99.99;
    const name = 'Freddie';

    // Globalize usage
    const formattedNumber = res.locals.globalize.formatNumber(number, { maximumFractionDigits: 2 });
    // const currencyCode = 'GHS'; // Base currency for all locales
    const currencyCode = getCurrencyCode(req.getLocale());
    const formattedCurrency = res.locals.globalize.formatCurrency(amount, currencyCode)

    const responseData = {
      greeting: req.__('greeting'),
      welcome: req.__('user.welcome', { name }),
      formattedNumber,
      formattedCurrency,
      locale: req.getLocale()
    };

    //response
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

module.exports = HomeController;