export function getCurrencyCode(locale) {
  switch (locale) {
    case 'en-GH':
      return 'GHS';
    case 'en':
      return 'USD';
    case 'es':
    case 'fr':
      return 'EUR';
    default:
      return 'GHS';
  }
}