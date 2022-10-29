const username = document.querySelector(`#username`);
const btn = document.querySelector(`.load`);

btn.addEventListener(`click`, () => {
  fetch(`https://api.github.com/users/${username.value}/repos`)
    .then(handleRespone)
    .then(handleData)
    .catch(handleError);

  function handleRespone(response) {
    console.log(response);
    if (response.ok == false) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  function handleData(data) {
    const ul = document.querySelector(`#repos`);
    const list = data.map((rep) => {
      const li = document.createElement(`li`);
      const a = document.createElement(`a`);
      a.href = rep.html_url;
      a.textContent = rep.full_name;
      li.appendChild(a);
      return li;
    });
    ul.replaceChildren(...list);
  }
  function handleError(error) {
    const ul = document.querySelector(`#repos`);
    ul.textContent = error.message;
  }
});
