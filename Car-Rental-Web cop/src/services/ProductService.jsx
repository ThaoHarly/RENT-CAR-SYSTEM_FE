import React from "react";

const Base_url = "http://localhost:5173/product";

export const getProducts = async () => {
  return await apiCall("GET", Base_url);
};
export const getProductById = async (id) => {
  return await apiCall("GET", `${Base_url}/${id}`);
};

export const addProduct = async (product) => {
  return await apiCall("POST", Base_url, product);
};
export const updateProductById = async (id, product) => {
  return await apiCall("PUT", `${Base_url}/${id}`, product);
};

export const deleteProductById = async (id) => {
  return await apiCall("DELETE", `${Base_url}/$`);
};
