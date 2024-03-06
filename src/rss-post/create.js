const create = (props = {}) => {
  const element = document.createElement('li');
  element.classList.add('rss-post', 'list-group-item');
  element.id = props.ID;

  const link = document.createElement('a');

  link.classList.add('fw-bold');
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
