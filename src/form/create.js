const create = () => {
  const view = document.createElement('form');
  view.id = 'rss-form';
  view.classList.add('rss-form');

  // Inputs
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('rss-form__group');

  const inputLabel = document.createElement('label');
  inputLabel.for = 'rss-form__link-input';

  const input = document.createElement('input');

  input.type = 'text';
  input.id = 'rss-form__link-input';
  input.classList.add('form-control');

  inputGroup.append(inputLabel, input);

  // Submit
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.classList.add('btn', 'btn-primary');

  // Build all
  view.append(inputGroup, submit);

  return {
    view,
    group: {
      view: inputGroup,
      input: { view: input, label: inputLabel },
    },
    submit,
  };
};

export default create;
