const create = (props = {}) => {
  const element = document.createElement('li');
  element.classList.add('rss-post', 'list-group-item');
  element.id = props.ID;

  const link = document.createElement('a');

  link.href = props.url;
  link.target = '_blank';
  link.textContent = props.title;

  element.append(link);

  return { element, link };
};

export default create;
