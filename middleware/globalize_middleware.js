import Globalize from 'globalize';
import cldrData from 'cldr-data';

export default {
  setGlobalize: async () => {
    try {
      const supportedLocales = ['en', 'es', 'fr', 'en-GH'];
      for (const locale of supportedLocales) {
        const numbersJson = await import(`cldr-data/main/${locale}/numbers.json`);
        Globalize.load(numbersJson.default);
      }

      console.log('Globalize CLDR data loaded successfully');

      return (req, res, next) => {
        try {
          const locale = req.language ?? req.i18n?.language ?? 'en-GH';
          if (!supportedLocales.includes(locale)) {
            console.warn(`Unsupported locale: ${locale}, falling back to 'en-GH'`);
            res.locals.globalize = new Globalize('en-GH');
            return next();
          }
          res.locals.globalize = new Globalize(locale);
          console.log(`Globalize set for locale: ${locale}`);
          next();
        } catch (error) {
          console.error(`Error in globalize_middleware for locale ${req.language ?? 'unknown'}:`, error);
          res.locals.globalize = new Globalize('en-GH');
          next();
        }
      };
    } catch (error) {
      console.error('Failed to load Globalize CLDR data:', error);
      throw error;
    }
  },
};