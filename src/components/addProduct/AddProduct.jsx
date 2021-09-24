import { Link } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  return (
    <Link to="/products/new-product" className="AddProduct">
      ➕
    </Link>
  );
}
