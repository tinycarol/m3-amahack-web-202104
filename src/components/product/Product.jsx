import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getProduct } from "../../services/ProductService";
import GoBack from "../goBack/GoBack";
import { doReview } from "../../services/ProductService";
import "./Product.css";

export default function Product() {
  const { id } = useParams();
  const { replace } = useHistory();
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const [review, setReview] = useState({
    title: "",
    description: "",
    score: "",
    product: id,
  });

  useEffect(() => {
    getProduct(id)
      .then((product) => setProduct(product))
      .catch(() => setError(true));
  }, [id, product]);

  if (error) {
    return <h2>😞 There was an error, retry in a few minutes 😞</h2>;
  }

  if (!product) {
    return <h2>😞 That product doesn't exist 😞</h2>;
  }

  const onChange = (e) => {
    setReview((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const submitReview = (e) => {
    e.preventDefault();
    doReview(review.title, review.description, review.score, id)
      .then(() => {
        replace(`/products/${id}`);
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div className="Product">
      <GoBack />
      <h2>{product.name}</h2>
      <img src={product.images[0]} alt="" />
      <p>Name: {product.name}</p>
      <p>Title: {product.title}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}€</p>
      <div className="Product__reviews">
        {product.reviews.map((review) => {
          return (
            <div className="Product__reviews__review" key={review._id}>
              <p>
                <b>
                  <u>Name</u>:
                </b>
                {review.author.name}
              </p>
              <p>
                <b>
                  <u>Title</u>:
                </b>
                {review.title}
              </p>
              <p>
                <b>
                  <u>Review</u>:
                </b>
                {review.description}
              </p>
              <p>
                <b>
                  <u>Score</u>:
                </b>
                {review.score}
              </p>
            </div>
          );
        })}
      </div>
      <form className="Product__newReview" onSubmit={submitReview}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          value={review.title}
          onChange={onChange}
        />
        <label htmlFor="description">Review</label>
        <input
          name="description"
          id="description"
          value={review.description}
          onChange={onChange}
        />
        <label htmlFor="score">Score</label>
        <input
          name="score"
          id="score"
          type="number"
          value={review.score}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
