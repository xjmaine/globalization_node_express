# 🌍 Internationalized Express App

This project is a minimal node-xpress app demonstrating internationalization (i18n) and localization (l10n) using middleware, with support for both JSON API and server-rendered views.

## ✅ Features

- Locale-aware text translation using `i18n`
- Number and currency formatting using `Globalize.js`
- Middleware structure for locale detection and formatting
- Dual output: JSON API and web view rendering
- Dynamic locale switching via query param (e.g., `?locale=en`)

## 📦 Stack

- Node.js + Express.js
- i18n + Globalize.js
- Pug template engine

## 🗂️ Folder Structure

├── app.js # Entry point
├── controllers/
│ └── HomeController.js
├── middleware/
│ ├── I18nMiddleware.js
│ ├── LocaleMiddleware.js
│ └── GlobalizeMiddleware.js
├── routes/
│ └── index.js
├── views/
│ └── index.pug
├── locales/
│ └── en-GH.json
└── README.md


## 🚀 Usage

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the app**
    ```bash
    node app.js
    ```

3. **Endpoints**

- Web view (HTML): http://localhost:3000/
- API JSON (auto-detected by Accept: application/json): http://localhost:3000/
- Locale test endpoint: http://localhost:3000/api/v1/locale

4. **Switch Locale**
   - Add ?locale=fr (or another supported locale) to any route:
   http://localhost:3000/?locale=en

**📝 Sample en-GH.json Locale File**
    
    {
      "greeting": "Hello, welcome to the app!",
      "user": {
        "welcome": "Welcome, {{name}}!"
      },
      "error": {
        "notFound": "The requested resource was not found.",
        "server": "An internal server error occurred."
      }
    }
   
