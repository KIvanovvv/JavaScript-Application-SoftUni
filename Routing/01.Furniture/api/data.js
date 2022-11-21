import * as api from "./api.js";

const endpoints = {
  allItems: "data/catalog",
};

export async function getAllItems() {
  const res = await api.get(endpoints.allItems);
  return res;
}

//All Furniture (GET): http://localhost:3030/data/catalog
