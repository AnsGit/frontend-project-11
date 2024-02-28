export default () => {
  const container = document.querySelector('#app');

  const form = document.createElement('form');
  form.id = 'rss-form';

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('form-group');

  const inputLabel = document.createElement('label');
  inputLabel.for = 'text-input';
  inputLabel.textContent = 'Поиск';

  const input = document.createElement('input');

  input.type = 'text';
  input.classList.add('form-control');
  input.id = 'text-input';

  inputGroup.append(inputLabel, input);

  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.classList.add('btn', 'btn-primary');
  submit.textContent = 'Submit';

  form.append(inputGroup, submit);

  container.replaceChildren(form);

  // container.innerHTML = `
  //   <form>
  //     <div class="form-group">
  //       <label for="exampleInputEmail1">Email address</label>
  //       <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  //       <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  //     </div>
  //     <div class="form-group">
  //       <label for="exampleInputPassword1">Password</label>
  //       <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  //     </div>
  //     <div class="form-check">
  //       <input type="checkbox" class="form-check-input" id="exampleCheck1">
  //       <label class="form-check-label" for="exampleCheck1">Check me out</label>
  //     </div>
  //     <button type="submit" class="btn btn-primary">Submit</button>
  //   </form>
  // `;
};
