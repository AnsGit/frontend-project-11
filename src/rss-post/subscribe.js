const subscribe = ({ dom, state = null }) => {
  const { button } = dom;

  button.addEventListener('click', (e) => {
    state.viewed = true;
  });
};

export default subscribe;
