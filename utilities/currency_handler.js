export const getCurrencyCode = (locale) => {
  const currencyCodes = {
    'en-GH': 'GHS',
    'en': 'USD',
    'es': 'EUR',
    'fr': 'EUR',
  };
  return currencyCodes[locale] || 'GHS';
};