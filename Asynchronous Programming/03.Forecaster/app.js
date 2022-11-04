function attachEvents() {
  const btnSubmit = document.querySelector(`#submit`);
  const input = document.querySelector(`#location`);
  const divForecast = document.querySelector(`#forecast`);
  const divCurrent = document.querySelector(`#current`);
  const divUpcoming = document.querySelector(`#upcoming`);

  const symbols = {
    Sunny: `&#x2600`, // ☀

    PartlySunny: `&#x26C5`, //⛅

    Overcast: `&#x2601`, // ☁

    Rain: `&#x2614`, // ☂

    Degrees: `\u00B0`, // °
  };

  btnSubmit.addEventListener(`click`, getCityInfo);

  async function getCityInfo() {
    const url = `http://localhost:3030/jsonstore/forecaster/locations/`;
    try {
      const response = await fetch(url);

      const data = await response.json();
      const currentCity = data.find((el) => el.name === `${input.value}`);
      const { code, name } = currentCity;
      divForecast.style.display = `block`;
      divForecast.children[0].innerHTML = `<div class="label">Current conditions</div>`;
      divForecast.children[1].innerHTML = `<div class="label">Three-day forecast</div>`;
      //Napravi array i iztrii vsichko bez label
      displayToday(code, name);
      displayUpcoming(code, name);
    } catch (err) {
      divForecast.textContent = `Error`;
      divForecast.style.display = `block`;
    }
  }
  async function displayToday(code, name) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const response = await fetch(url);
    const data = await response.json();
    const { condition, high, low } = data.forecast;
    console.log(condition);
    const spanSymbol = document.createElement(`span`);
    const spanCondition = document.createElement(`span`);
    const span1 = document.createElement(`span`);
    const span2 = document.createElement(`span`);
    const span3 = document.createElement(`span`);

    spanSymbol.className = `condition symbol`;
    spanSymbol.innerHTML = symbols[condition];
    divCurrent.appendChild(spanSymbol);

    spanCondition.className = `condition`;
    span1.className = `forecast-data`;
    span1.textContent = `${data.name}`;

    span2.className = `forecast-data`;
    span2.textContent = `${low}${symbols.Degrees}/${high}${symbols.Degrees}`;

    span3.className = `forecast-data`;
    span3.textContent = `${condition}`;

    spanCondition.replaceChildren(span1, span2, span3);
    divCurrent.appendChild(spanCondition);
  }
  async function displayUpcoming(code, name) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
    const respone = await fetch(url);
    const data = await respone.json();

    const divForecastInfo = document.createElement(`div`);
    divForecastInfo.className = `forecast-info`;
    data.forecast.forEach((el) => {
      console.log(el);
      const spanMain = document.createElement(`span`);
      spanMain.className = `upcoming`;
      const span1 = document.createElement(`span`);
      if (el.condition.split(" ").length > 1) {
        span1.innerHTML = symbols[`PartlySunny`];
      } else {
        span1.innerHTML = symbols[el.condition];
      }
      span1.className = `symbol`;

      const span2 = document.createElement(`span`);
      span2.textContent = `${el.low}${symbols.Degrees}/${el.high}${symbols.Degrees}`;
      span2.className = `forecast-data`;

      const span3 = document.createElement(`span`);
      span3.textContent = `${el.condition}`;
      span2.className = `forecast-data`;

      spanMain.replaceChildren(span1, span2, span3);
      divForecastInfo.appendChild(spanMain);
      divUpcoming.appendChild(divForecastInfo);
    });
  }
}

attachEvents();
