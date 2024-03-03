import i18n from 'i18next';
import onChange from 'on-change';
import create from './create.js';
import render from './render.js';
import subscribe from './subscribe.js';
import Form from '../rss-form/index.js';

class App {
  constructor(host) {
    this.host = host;
    this.init();

    return this;
  }

  init() {
    this.initDOM();
    this.initState();

    return this;
  }

  initDOM() {
    this.dom = create();

    // Form
    this.form = new Form();

    return this;
  }

  initState() {
    const initialState = {
      form: Form.state(),
      feeds: [], // { url: '' }
    };

    this.state = onChange(initialState, this.render.bind(this));

    return this;
  }

  render(...data) {
    render({
      dom: this.dom,
      form: this.form,
      state: this.state,
      data,
      host: this.host,
    });

    return this;
  }

  subscribe() {
    subscribe({ form: this.form, state: this.state });

    return this;
  }
}

export default App;
