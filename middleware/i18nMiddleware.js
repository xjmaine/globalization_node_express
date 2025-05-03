const i18n = require('i18n');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const path = require('path');

class I18nMiddleware {
  /*
  * configuration for the i18n
  * */
  constructor() {
    this.i18n = i18n;
    this.i18n.configure({
      locales: ['en', 'es', 'fr', 'en-GH'],
      directory: path.join(__dirname, '../locales'),
      defaultLocale: 'en',
      objectNotation: true,
      queryParameter: 'lang',
    });

    // i18next as fallback
    this.i18next = i18next;
    this.i18next.use(Backend).init({
      lng: 'en',
      fallbackLng: 'en',
      supportedLngs: ['en', 'es', 'fr', 'en-GH'],
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}.json'),
      },
    });
  }

  init() {
    return (req, res, next) => {
      // Initialize i18n
      this.i18n.init(req, res, () => {
        // Wrap res.__ to use i18next as fallback
        const original__ = res.__;
        res.__ = (key, options) => {
          let translation = original__(key, options);

          if (translation === key) {
            // Fallback to i18next if i18n fails
            translation = this.i18next.t(key, options);
          }
          return translation;
        };
        next();
      });
    };
  }
}

module.exports = new I18nMiddleware();