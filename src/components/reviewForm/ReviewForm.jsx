import { useState } from "react";
import { sendReview } from "../../services/ProductService";

const defaultState = {
  title: "",
  description: "",
  score: 0,
};

export default function ReviewForm({ productId, onDone }) {
  const [review, setReview] = useState(defaultState);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendReview(review, productId).then((r) => {
      onDone(r);
      setReview(defaultState);
    });
  };

  const onFieldChange = (event) => {
    setReview((old) => ({ ...old, [event.target.name]: event.target.value }));
  };

  return (
    <div className="ReviewForm">
      <h3>🖌️ Write your review 🖌️</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Title</label>
          <input
            name="title"
            id="title"
            value={review.title}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={review.description}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label for="score">Score</label>
          <input
            name="score"
            id="score"
            type="number"
            value={review.score}
            onChange={onFieldChange}
						min={0}
						max={5}
          />
        </div>
        <button type="submit">Send review</button>
      </form>
    </div>
  );
}
