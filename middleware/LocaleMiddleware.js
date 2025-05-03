class LocaleMiddleware {
  setLocale() {
    return (req, res, next) => {
      let locale = req.query.lang || req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en';
      if (!['en', 'es', 'fr', 'en-GH'].includes(locale)) locale = 'en';
      req.setLocale(locale);
      next();
    };
  }
}

module.exports = new LocaleMiddleware();