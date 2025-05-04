import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import i18n_middleware from './middleware/i18n_middleware.js';
import locale_middleware from './middleware/locale_middleware.js';
import intl_middleware from './middleware/intl_middleware.js';
import { router as indexRouter } from './router/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function App() {
  const app = express();

  // Configuration
  app.set('view engine', 'pug');
  app.set('views', join(__dirname, 'views'));

  // Middleware
  app.use(express.json());

  const i18nMiddleware = await i18n_middleware.init();
  app.use(i18nMiddleware);

  app.use(locale_middleware.setLocale);

  const intlMiddleware = intl_middleware.setIntl();
  app.use(intlMiddleware);

  // Routes
  app.use(indexRouter);

  return app;
}
