import * as api from "./api.js";

const endpoints = {
  getAllAlbums: "data/albums?sortBy=_createdOn%20desc",
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

export async function addNewAlbum(
  singer,
  album,
  imageUrl,
  release,
  label,
  sales
) {
  const res = await api.post(endpoints.addAlbum, {
    singer,
    album,
    imageUrl,
    release,
    label,
    sales,
  });
  return await res;
}

export async function deleteAlbum(id) {
  const res = await api.delete(`data/albums/${id}`);
  return await res;
}

export async function editAlbum(
  id,
  singer,
  album,
  imageUrl,
  release,
  label,
  sales
) {
  const res = await api.put(`data/albums/${id}`, {
    singer,
    album,
    imageUrl,
    release,
    label,
    sales,
  });
  return res;
}

export async function getLikes(albumId) {
  const res = await api.get(
    `data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
  );
  return await res;
}
export async function getLikesForUser(albumId, userId) {
  const res = await api.get(
    `data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
  return await res;
}

export async function addLike(albumId) {
  const res = await api.post(`data/likes`, { albumId });
  return await res;
}
