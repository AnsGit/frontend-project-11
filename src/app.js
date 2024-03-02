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
      feeds: [], // { url: '' }
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

    const [path, ...restDataValues] = data;
    const [pathKey, ...restPathKeys] = path.split('.');
    const restPath = restPathKeys.join('.');
    const restData = [restPath, ...restDataValues];

    if (pathKey === 'form') {
      this.form.render({ state: this.state.form, data: restData });
    }

    if (pathKey === 'feeds') {
      this.renderFeeds({ state: this.state.feeds, data: restData });
    }

    return this;
  }

  renderFeeds({ state, data }) {
    // ...
  }

  addFeed(url) {
    return new Promise((resolve) => {
      this.state.feeds.push({ url });
      resolve();
    });
  }

  subscribe() {
    this.form.subscribe({
      state: this.state.form,
      onInput: (value) => {
        // console.log('input: ', value);
      },
      onSubmit: (state) => {
        if (state.input.result.type !== 'success') return state;

        const isFeedExists = this.state.feeds.some(({ url }) => {
          return url === state.input.value;
        });

        if (isFeedExists) {
          state.input.result = {
            type: 'error',
            errors: ['a feed with this url already exists'],
          };

          return state;
        }

        return this.addFeed(state.input.value).then(() => {
          state.input.value = '';
          return state;
        });
      },
    });

    return this;
  }
}

export default App;
