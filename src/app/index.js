import onChange from 'on-change';
import create from './create.js';
import render from './render.js';
import subscribe from './subscribe.js';
import RSSForm from '../rss-form/index.js';
import RSSModal from '../rss-modal/index.js';
import './style.scss';

class App {
  constructor(host) {
    this.host = host;
    this.init();
  }

  init() {
    this.initDOM();
    this.initState();

    return this;
  }

  initDOM() {
    this.dom = create();

    // Form
    this.form = new RSSForm();

    // Modal
    this.modal = new RSSModal();

    this.feeds = [];
    this.posts = [];

    return this;
  }

  initState() {
    const initialState = {
      form: RSSForm.state(),
      feeds: [], // { ID: '', title: '', description: '', url: '' }
      posts: [], // { ID: '', feedID: '', title: '', url: '' }
      ui: {
        posts: [], // { viewed: false }
      },
    };

    this.state = onChange(initialState, this.render.bind(this));

    return this;
  }

  render(...data) {
    render({
      dom: this.dom,
      form: this.form,
      feeds: this.feeds,
      posts: this.posts,
      modal: this.modal,
      state: this.state,
      data,
      host: this.host,
    });

    return this;
  }

  subscribe() {
    subscribe({ form: this.form, modal: this.modal, state: this.state });

    return this;
  }
}

export default App;
