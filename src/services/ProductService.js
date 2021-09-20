import { create } from "./BaseService";

const http = create();

export function listProducts() {
  return http.get("/products");
}

export function getProduct(id) {
  return http.get(`/products/${id}`);
}

export const doReview = (title, description, score, id) => {
  return http.post("/review", { title, description, score, id });
};
