import i18n from 'i18next';
import RSSFeed from '../rss-feed/index.js';
import RSSPost from '../rss-post/index.js';

const renderFeeds = ({ dom, feeds, data = [] }) => {
  dom.feeds.title.textContent = i18n.t('feeds');
  dom.feeds.element.prepend(dom.feeds.title);

  const [, , , applyData] = data;

  if (!['push', 'unshift'].includes(applyData.name)) return;

  // Add new feeds
  const feedsSettingsList = applyData.args;

  feedsSettingsList.forEach(({ ID, title, description }) => {
    const feed = new RSSFeed({ ID, title, description });

    feed.render({ host: dom.feeds.body, side: 'left' });
    feeds.push(feed);
  });
};

const renderPosts = (props = {}) => {
  const { dom, posts, modal, state = null, data = [] } = props;

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

  if (!['push', 'unshift'].includes(applyData.name)) return;

  // Add new feeds
  const postsSettingsList = applyData.args;

  postsSettingsList.forEach(({ ID, title, url }) => {
    const postIndex = posts.length;

    const post = new RSSPost({
      ID,
      title,
      url,
      modal: { ID: modal.getProp('ID') },
    });

    post.render({ host: dom.posts.body, side: 'left' });
    post.subscribe({ state: state.ui.posts[postIndex] });

    posts.push(post);
  });
};

const render = ({
  dom,
  form,
  modal,
  feeds,
  posts,
  state = null,
  data = [],
  host = null,
}) => {
  const isFirstRender = !data.length;

  if (isFirstRender) {
    modal.render({ host: document.body });

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
    renderFeeds({
      dom,
      feeds,
      state,
      data: restData,
    });
  }

  if (pathKey === 'posts') {
    renderPosts({
      dom,
      posts,
      modal,
      state,
      data: restData,
    });
  }

  const matchPath = path.match(/^ui\.posts\.(\d+)\.viewed$/);

  if (matchPath && data[1] === true) {
    const index = matchPath[1];

    const { title, description } = state.posts[index];

    modal.render({ title, description });
    posts[index].render({ viewed: true });
  }
};

export default render;
