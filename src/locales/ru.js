export default {
  translation: {
    'rss-form': {
      input: {
        label: 'RSS адрес',
        placeholder: 'RSS адрес',
        feedback: {
          'invalid-url': 'адрес должен быть валидным',

          'short-url_one':
            'адрес должен содержать как минимум {{count}} символ',
          'short-url_few':
            'адрес должен содержать как минимум {{count}} символа',
          'short-url_many':
            'адрес должен содержать как минимум {{count}} символов',

          'existing-rss': 'feed с таким адресом уже существует',
          'rss-added': 'RSS добавлен!',
        },
      },
      submit: 'Добавить',
    },
  },
};
