const create = (props = {}) => {
  const element = document.createElement('div');
  element.classList.add('modal', 'fade', 'rss-modal');
  element.id = props.ID;

  const dialog = document.createElement('div');
  dialog.classList.add('modal-dialog');

  const content = document.createElement('div');
  content.classList.add('modal-content');

  const header = document.createElement('div');
  header.classList.add('modal-header');

  const title = document.createElement('h5');
  title.classList.add('modal-title');

  const body = document.createElement('div');
  body.classList.add('modal-body');

  const footer = document.createElement('div');
  footer.classList.add('modal-footer');

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn', 'btn-secondary');
  button.dataset.bsDismiss = 'modal';

  // Build dom
  header.append(title);
  footer.append(button);
  content.append(header, body, footer);
  dialog.append(content);
  element.append(dialog);

  return {
    element,
    dialog,
    content,
    header,
    body,
    footer,
    title,
    button,
  };
};

export default create;
