import i18n from 'i18next';

const render = ({ dom, host = null, viewed = false, side = 'right' }) => {
  if (viewed) {
    dom.link.classList.replace('fw-bold', 'fw-normal');
  }

  const parent = dom.element.parentElement;
  if ([parent, null].includes(host)) return;

  dom.button.textContent = i18n.t('view');

  host[side === 'left' ? 'prepend' : 'append'](dom.element);
};

export default render;
