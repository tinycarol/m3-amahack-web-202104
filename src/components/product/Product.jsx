import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/ProductService";
import GoBack from "../goBack/GoBack";
import Review from "../review/Review";
import ReviewForm from "../reviewForm/ReviewForm";
import "./Product.scss";

export default function Product() {
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getProduct(id)
      .then((product) => setProduct(product))
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return <h2>😞 There was an error, retry in a few minutes 😞</h2>;
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const onReviewCreate = (review) => {
    setProduct((old) => ({ ...old, reviews: [...old.reviews, review] }));
  };

  return (
    <div className="Product">
      <GoBack />
      <h2>{product.name}</h2>
      <img src={product.images[0]} alt="" />
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}€</p>
      <h3>💭 User reviews 💭</h3>
      <div className="Product__reviews">
        {product.reviews.map((review) => (
          <Review key={review.id} {...review} />
        ))}
      </div>
      <ReviewForm productId={id} onCreate={onReviewCreate} />
    </div>
  );
}
