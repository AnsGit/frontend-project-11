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

  return {
    head,
    body,
    posts: { element: posts, title: postsTitle, body: postsBody },
    feeds: { element: feeds, title: feedsTitle, body: feedsBody },
  };
};

export default create;
