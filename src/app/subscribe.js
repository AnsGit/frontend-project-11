import _ from 'lodash';
import { FEEDBACK, STATUS } from '../const/index.js';
import requestRSS from '../rss-parser/index.js';

const addFeed = (url, state) => {
  return requestRSS(url).then((result) => {
    const feed = state.feeds.find((feedState) => feedState.url === url);

    let feedID;

    // Use existing feed
    if (feed !== undefined) {
      feedID = feed.ID;
    }
    // Save new feed
    else {
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
        return state.posts.every((postState) => postState.url !== data.url);
      })
      .map(({ title, description, url }) => {
        return {
          ID: `post-${_.uniqueId()}`,
          url,
          title,
          description,
          feed: { ID: feedID },
        };
      });

    state.ui.posts.push(
      ...posts.map((p) => {
        return { viewed: false };
      }),
    );

    state.posts.push(...posts);
  });
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
    onInput: (value) => {
      // console.log('input: ', value);
    },
    onSubmit: (fState) => {
      if (fState.input.result.type !== STATUS.SUCCESS) return fState;

      const isFeedExists = state.feeds.some(({ url }) => {
        return url === fState.input.value;
      });

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
