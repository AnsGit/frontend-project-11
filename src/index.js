import App from './app.js';
import './style.scss';

const host = document.querySelector('#app');

const app = new App(host);

app.render().subscribe();
