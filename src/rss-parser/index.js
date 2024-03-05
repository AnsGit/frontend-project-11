import axios from 'axios';

const parseXML = (xml) => {
  const parser = new DOMParser();
  return parser.parseFromString(xml, 'application/xml');
};

const parseRSS = (RSSNode) => {
  const title = RSSNode.querySelector('channel > title');
  const description = RSSNode.querySelector('channel > description');

  const items = [...RSSNode.querySelectorAll('channel > item')];

  return {
    title: title.textContent,
    description: description.textContent,
    posts: items.map((post) => {
      const postTitle = post.querySelector('title');
      const postLink = post.querySelector('link');

      return {
        title: postTitle.textContent,
        url: postLink.textContent,
      };
    }),
  };
};

export default (url, props = { timeout: 10000 }) => {
  const proxyUrl = 'https://allorigins.hexlet.app/get';

  const settings = {
    params: { charset: 'ISO-8859-1', disableCache: true, url },
  };

  const promise = new Promise((resolve, reject) => {
    const tm = setTimeout(reject, props.timeout, { code: 'ERR_TIMEOUT' });

    axios
      .get(proxyUrl, settings)
      .catch((error) => {
        clearTimeout(tm);
        reject(error);
      })
      .then((response) => {
        clearTimeout(tm);
        resolve(response);
      });
  });

  return promise
    .catch((err) => {
      const isUnknownError =
        !err.code || !['ERR_NETWORK', 'ERR_TIMEOUT'].includes(err?.code);

      throw !isUnknownError ? err : { code: 'ERR_UNKNOWN' };
    })
    .then((response) => {
      try {
        return parseXML(response.data.contents);
      } catch (err) {
        throw { code: 'ERR_XML' };
      }
    })
    .then((RSS) => {
      try {
        return parseRSS(RSS);
      } catch (error) {
        throw { code: 'ERR_RSS' };
      }
    });
};
