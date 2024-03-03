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
    items: items.map((item) => {
      const itemTitle = item.querySelector('title');
      const itemLink = item.querySelector('link');

      return {
        title: itemTitle.textContent,
        url: itemLink.textContent,
      };
    }),
  };
};

export default (url) => {
  const proxyUrl = 'https://allorigins.hexlet.app/get';
  const settings = { params: { charset: 'ISO-8859-1', url } };

  return axios
    .get(proxyUrl, settings)
    .catch((err) => {
      throw err?.code === 'ERR_NETWORK' ? err : { code: 'ERR_UNKNOWN' };
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
