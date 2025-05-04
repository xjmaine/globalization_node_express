import express from 'express';
import { join } from 'path';
import I18nMiddleware from './middleware/i18n_middleware.js';
import LocaleMiddleware from './middleware/locale_middleware.js';
import GlobalizeMiddleware from './middleware/globalize_middleware.js';
import indexRouter from './routes/index.js';
import HomeController from './controllers/home_controller.js';

export default class App {
  // const BASE_URL = process.env.BASE_URL;
   constructor() {
    this.app = express();
    this.homeController = new HomeController();
    this.configure();
    this.middlewares();
    this.ctlRoutes();
  }


  configure() {
    this.app.set('view engine', 'pug'); // optional for views...comment out for API
    this.app.set('views', join(__dirname, 'views'));
  }

  // middleware initialization
  middlewares() {
    this.app.use(express.json());
    this.app.use(I18nMiddleware.init());
    this.app.use(LocaleMiddleware.setLocale());
    this.app.use(GlobalizeMiddleware.setGlobalize());
  }

 ctlRoutes() {
    this.app.use('/api/v1', indexRouter);
    this.app.get('/', this.homeController.getHomeData.bind(this.homeController));
  }

  getApp() {
    return this.app;
  }
}

export const app = new App().getApp();