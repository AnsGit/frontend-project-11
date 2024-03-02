import { STATUS } from './_data.js';

const clearInputFeedback = (input) => {
  input.element.classList.remove('is-invalid');

  while (true) {
    const nextSibling = input.element.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains('invalid-feedback')) {
      nextSibling.remove();
      continue;
    }

    break;
  }
};

const renderInputFeedback = (input, result) => {
  clearInputFeedback(input);

  const isError = Boolean(result?.errors?.length);

  if (!isError) return;

  input.element.classList.add('is-invalid');

  result.errors.forEach((text) => {
    const error = document.createElement('div');

    error.classList.add('invalid-feedback');
    error.textContent = text;

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

  input.label.textContent = 'Поиск';
  submit.value = 'Добавить';

  // Return if this is first render
  if (state === null) return;

  const [path, value, previousValue] = data;

  console.log(path, value, previousValue);

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

  if (path === 'input.result') {
    renderInputFeedback(input, value);
  }
};

export default render;
