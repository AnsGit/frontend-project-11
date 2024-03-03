import { STATUS, FEEDBACK } from './_data.js';
import { object, string, setLocale } from 'yup';

setLocale({
  string: {
    url: ({ value }) => ({ key: FEEDBACK.INVALID_URL, values: { url: value } }),
    min: ({ min }) => ({ key: FEEDBACK.SHORT_URL, values: { count: min } }),
  },
});

const formSchema = object({
  url: string().url().min(10),
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
      state.input.result = { type: 'success', messages: [] };
      return state;
    })
    .catch((data) => {
      state.input.result = { type: data.name, messages: [data.message] };
      return state;
    })
    .then((result) => {
      state.status = STATUS.PROCESSING;
      return state;
    });
};

const subscribe = ({
  form,
  state = null,
  onInput = () => {},
  onSubmit = (state) => new Promise((resolve) => resolve(state)),
}) => {
  const {
    element,
    group: { input },
  } = form;

  input.element.addEventListener('input', (e) => {
    onInput(state.input.value);
  });

  element.addEventListener('submit', (e) => {
    e.preventDefault();

    validate({ state, formSchema, form })
      .then((state) => {
        const isError = state.input.result.type !== 'success';

        if (isError) throw new Error('error-gap');
        return state;
      })
      .then((state) => {
        state.status = STATUS.SENDING;
        return state;
      })
      .then((state) => {
        return onSubmit(state);
      })
      .then((state) => {
        state.status = STATUS.PROCESSING;
        return state;
      })
      .catch((error) => {
        if (error.message !== 'error-gap') throw error;

        return state;
      });
  });
};

export default subscribe;
