async function loadCommits() {
  const username = document.querySelector(`#username`);
  const repo = document.querySelector(`#repo`);
  const ul = document.querySelector(`#commits`);
  try {
    const res = await fetch(
      `https://api.github.com/repos/${username.value}/${repo.value}/commits`
    );

    if (res.ok == false) {
      throw new Error(`Error ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    const list = data.map((res) => {
      const li = document.createElement(`li`);
      li.textContent = `${res.commit.author.name}: ${res.commit.message}`;
      return li;
    });
    ul.replaceChildren(...list);
  } catch (err) {
    const li = document.createElement(`li`);
    li.textContent = err.message;
    ul.replaceChildren(li);
  }
}
