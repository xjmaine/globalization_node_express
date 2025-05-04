import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-node-fs-backend';
import { join } from 'path';

export default class I18nMiddleware {
  static async init() {
    await i18next
      .use(Backend)
      .use(i18nextMiddleware.LanguageDetector)
      .init({
        backend: {
          loadPath: join(__dirname, '../locales/{{lng}}.json'),
        },
        fallbackLng: 'en',
        preload: ['en', 'es', 'fr', 'en-GH'],
        detection: {
          order: ['querystring', 'cookie', 'header'],
          lookupQuerystring: 'lang',
        },
      });

    return i18nextMiddleware.handle(i18next);
  }
}