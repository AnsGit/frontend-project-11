const create = (props = {}) => {
  const element = document.createElement('li');
  element.classList.add('rss-post', 'list-group-item', 'fw-bold');
  element.id = props.ID;

  const link = document.createElement('a');

  link.href = props.url;
  link.target = '_blank';
  link.textContent = props.title;

  const button = document.createElement('button');

  button.type = 'button';
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.dataset.id = props.ID;
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = `#${props.modal.ID}`;

  element.append(link, button);

  return { element, link, button };
};

export default create;
