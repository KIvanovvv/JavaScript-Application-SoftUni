import * as api from "./api.js";

const endpoints = {
  getAllAlbums: "data/albums?sortBy=_createdOn%20desc&distinct=name",
  addAlbum: "data/albums",
};

export async function getAllAlbums() {
  const res = await api.get(endpoints.getAllAlbums);
  return await res;
}

export async function getAlbumById(id) {
  const res = await api.get(`data/albums/${id}`);
  return await res;
}
export async function getAlbumByQuery(query) {
  const res = await api.get(`data/albums?where=name%20LIKE%20%22${query}%22`);
  return await res;
}
export async function addNewAlbum(
  name,
  imgUrl,
  price,
  releaseDate,
  artist,
  genre,
  description
) {
  const res = await api.post(endpoints.addAlbum, {
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description,
  });
  return await res;
}

export async function deleteAlbum(id) {
  const res = await api.delete(`data/albums/${id}`);
  return await res;
}

export async function editAlbum(
  id,
  name,
  imgUrl,
  price,
  releaseDate,
  artist,
  genre,
  description
) {
  const res = await api.put(`data/albums/${id}`, {
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description,
  });
  return res;
}
