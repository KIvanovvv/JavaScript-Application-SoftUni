const btnLoad = document.querySelector(`#loadBooks`);

btnLoad.addEventListener(`click`, getAllBooks);
document.querySelector(`form`).addEventListener(`submit`, (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const content = Object.fromEntries(form);
  if (
    e.target.querySelectorAll(`input`)[0].value == "" ||
    e.target.querySelectorAll(`input`)[1].value == ""
  ) {
    return;
  }
  addBooks(content);

  Array.from(e.target.querySelectorAll(`input`)).forEach(
    (el) => (el.value = "")
  );
});

async function addBooks(content) {
  const url = `http://localhost:3030/jsonstore/collections/books`;
  const { title, author } = content;
  const body = {
    title,
    author,
  };
  const options = headers("POST", body);
  const response = await fetch(url, options);
  const data = await response.json();
}

async function getAllBooks() {
  const url = `http://localhost:3030/jsonstore/collections/books`;
  const response = await fetch(url);
  const data = await response.json();
  const content = Object.values(data);
  const idArr = Object.keys(data);
  renderTable(content, idArr);
}

function renderTable(content, idArr) {
  const tbody = document.querySelector(`tbody`);
  tbody.innerHTML = "";
  content.forEach((el, i) => {
    const tr = document.createElement(`tr`);
    tr.setAttribute(`name`, idArr[i]);
    const tdTitle = document.createElement(`td`);
    tdTitle.textContent = el.title;
    const tdAuthor = document.createElement(`td`);
    tdAuthor.textContent = el.author;
    const tdBtns = document.createElement(`td`);
    const btnEdit = document.createElement(`button`);
    btnEdit.textContent = `Edit`;
    const btnDelete = document.createElement(`button`);
    btnDelete.textContent = `Delete`;
    tdBtns.replaceChildren(btnEdit, btnDelete);

    tr.replaceChildren(tdTitle, tdAuthor, tdBtns);
    tbody.appendChild(tr);

    btnDelete.addEventListener(`click`, (e) => {
      const id = e.target.parentElement.parentElement.getAttribute(`name`);
      deleteBook(id);
      e.target.parentElement.parentElement.remove();
    });

    btnEdit.addEventListener(`click`, (e) => {
      const id = e.target.parentElement.parentElement.getAttribute(`name`);
      document.querySelector(`h3`).textContent = `Edit FORM`;
      const btnSave = document.createElement(`button`);
      btnSave.textContent = `Save`;
      const btnSubmit = document.querySelector(`form button`);
      document.querySelector(`form`).appendChild(btnSave);
      btnSubmit.style.display = `none`;

      const inputTitle = document.querySelector(`input[name=title]`);
      inputTitle.value =
        e.target.parentElement.parentElement.children[0].textContent;
      const inputAuthor = document.querySelector(`input[name=author]`);
      inputAuthor.value =
        e.target.parentElement.parentElement.children[1].textContent;

      if (document.querySelector(`h3`).textContent == `Edit FORM`) {
        function eventHandler(e) {
          e.preventDefault();
          const title = inputTitle.value;
          const author = inputAuthor.value;
          const body = {
            title,
            author,
          };
          updateBook(id, body);
          inputAuthor.value = "";
          inputTitle.value = "";
          document.querySelector(`h3`).textContent = `FORM`;
          btnSubmit.style.display = `block`;
          btnSave.style.display = `none`;
        }
        btnSave.addEventListener(`click`, eventHandler);
      }
    });
  });
}

async function updateBook(id, body) {
  const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
  options = headers("PUT", body);
  const response = await fetch(url, options);
}

async function deleteBook(id) {
  const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
  const options = headers(`DELETE`, null);
  const response = await fetch(url, options);
  const data = await response.json();
}

function headers(meth, body) {
  return {
    method: `${meth}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
