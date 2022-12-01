import * as api from "./api.js";

const endpoints = {
  getAllAlbums: "data/offers?sortBy=_createdOn%20desc",
  addAlbum: "data/offers",
};

export async function getAllJobs() {
  const res = await api.get(endpoints.getAllAlbums);
  return await res;
}

export async function getJobById(id) {
  const res = await api.get(`data/offers/${id}`);
  return await res;
}
export async function getAlbumByQuery(query) {
  const res = await api.get(`data/albums?where=name%20LIKE%20%22${query}%22`);
  return await res;
}
export async function addNewOffer(
  title,
  imageUrl,
  category,
  description,
  requirements,
  salary
) {
  const res = await api.post(endpoints.addAlbum, {
    title,
    imageUrl,
    category,
    description,
    requirements,
    salary,
  });
  return await res;
}

export async function deleteJob(id) {
  const res = await api.delete(`data/offers/${id}`);
  return await res;
}

export async function editJob(
  id,
  title,
  imageUrl,
  category,
  description,
  requirements,
  salary
) {
  const res = await api.put(`data/offers/${id}`, {
    title,
    imageUrl,
    category,
    description,
    requirements,
    salary,
  });
  return res;
}
