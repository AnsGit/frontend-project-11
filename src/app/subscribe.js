import _ from 'lodash';
import { FEEDBACK, STATUS } from '../const/index.js';
import requestRSS from '../rss-parser/index.js';

const addFeed = (url, state) => {
  return requestRSS(url).then((result) => {
    const feed = {
      url,
      ID: `feed-${_.uniqueId()}`,
      title: result.title,
      description: result.description,
    };

    const posts = result.posts.map(({ title, url }) => {
      return {
        ID: `post-${_.uniqueId()}`,
        feed: { ID: feed.ID },
        title,
        url,
      };
    });

    state.feeds.push(feed);
    state.posts.push(...posts);
  });
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
};

export default subscribe;
