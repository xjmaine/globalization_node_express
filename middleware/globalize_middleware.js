import Globalize from 'globalize';
import cldrData from 'cldr-data';

export default class GlobalizeMiddleware {
  static setGlobalize() {
    Globalize.load(cldrData.entireMainFor('en', 'es', 'fr', 'en-GH'));
    return (req, res, next) => {
      const locale = req.getLocale() || 'en';
      res.locals.globalize = Globalize(locale);
      next();
    };
  }
}