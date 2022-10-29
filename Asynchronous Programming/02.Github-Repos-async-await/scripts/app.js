async function solve() {
  const username = document.querySelector(`#username`);
  try {
    const response = await fetch(
      `https://api.github.com/users/${username.value}/repos`
    );
    if (response.ok == false) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
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
  } catch (err) {
    const ul = document.querySelector(`#repos`);
    ul.textContent = err.message;
  }
}
