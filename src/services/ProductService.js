import { create } from "./BaseService";

const http = create();

export function listProducts() {
  return http.get("/products");
}

export function getProduct(id) {
  return http.get(`/products/${id}`);
}

export function createReview(review, productId) {
  return http.post(`/products/${productId}/reviews`, review);
}

export const createProduct = (product) => {
  return http.post("/products", product);
};
