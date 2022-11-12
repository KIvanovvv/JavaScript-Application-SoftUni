export function initialize(link) {
  const main = document.getElementById(`mainView`);
  document.querySelector(`nav`).addEventListener(`click`, onNavigate);
  const context = {
    showSection,
    goTo,
    updateNavigate,
  };

  return context;

  function showSection(section) {
    main.replaceChildren(section);
  }
  function onNavigate(e) {
    e.preventDefault();
    let target = e.target;
    if (target.tagName === "IMG") {
      target = target.parentElement;
    }
    if (target.tagName === "A") {
      const url = new URL(target.href);
      goTo(url.pathname);
    }
  }

  function goTo(path, ...params) {
    const handler = link[path];
    if (typeof handler === "function") {
      handler(context);
    }
  }
  function updateNavigate() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      document
        .querySelectorAll(`.user`)
        .forEach((el) => (el.style.display = `block`));
      document
        .querySelectorAll(`.guest`)
        .forEach((el) => (el.style.display = `none`));
    } else {
      document
        .querySelectorAll(`.user`)
        .forEach((el) => (el.style.display = `none`));
      document
        .querySelectorAll(`.guest`)
        .forEach((el) => (el.style.display = `block`));
    }
  }
}
