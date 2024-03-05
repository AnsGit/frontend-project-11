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

  // Remove non-exsistent posts
  posts = posts.filter((post) => {
    const toRemovePost = state.posts.every((postState) => {
      return postState.url !== post.getProp('ID');
    });

    if (toRemovePost) {
      post.getElement().remove();
    }

    return !toRemovePost;
  });

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
    const post = new RSSPost({ ID, title, url });

    post.render({ host: dom.posts.body, side: 'left' });
    posts.push(post);
  });
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
};

export default render;
