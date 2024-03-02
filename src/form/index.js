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

  render(props) {
    render({ form: this.dom, ...props });

    return this;
  }

  subscribe(props) {
    subscribe({ form: this.dom, ...props });

    return this;
  }

  static state() {
    return {
      status: 'processing',
      input: {
        value: '',
        result: { type: '', errors: '' },
      },
    };
  }
}

export default Form;
