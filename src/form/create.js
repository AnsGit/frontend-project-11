const create = () => {
  const element = document.createElement('form');
  element.method = 'post';
  element.id = 'rss-form';
  element.classList.add('rss-form');

  // Inputs
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('rss-form__group');

  const inputLabel = document.createElement('label');
  inputLabel.for = 'rss-form__link-input';

  const input = document.createElement('input');

  input.name = 'url';
  input.type = 'text';
  input.id = 'rss-form__link-input';
  input.classList.add('form-control');

  inputGroup.append(inputLabel, input);

  // Submit
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.classList.add('btn', 'btn-primary');

  // Build all
  element.append(inputGroup, submit);

  return {
    element,
    group: {
      element: inputGroup,
      input: {
        element: input,
        label: inputLabel,
      },
    },
    submit,
  };
};

export default create;
