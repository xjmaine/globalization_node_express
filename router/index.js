import express from 'express';
import HomeController from '../controllers/home_controller.js';
import { getCurrencyCode } from '../utilities/currency_handler.js';

export default class IndexRouter {
  #router = express.Router();
  #homeController = new HomeController();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes = () => {
    // Home page route
    this.#router.get('/', this.#homeController.getHomeData);

    // API routes
    this.#router.get('/api/v1/locale', (req, res) => {
      const number = 1234567.89;
      const currencyAmount = 99.99;
      const locale = req.language ?? 'en-GH';
      const currencyCode = getCurrencyCode(locale);

      const formattedNumber = res.locals.intl.formatNumber(number, { maximumFractionDigits: 2 });
      const formattedCurrency = res.locals.intl.formatCurrency(currencyAmount, currencyCode);

      res.json({
        locale,
        greeting: req.t('greeting'),
        formattedNumber,
        formattedCurrency,
      });
    });
  };

  getRouter = () => this.#router;
}

export const router = new IndexRouter().getRouter();