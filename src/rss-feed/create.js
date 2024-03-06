const create = (props = {}) => {
  const element = document.createElement('li');
  element.classList.add('rss-feed', 'list-group-item');
  element.id = props.ID;

  const title = document.createElement('div');
  title.classList.add('rss-feed__title');
  title.textContent = props.title;

  const description = document.createElement('div');
  description.classList.add('rss-feed__description');
  description.textContent = props.description;

  element.append(title, description);

  return { element, title, description };
};

export default create;
