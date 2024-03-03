const create = () => {
  // Main class
  const cls = 'rss-agregator';

  // Head
  const head = document.createElement('div');
  head.classList.add(`${cls}__head`);

  // Body
  const body = document.createElement('div');
  body.classList.add(`${cls}__body`, 'row');

  // Posts col
  const posts = document.createElement('div');
  posts.classList.add(`${cls}__body__posts`, 'col');

  const postsTitle = document.createElement('h1');

  // Feeds col
  const feeds = document.createElement('div');
  feeds.classList.add(`${cls}__body__feeds`, 'col');

  const feedsTitle = document.createElement('h1');

  posts.append(postsTitle);
  feeds.append(feedsTitle);

  body.append(posts, feeds);

  return {
    head,
    body,
    posts: { element: posts, title: postsTitle },
    feeds: { element: feeds, title: feedsTitle },
  };
};

export default create;
