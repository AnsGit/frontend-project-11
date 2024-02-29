const render = ({ form, state = null, data = [], host = null }) => {
  // Append to host
  if (host !== null) host.append(form.view);

  const {
    group: { input },
    submit,
  } = form;

  input.label.textContent = 'Поиск';
  submit.textContent = 'Добавить';

  // Return if this is first render
  if (state === null) return;

  const [path, value, previousValue] = data;

  console.log(path, value, previousValue);

  if (state.status === 'processing') {
    input.view.disabled = false;
    submit.disabled = false;
    // ...
  }

  if (state.status === 'sending') {
    input.view.disabled = true;
    submit.disabled = true;
    // ...
  }
};

export default render;
