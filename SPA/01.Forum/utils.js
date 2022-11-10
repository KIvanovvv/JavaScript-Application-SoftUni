export function getFormData(event) {
  const formData = new FormData(event.target);
  const body = Object.fromEntries(formData);
  return body;
}

export function formClear(e) {
  return e.target.reset();
}
