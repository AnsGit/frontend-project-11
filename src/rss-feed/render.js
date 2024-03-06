const render = ({ dom, host = null, side = 'right' }) => {
  if (dom.element.parentElement === host) return;

  host[side === 'left' ? 'prepend' : 'append'](dom.element);
};

export default render;
