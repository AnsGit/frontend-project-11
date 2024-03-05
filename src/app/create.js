import { Modal } from 'bootstrap';

const createModal = () => {
  const element = document.createElement('div');
  element.classList.add('modal', 'fade');
  element.id = 'rss-modal';

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

  const instance = new Modal(element);

  return {
    instance,
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

const create = () => {
  // Main class
  const cls = 'rss-agregator';

  // Head
  const head = document.createElement('div');
  head.classList.add(`${cls}__head`);

  // Body
  const body = document.createElement('div');
  body.classList.add(`${cls}__body`, 'row', 'justify-content-md-center');

  // Posts col
  const posts = document.createElement('div');
  posts.classList.add(`${cls}__body__posts`, 'col');

  const postsTitle = document.createElement('h1');
  postsTitle.classList.add('display-6');

  const postsBody = document.createElement('ul');
  postsBody.classList.add(
    `${cls}__body__posts__body`,
    'list-group',
    'list-group-flush',
  );

  // Feeds col
  const feeds = document.createElement('div');
  feeds.classList.add(`${cls}__body__feeds`, 'col');

  const feedsTitle = document.createElement('h1');
  feedsTitle.classList.add('display-6');

  const feedsBody = document.createElement('ul');
  feedsBody.classList.add(`${cls}__body__feeds__body`, 'list-group');

  posts.append(postsBody);
  feeds.append(feedsBody);

  body.append(posts, feeds);

  // Modal
  const modal = createModal();

  return {
    head,
    body,
    posts: { element: posts, title: postsTitle, body: postsBody },
    feeds: { element: feeds, title: feedsTitle, body: feedsBody },
    modal,
  };
};

export default create;
