import { $authHost, $host } from './index'

export const fetchCatalogPage = async (page) => {
  try {
    console.log('Fetching catalog page:', page);
    const { data } = await $host.get(`api/catalog/items?page=${page}`);
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching catalog page:', error);
    throw error;
  }
};

export const fetchAllCatalogItems = async () => {
  try {
    console.log('Fetching all catalog items');
    const { data } = await $host.get('api/catalog/items/all');
    console.log('Received all items:', data);
    return data;
  } catch (error) {
    console.error('Error fetching all catalog items:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    console.log('Fetching product by ID:', id);
    const { data } = await $host.get(`api/catalog/items/${id}`);
    console.log('Received product data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};


