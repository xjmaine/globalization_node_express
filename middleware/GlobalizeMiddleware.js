const Globalize = require('globalize');
const cldrData = require('cldr-data');

class GlobalizeMiddleware {
  constructor() {
    // Load CLDR data for Globalize
    Globalize.load(cldrData.entireSupplemental());
    // Globalize.load(cldrData.entireMainFor('en', 'es', 'fr', 'en-GH'));
    Globalize.load(
        ...['en', 'es', 'fr', 'en-GH'].map(locale => cldrData.entireMainFor(locale))
    )
  }

  setGlobalize() {
    return (req, res, next) => {
      res.locals.globalize = Globalize(req.getLocale() || 'en');
      next();
    };
  }
}

module.exports = new GlobalizeMiddleware();