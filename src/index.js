import i18n from 'i18next';
import locales from './locales/index.js';

import App from './app.js';
import './style.scss';

i18n
  .init({
    lng: 'ru',
    debug: true,
    resources: { ...locales },
  })
  .then(() => {
    const host = document.querySelector('#app');
    const app = new App(host);

    app.render().subscribe();
  });
