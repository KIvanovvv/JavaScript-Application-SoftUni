async function getInfo() {
  const input = document.querySelector(`#stopId`);
  const ul = document.querySelector(`#buses`);
  const divName = document.querySelector(`#stopName`);

  let url = `http://localhost:3030/jsonstore/bus/businfo/${input.value}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    ul.innerHTML = "";
    divName.textContent = data.name;
    Object.entries(data.buses).forEach((el) => {
      const li = document.createElement(`li`);
      li.textContent = `Bus ${el[0]} arrives in ${el[1]} minute`;
      ul.appendChild(li);
    });
  } catch (err) {
    divName.textContent = `Error`;
    ul.innerHTML = "";
  }
}
