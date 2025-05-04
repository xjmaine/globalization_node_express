export default {
  setIntl: () => {
    return (req, res, next) => {
      try {
        const locale = req.language ?? req.i18n?.language ?? 'en-GH';
        res.locals.intl = {
          formatNumber: (number, options = {}) => new Intl.NumberFormat(locale, options).format(number),
          formatCurrency: (amount, currency) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount),
        };
        console.log(`Intl set for locale: ${locale}`);
        console.log('res.locals.intl:', res.locals.intl);
        next();
      } catch (error) {
        console.error(`Error in intl_middleware for locale ${req.language ?? 'unknown'}:`, error);
        // Ensure res.locals.intl is set even if an error occurs
        res.locals.intl = {
          formatNumber: (number, options = {}) => new Intl.NumberFormat('en-GH', options).format(number),
          formatCurrency: (amount, currency) => new Intl.NumberFormat('en-GH', { style: 'currency', currency }).format(amount),
        };
        console.log('res.locals.intl (fallback):', res.locals.intl);
        next();
      }
    };
  },
};