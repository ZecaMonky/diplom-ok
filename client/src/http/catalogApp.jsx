import { $authHost, $host } from './index'

export const fetchCatalogPage = async (page) => {
  const { data } = await $host.get(`api/catalog/items?page=${page}`);
  return data;
};

export const fetchAllCatalogItems = async () => {
  const { data } = await $host.get('api/catalog/items/all');
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await $host.get(`api/catalog/items/${id}`);
  return data;
};


