const create = () => {
  // Form
  const element = document.createElement('form');
  element.method = 'post';
  element.id = 'rss-form';
  element.classList.add('rss-form');

  // Row
  const row = document.createElement('div');
  row.classList.add('row');

  // Cols
  const cols = ['col', 'col-auto'].map((cls) => {
    const col = document.createElement('div');
    col.classList.add(cls);
    return col;
  });

  row.append(...cols);

  // Inputs
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('form-group');
  inputGroup.classList.add('rss-form__group');

  const inputLabel = document.createElement('label');
  inputLabel.setAttribute('for', 'rss-form__link-input');

  const input = document.createElement('input');

  input.name = 'url';
  input.type = 'text';
  input.id = 'rss-form__link-input';
  input.classList.add('form-control');
  input.setAttribute('aria-label', 'url');

  inputGroup.append(inputLabel, input);
  cols[0].append(inputGroup);

  // Submit
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.classList.add('btn', 'btn-primary');

  cols[1].append(submit);

  // Build all
  element.append(row);

  return {
    element,
    row: { element: row, cols },
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
