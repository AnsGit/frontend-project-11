import i18n from 'i18next';

const renderFeeds = ({ dom, state = null, data = [] }) => {
  // ...
};

const render = ({ dom, form, state = null, data = [], host = null }) => {
  dom.posts.title.textContent = i18n.t('posts');
  dom.feeds.title.textContent = i18n.t('feeds');

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
    renderFeeds({ dom, state: state.feeds, data: restData });
  }
};

export default render;
