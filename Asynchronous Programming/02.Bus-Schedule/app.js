function solve() {
  let nextStop = `depot`;
  let currentStop = "Depot";
  const span = document.querySelector(`.info`);
  async function depart() {
    const url = `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`;
    const response = await fetch(url);
    const data = await response.json();
    span.textContent = `Next Stop ${data.name}`;
    nextStop = data.next;
    currentStop = data.name;
    console.log(nextStop);
    console.log(currentStop);
    document.querySelector(`#depart`).disabled = true;
    document.querySelector(`#arrive`).disabled = false;
  }

  function arrive() {
    span.textContent = `Arriving at ${currentStop}`;
    document.querySelector(`#depart`).disabled = false;
    document.querySelector(`#arrive`).disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
