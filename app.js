import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import i18n_middleware from './middleware/i18n_middleware.js';
import locale_middleware from './middleware/locale_middleware.js';
import globalize_middleware from './middleware/globalize_middleware.js';
import { router as indexRouter } from './routes/index.js';
import HomeController from './controllers/home_controller.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    this.app.use(i18n_middleware.init());
    this.app.use(locale_middleware.setLocale());
    this.app.use(globalize_middleware.setGlobalize());
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