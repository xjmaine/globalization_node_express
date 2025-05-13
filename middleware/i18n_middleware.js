import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-node-fs-backend';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  init: async () => {
    try {
      await i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
          backend: {
            loadPath: join(__dirname, '../locales/{{lng}}.json'),
          },
          fallbackLng: 'en-GH',
          preload: ['en-GH', 'en'],
          detection: {
            order: ['querystring', 'cookie', 'header'],
            lookupQuerystring: 'lang',
          },
        });
      console.log('i18next initialized successfully with languages:', i18next.languages);
      return i18nextMiddleware.handle(i18next);
    } catch (error) {
      console.error('Failed to initialize i18next:', error);
      throw error;
    }
  },
};