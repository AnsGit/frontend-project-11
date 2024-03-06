import { object, string, setLocale } from 'yup';
import { STATUS, FEEDBACK } from '../const/index.js';

setLocale({
  string: {
    url: ({ value }) => ({ key: FEEDBACK.INVALID_URL, values: { url: value } }),
    min: ({ min }) => ({ key: FEEDBACK.SHORT_URL, values: { count: min } }),
  },
});

const RSSFormSchema = object({
  url: string().url().min(10),
});

const validate = ({ state, formSchema, form }) => {
  const {
    element,
    group: { input },
  } = form;

  input.element.value = input.element.value.trim();
  state.input.value = input.element.value;

  const formData = new FormData(element);
  const formDataObject = Object.fromEntries(formData.entries());

  state.status = STATUS.VALIDATING;

  return formSchema
    .validate(formDataObject)
    .then(() => {
      state.input.result = { type: STATUS.SUCCESS, messages: [] };
      return state;
    })
    .catch((data) => {
      state.input.result = { type: data.name, messages: [data.message] };
      return state;
    })
    .then(() => {
      state.status = STATUS.PROCESSING;
      return state;
    });
};

const subscribe = ({
  form,
  state = null,
  onInput = () => {},
  onSubmit = (...args) => Promise.resolve(...args),
}) => {
  const {
    element,
    group: { input },
  } = form;

  input.element.addEventListener('input', () => {
    onInput(state.input.value);
  });

  element.addEventListener('submit', (e) => {
    e.preventDefault();

    validate({ state, formSchema: RSSFormSchema, form })
      .then(() => {
        const isError = state.input.result.type !== STATUS.SUCCESS;

        if (isError) throw new Error('error-gap');
        return state;
      })
      .then(() => {
        state.status = STATUS.SENDING;
        return state;
      })
      .then(() => onSubmit(state).then(() => state))
      .then(() => {
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
