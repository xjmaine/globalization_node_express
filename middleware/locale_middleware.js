export default {
  setLocale: (req, res, next) => {
    const locale = req.query.lang ?? req.get('Accept-Language')?.split(',')[0] ?? 'en-GH';
    try {
      req.language = locale;
      console.log(`Locale set to: ${locale}`);
      next();
    } catch (error) {
      console.error(`Error setting locale to ${locale}:`, error);
      next(error);
    }
  },
};