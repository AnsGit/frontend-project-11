import _ from 'lodash';
import { FEEDBACK, STATUS } from '../const/index.js';
import requestRSS from '../rss-parser/index.js';

const addFeed = (url, state) => {
  const rssResult = requestRSS(url).then((result) => {
    const feed = state.feeds.find((feedState) => feedState.url === url);

    let feedID;

    if (feed !== undefined) {
      // Use existing feed
      feedID = feed.ID;
    }
    else {
      // Save new feed
      feedID = `feed-${_.uniqueId()}`;

      const newFeed = {
        ID: feedID,
        url,
        title: result.title,
        description: result.description,
      };

      state.feeds.push(newFeed);
    }

    const posts = result.posts
      .filter((data) => {
        const isPostExists = state.posts.every(
          (postState) => postState.url !== data.url,
        );

        return isPostExists;
      })
      .map((data) => {
        const postState = {
          ID: `post-${_.uniqueId()}`,
          url: data.url,
          title: data.title,
          description: data.description,
          feed: { ID: feedID },
        };

        return postState;
      });

    const postsUiStates = posts.map(() => ({ viewed: false }));
    state.ui.posts.push(...postsUiStates);

    state.posts.push(...posts);
  });

  return rssResult;
};

const observeFeeds = (state, props = { interval: 5000 }) => {
  setTimeout(() => {
    const promises = state.feeds.map(({ url }) => addFeed(url, state));

    Promise.all(promises)
      .catch(() => observeFeeds(state, props))
      .then(() => observeFeeds(state, props));
  }, props.interval);
};

const subscribe = ({ form, state = null }) => {
  form.subscribe({
    state: state.form,
    onInput: () => {
      // console.log('input: ', value);
    },
    onSubmit: (fState) => {
      if (fState.input.result.type !== STATUS.SUCCESS) return fState;

      const isFeedExists = state.feeds.some(
        ({ url }) => url === fState.input.value,
      );

      if (isFeedExists) {
        fState.input.result = {
          type: 'error',
          messages: [{ key: FEEDBACK.EXISTING_RSS }],
        };

        return Promise.resolve(fState);
      }

      return addFeed(fState.input.value, state)
        .then(() => {
          fState.input.value = '';

          fState.input.result = {
            type: STATUS.SUCCESS,
            messages: [{ key: FEEDBACK.RSS_ADDED }],
          };

          return fState;
        })
        .catch((err) => {
          fState.input.result = {
            type: STATUS.ERROR,
            messages: [{ key: FEEDBACK[err.code] }],
          };

          return fState;
        });
    },
  });

  observeFeeds(state);
};

export default subscribe;
