function attachEvents() {
  const msgBoard = document.querySelector(`#messages`);
  document.querySelector(`#refresh`).addEventListener(`click`, getMsg);
  document.querySelector(`#submit`).addEventListener(`click`, () => {
    const author = document.querySelector(`input[name=author]`);
    const content = document.querySelector(`input[name=content]`);
    sendMsg(author.value, content.value);
    // getMsg();
    author.value = "";
    content.value = "";
  });

  async function sendMsg(author, content) {
    const url = `http://localhost:3030/jsonstore/messenger`;
    const response = await fetch(url, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, content }),
    });
    const data = await response.json();
  }

  async function getMsg() {
    const url = `http://localhost:3030/jsonstore/messenger`;
    msgBoard.textContent = "";
    const response = await fetch(url);
    const data = await response.json();
    const content = Object.values(data).map(
      (el) => `${el.author}: ${el.content}`
    );
    msgBoard.textContent = content.join("\n");
  }
}

attachEvents();
