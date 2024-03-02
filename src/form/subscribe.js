import { STATUS } from './_data.js';
import { object, string } from 'yup';

const formSchema = object({
  url: string().url().nonNullable(),
});

const validate = ({ state, formSchema, form }) => {
  const {
    element,
    group: { input },
  } = form;

  state.input.value = input.element.value;

  const formData = new FormData(element);
  const formDataObject = Object.fromEntries(formData.entries());

  state.status = STATUS.VALIDATING;

  return formSchema
    .validate(formDataObject)
    .then((result) => {
      state.input.result = { type: 'success' };
      return result;
    })
    .catch((data) => {
      state.input.result = { type: data.name, errors: data.errors };
    })
    .then((result) => {
      state.status = STATUS.PROCESSING;
    });
};

const subscribe = ({
  form,
  state = null,
  onInput = () => {},
  onSubmit = () => {},
}) => {
  const {
    element,
    group: { input },
  } = form;

  input.element.addEventListener('input', (e) => {
    validate({ state, formSchema, form });
    onInput(state.input.value);
  });

  element.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit(state.input.value);
  });
};

export default subscribe;
