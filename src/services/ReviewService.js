import { create } from "./BaseService";

const http = create();

export function createReview (productId, review) {
    return http.post(`/product/${productId}/review`, review);
}