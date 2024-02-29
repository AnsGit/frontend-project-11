const subscribe = ({ form, state = null }) => {
  const {
    view,
    group: { input },
  } = form;

  input.view.addEventListener('input', (e) => {
    state.form.input.value = input.view.value;
  });

  view.addEventListener('submit', (e) => {
    console.log('Submit!');
    e.preventDefault();
  });
};

export default subscribe;
