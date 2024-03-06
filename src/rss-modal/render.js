import i18n from 'i18next';

const render = ({
  dom,
  host = null,
  title = '',
  description = '',
}) => {
  if (host !== null) host.append(dom.element);

  dom.title.textContent = title;
  dom.body.textContent = description;
  dom.button.textContent = i18n.t('close');
};

export default render;
