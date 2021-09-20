import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../services/UserService";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: undefined,
  });
  const [error, setError] = useState();
  const { replace } = useHistory();

	const onFieldChange = (event) => {
    setUser((prev) => {
      const value =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
      return { ...prev, [event.target.name]: value };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    Object.keys(user).forEach((key) => {
      body.append(key, user[key]);
    });

    createUser(body)
      .then(() => {
        replace("/login");
      })
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <div className="Register">
      {error && <p>Error: {error}</p>}
      <form onSubmit={onFormSubmit}>
        <div>
          <label for="name">Name</label>
          <input
            name="name"
            id="name"
            value={user.name}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            value={user.email}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label for="password">password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={user.password}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label for="name">image</label>
          <input
            name="image"
            id="image"
            type="file"
            onChange={onFieldChange}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
