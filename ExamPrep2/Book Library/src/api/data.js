import * as api from "./api.js";

const endpoints = {
  getAllBooks: "data/books?sortBy=_createdOn%20desc",
  addBook: "data/books",
};

export async function getAllBooks() {
  const res = await api.get(endpoints.getAllBooks);
  return await res;
}

export async function getBookById(id) {
  const res = await api.get(`data/books/${id}`);
  return await res;
}
export async function getUserBooks(userId) {
  const res = await api.get(
    `data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
  return await res;
}
export async function addNewBook(title, description, imageUrl, type) {
  const res = await api.post(endpoints.addBook, {
    title,
    description,
    imageUrl,
    type,
  });
  return await res;
}

export async function deleteBook(id) {
  const res = await api.delete(`data/books/${id}`);
  return await res;
}

export async function editBook(id, title, description, imageUrl, type) {
  const res = await api.put(`data/books/${id}`, {
    title,
    description,
    imageUrl,
    type,
  });
  return res;
}
