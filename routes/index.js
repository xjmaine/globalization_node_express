import express from 'express';
import HomeController from '../controllers/home_controller.js';
import { getCurrencyCode } from '../utilities/currency_handler.js';

export default class IndexRouter {
  constructor() {
    this.router = express.Router();
    this.homeController = new HomeController();
    this.setupRoutes();
  }

    setupRoutes() {
    // Route for the homepage
    this.router.get('/', this.homeController.getHomeData.bind(this.homeController));

    // Locale debug/test route for locale and i18n middleware
    this.router.get('/locale', (req, res) => {
      const globalize = res.locals.globalize;

      const number = 1234567.89;
      const currencyAmount = 99.99;
      const locale = req.getLocale();

      const currencyCode = getCurrencyCode(locale);

      const formattedNumber = globalize.formatNumber(number, { maximumFractionDigits: 2 });
      const formattedCurrency = globalize.formatCurrency(currencyAmount, currencyCode);

      res.json({
        locale,
        greeting: res.__('greeting'),
        formattedNumber,
        formattedCurrency
      });
    });
  }

  getRouter() {
    return this.router;
  }
}

export const router = new IndexRouter().getRouter();