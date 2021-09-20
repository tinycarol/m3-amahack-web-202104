import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/ProductService";
import GoBack from "../goBack/GoBack";
import Review from "../review/Review";
import ReviewForm from "../reviewForm/ReviewForm";
import { useAuth } from "../../hooks/useAuth";

export default function Product() {
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    getProduct(id)
      .then((product) => setProduct(product))
      .catch(() => setError(true));
  }, [id]);

  const onAddReview = (review) => {
    setProduct((old) => ({ ...old, reviews: [...old.reviews, review] }));
  };

  if (error) {
    return <h2>😞 There was an error, retry in a few minutes 😞</h2>;
  }

  if (!product) {
    return <h2>😞 That product doesn't exist 😞</h2>;
  }

  return (
    <div className="Product">
      <GoBack />
      <h2>{product.name}</h2>
      <img src={product.images[0]} alt="" />
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}€</p>
      <div className="Product__reviews">
        <h3>💭 Reviews 💭</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <Review key={review.id} {...review} />
          ))
        ) : (
          <p>No reviews :c</p>
        )}
      </div>
      {user &&
        user.id !== product.seller &&
        !product.reviews.some((r) => r.author.id === user.id) && (
          <ReviewForm productId={product.id} onDone={onAddReview} />
        )}
    </div>
  );
}
