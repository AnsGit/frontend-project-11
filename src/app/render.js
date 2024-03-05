import i18n from 'i18next';
import RSSFeed from '../rss-feed/index.js';
import RSSPost from '../rss-post/index.js';

const renderFeeds = ({ dom, feeds, state = null, data = [] }) => {
  dom.feeds.title.textContent = i18n.t('feeds');
  dom.feeds.element.prepend(dom.feeds.title);

  const [, , , applyData] = data;

  let feedsSettingsList;

  // Add new feeds
  if (['push', 'unshift'].includes(applyData.name)) {
    feedsSettingsList = applyData.args;
  }
  // Add all feeds
  else {
    dom.feeds.innerHTML = '';
    feeds = [];
    feedsSettingsList = state.feeds;
  }

  feedsSettingsList.forEach(({ ID, title, description }) => {
    const feed = new RSSFeed({ ID, title, description });

    feed.render({ host: dom.feeds.body, side: 'left' });
    feeds.push(feed);
  });
};

const renderPosts = ({ dom, posts, state = null, data = [] }) => {
  dom.posts.title.textContent = i18n.t('posts');
  dom.posts.element.prepend(dom.posts.title);

  // // Remove non-exsistent posts
  // posts = posts.filter((post) => {
  //   const toRemovePost = state.posts.every((postState) => {
  //     return postState.url !== post.getProp('ID');
  //   });

  //   if (toRemovePost) {
  //     post.getElement().remove();
  //   }

  //   return !toRemovePost;
  // });

  const [, , , applyData] = data;

  let postsSettingsList;

  // Add new feeds
  if (['push', 'unshift'].includes(applyData.name)) {
    postsSettingsList = applyData.args;
  }
  // Add all feeds
  else {
    dom.posts.innerHTML = '';
    posts = [];
    postsSettingsList = state.posts;
  }

  postsSettingsList.forEach(({ ID, title, url }) => {
    const postIndex = posts.length;

    const post = new RSSPost({ ID, title, url });

    post.render({ host: dom.posts.body, side: 'left' });
    post.subscribe({ state: state.ui.posts[postIndex] });

    posts.push(post);
  });
};

const renderModal = ({ dom, posts, state, post: { index } }) => {
  const { title, description } = state.posts[index];

  dom.modal.title.textContent = title;
  dom.modal.body.textContent = description;
  dom.modal.button.textContent = i18n.t('close');

  posts[index].render({ viewed: true });
};

const render = ({
  dom,
  form,
  feeds,
  posts,
  state = null,
  data = [],
  host = null,
}) => {
  const isFirstRender = !data.length;

  if (isFirstRender) {
    document.body.append(dom.modal.element);

    host.append(dom.head, dom.body);
    host.classList.add('rss-agregator');

    form.render({ host: dom.head });

    return;
  }

  const [path, ...restDataValues] = data;
  const [pathKey, ...restPathKeys] = path.split('.');
  const restPath = restPathKeys.join('.');
  const restData = [restPath, ...restDataValues];

  if (pathKey === 'form') {
    form.render({ state: state.form, data: restData });
  }

  if (pathKey === 'feeds') {
    renderFeeds({ dom, feeds, state, data: restData });
  }

  if (pathKey === 'posts') {
    renderPosts({ dom, posts, state, data: restData });
  }

  const matchPath = path.match(/^ui\.posts\.(\d+)\.viewed$/);

  if (matchPath && data[1] === true) {
    const postIndex = matchPath[1];

    renderModal({ dom, posts, state, post: { index: postIndex } });
  }
};

export default render;
