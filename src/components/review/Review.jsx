import "./Review.css";

export default function Review({ title, description, score, author }) {
  return (
    <div className="Review">
      <h4>
        {title} - {author.name} - {"⭐".repeat(score)}
        <span className="Review__score--dark">{"⭐".repeat(5 - score)}</span>
      </h4>
      <p>{description}</p>
    </div>
  );
}
