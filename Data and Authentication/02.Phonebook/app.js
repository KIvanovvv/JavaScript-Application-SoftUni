function attachEvents() {
  const btnLoad = document.querySelector(`#btnLoad`);
  const btnCreate = document.querySelector(`#btnCreate`);
  const ul = document.querySelector(`#phonebook`);

  btnLoad.addEventListener(`click`, updateInfo);
  btnCreate.addEventListener(`click`, () => {
    const personEl = document.querySelector(`#person`);
    const phoneEl = document.querySelector(`#phone`);
    postInfo(personEl.value, phoneEl.value);
    updateInfo();
    personEl.value = "";
    phoneEl.value = "";
  });

  async function deleteInfo(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }

  async function postInfo(person, phone) {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ person, phone }),
    });
    const data = await response.json();
  }

  async function updateInfo() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    ul.innerHTML = "";
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();

    Object.values(data).forEach((el) => renderUl(el.person, el.phone, el._id));
  }

  function renderUl(person, phone, id) {
    const li = document.createElement(`li`);
    li.textContent = `${person}: ${phone}`;
    li.setAttribute(`name`, `${id}`);
    const btnDelete = document.createElement(`button`);
    btnDelete.textContent = `Delete`;
    li.appendChild(btnDelete);
    ul.appendChild(li);

    btnDelete.addEventListener(`click`, (e) => {
      const id = e.target.parentElement.getAttribute(`name`);
      deleteInfo(id);
      e.target.parentElement.remove();
    });
  }
}

attachEvents();
