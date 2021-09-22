import { Link } from "react-router-dom";
import "./ProductCard.scss";

export default function ProductCard({ name, description, price, images, id }) {
  return (
    <div className="ProductCard">
      <Link to={`/products/${id}`}>
        <img className="ProductCard__image" src={images[0]} alt="" />
        <div className="ProductCard__info">
          <p>{name}</p>
          <p>{price}€</p>
        </div>
      </Link>
    </div>
  );
}
