export default {
  translation: {
    'rss-form': {
      input: {
        label: 'RSS url',
        placeholder: 'RSS url',
        feedback: {
          'invalid-url': 'url must be a valid URL',

          'short-url_one': 'url must be at least {{count}} character',
          'short-url_other': 'url must be at least {{count}} characters',

          'existing-rss': 'a feed with this url already exists',
          'rss-added': 'RSS added!',
        },
      },
      submit: 'Add',
    },
  },
};
