import { Modal } from 'bootstrap';
import _ from 'lodash';
import create from './create.js';
import render from './render.js';
import './style.scss';

class RSSModal {
  constructor(props = { ID: 'rss-modal' }) {
    this.props = _.merge({}, props);
    this.create(props);

    return this;
  }

  getProp(key) {
    return this.props[key];
  }

  getElement() {
    return this.dom.element;
  }

  create(props = {}) {
    this.dom = create(props);

    this.modal = new Modal(this.dom.element);

    return this;
  }

  render(props) {
    render({ dom: this.dom, ...props });

    return this;
  }
}

export default RSSModal;
