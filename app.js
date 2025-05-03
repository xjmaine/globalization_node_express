const express = require('express');
const path = require('path');
const I18nMiddleware = require('./middleware/I18nMiddleware');
const LocaleMiddleware = require('./middleware/LocaleMiddleware');
const GlobalizeMiddleware = require('./middleware/GlobalizeMiddleware');
const indexRouter = require('./routes/index');
const HomeController = require('./controllers/HomeController');

class App {
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
    this.app.set('views', path.join(__dirname, 'views'));
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

module.exports = new App().getApp();