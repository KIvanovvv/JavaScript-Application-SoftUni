function solve() {
  getInfo();

  const form = document.querySelector(`#form`);
  form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newStudent = Object.fromEntries(data);
    addNewStudent(newStudent);
    Array.from(document.querySelector(`.inputs`).children).forEach(
      (el) => (el.value = "")
    );
  });

  async function addNewStudent(newStudent) {
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const { firstName, lastName, facultyNumber, grade } = newStudent;
    const body = {
      firstName,
      lastName,
      facultyNumber,
      grade,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    getInfo();
  }

  async function getInfo() {
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const response = await fetch(url);
    const data = await response.json();
    const content = Object.values(data);
    renderTable(content);
  }

  function renderTable(content) {
    const tbody = document.querySelector(`tbody`);
    tbody.innerHTML = "";
    content.forEach((el) => {
      const tr = document.createElement(`tr`);
      tr.setAttribute(`name`, el._id);
      const td1 = document.createElement(`td`);
      td1.textContent = el.firstName;
      const td2 = document.createElement(`td`);
      td2.textContent = el.lastName;
      const td3 = document.createElement(`td`);
      td3.textContent = el.facultyNumber;
      const td4 = document.createElement(`td`);
      td4.textContent = el.grade;
      tr.replaceChildren(td1, td2, td3, td4);
      tbody.appendChild(tr);
    });
  }
}
solve();
