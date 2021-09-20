import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../services/UserService";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    image: undefined,
  });
  const [error, setError] = useState();
  const { replace } = useHistory();

  const onChange = (event) => {
    setUser((old) => {
      const value =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
      return { ...old, [event.target.name]: value };
    });
  };

  const doRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });
    /* formData.append("email", user.email);
		formData.append("password", user.password);
		formData.append("name", user.name);
		formData.append("image", user.image);*/

    createUser(formData)
      .then(() => {
        replace("/login");
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div className="SignUp">
      {error && <p>There was an error: {error}</p>}
      <form onSubmit={doRegister}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            value={user.name}
            placholder="Write your full name here"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            name="image"
            id="image"
            type="file"
            alt=""
            onChange={onChange}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <br />
    </div>
  );
}
