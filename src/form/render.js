import i18n from 'i18next';
import { STATUS } from './_data.js';

const clearInputFeedback = (input) => {
  input.element.classList.remove('is-invalid');

  while (true) {
    const nextSibling = input.element.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains('feedback')) {
      nextSibling.remove();
      continue;
    }

    break;
  }
};

const renderInputFeedback = (input, result) => {
  clearInputFeedback(input);

  const isError = Boolean(result?.type !== 'success');

  input.element.classList.toggle('is-invalid', isError);

  result.messages.forEach(({ key, values = {} }) => {
    const error = document.createElement('div');

    error.classList.add('feedback');
    error.classList.add(isError ? 'invalid-feedback' : 'valid-feedback');
    error.textContent = i18n.t(`rss-form.input.feedback.${key}`, values);

    input.element.after(error);
  });
};

const render = ({ form, state = null, data = [], host = null }) => {
  // Append to host
  if (host !== null) host.append(form.element);

  const {
    group: { input },
    submit,
  } = form;

  input.label.textContent = i18n.t('rss-form.input.label');
  input.element.placeholder = i18n.t('rss-form.input.placeholder');
  submit.value = i18n.t('rss-form.submit');

  // Return if this is first render
  if (state === null) return;

  const [path, value, previousValue] = data;

  console.log('NEW UPDATE:');
  console.log('-------------------------------');
  console.log(path, value, previousValue);
  console.log('-------------------------------');

  if (state.status === STATUS.PROCESSING) {
    input.element.disabled = false;
    submit.disabled = false;
    input.element.focus();
  }

  if ([STATUS.SENDING, STATUS.VALIDATING].includes(state.status)) {
    input.element.disabled = true;
    submit.disabled = true;
    // ...
  }

  if (path === 'input.value') {
    input.element.value = value;
  }

  if (path === 'input.result') {
    renderInputFeedback(input, value);
  }
};

export default render;
