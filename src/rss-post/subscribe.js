const subscribe = ({ dom, state = null }) => {
  const { button } = dom;

  button.addEventListener('click', () => {
    state.viewed = true;
  });
};

export default subscribe;
