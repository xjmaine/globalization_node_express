export default class LocaleMiddleware {
  static setLocale() {
    return (req, res, next) => {
      const locale = req.query.lang || req.get('Accept-Language')?.split(',')[0] || 'en';
      req.setLocale(locale);
      next();
    };
  }
}