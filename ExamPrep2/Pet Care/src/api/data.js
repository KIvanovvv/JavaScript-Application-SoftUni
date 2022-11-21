import * as api from "./api.js";

const endpoints = {
  allAnimals: "data/pets?sortBy=_createdOn%20desc&distinct=name",
  addNewPet: "data/pets",
  getById: "data/pets/",
  delete: "data/pets/",
  edit: "data/pets/",
};

export async function getAllAnimals() {
  const res = await api.get(endpoints.allAnimals);
  return await res;
}

export async function addNewPet(name, breed, age, weight, image) {
  const res = await api.post(endpoints.addNewPet, {
    name,
    breed,
    age,
    weight,
    image,
  });
  return await res;
}
export async function getById(id) {
  const res = await api.get(endpoints.getById + id);
  return await res;
}

export async function deletePet(id) {
  const res = await api.delete(endpoints.delete + id);
  return await res;
}

export async function editDetails(id, { name, breed, age, weight, image }) {
  const res = await api.put(endpoints.edit + id, {
    name,
    breed,
    age,
    weight,
    image,
  });
  return res;
}

//All Furniture (GET): http://localhost:3030/data/catalog
