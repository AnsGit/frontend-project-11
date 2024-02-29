import onChange from 'on-change';
import Form from './form/index.js';

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
    // Main class
    const cls = 'rss-agregator';

    const head = document.createElement('div');
    head.classList.add(`${cls}__head`);

    const body = document.createElement('div');
    body.classList.add(`${cls}__body`);

    this.dom = { head, body };

    // Form
    this.form = new Form();

    return this;
  }

  initState() {
    const initialState = {
      form: Form.state(),
      feeds: [],
    };

    this.state = onChange(initialState, this.render.bind(this));

    return this;
  }

  render(...data) {
    const isFirstRender = !data.length;

    if (isFirstRender) {
      this.host.append(this.dom.head, this.dom.body);
      this.form.render({ host: this.dom.head });

      return this;
    }

    const [path] = data;
    const pathKey = path.split('.')[0];

    if (pathKey === 'form') {
      this.form.render({ state: this.state, data });
    }

    if (pathKey === 'feeds') {
      this.renderFeeds({ state: this.state, data });
    }

    return this;
  }

  renderFeeds({ state, data }) {
    // ...
  }

  subscribe() {
    this.form.subscribe({ state: this.state });

    return this;
  }
}

export default App;
