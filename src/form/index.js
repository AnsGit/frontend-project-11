import render from './render.js';
import create from './create.js';
import subscribe from './subscribe.js';
import './style.scss';

class Form {
  constructor() {
    this.create();

    return this;
  }

  create() {
    this.dom = create();

    return this;
  }

  render({ state = null, data = [], host = null }) {
    render({ form: this.dom, state, data, host });

    return this;
  }

  subscribe({ state = null }) {
    subscribe({ form: this.dom, state });

    return this;
  }

  static state() {
    return {
      status: 'processing',
      input: { value: '' },
    };
  }
}

export default Form;
