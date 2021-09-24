import { useState } from "react";
import { useHistory } from "react-router";
import { createProduct } from "../../services/ProductService";

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    images: undefined,
  });
  const [error, setError] = useState();
  const { replace } = useHistory();

  const onChange = (event) => {
    setProduct((old) => {
      const value =
        event.target.type === "file" ? event.target.files : event.target.value;
      return { ...old, [event.target.name]: value };
    });
  };

  const addProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    for (let i = 0; i < product.images.length; i++) {
      formData.append("images", product.images[i]);
    }

    createProduct(formData)
      .then(() => {
        replace("/products");
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div className="NewProduct" action="/uploadmultiple">
      {error && <p>There was an error: {error}</p>}
      <form onSubmit={addProduct}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            value={product.name}
            placholder="Write your full name here"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            id="price"
            type="number"
            value={product.price}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <input
            name="description"
            id="description"
            type="description"
            value={product.description}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="images">images</label>
          <input
            name="images"
            id="images"
            type="file"
            alt=""
            multiple
            onChange={onChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <br />
    </div>
  );
}
