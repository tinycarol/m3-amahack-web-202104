import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { editUser } from "../../services/UserService";
import "./EditProfile.css";

export default function EditProfile() {
  const { user } = useAuth();
  const [editedUser, setEditedUser] = useState(user);
  const [error, setError] = useState();
  const { replace } = useHistory();

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    Object.keys(editedUser).forEach((key) => {
      body.append(key, editedUser[key]);
    });

    editUser(body)
      .then(() => {
        replace("/profile");
      })
      .catch((e) => setError(e.response.data.errors));
  };

  const onFieldChange = (event) => {
		setEditedUser((prev) => {
      const value =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
      return { ...prev, [event.target.name]: value };
    });
  };

  if (!editedUser) {
    return <>Loading...</>;
  }

  return (
    <div className="EditProfile">
      <h2>Edit profile</h2>
      {error && <p>{JSON.stringify(error)}</p>}
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            value={editedUser.name}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            value={editedUser.email}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={editedUser.password}
            onChange={onFieldChange}
          />
        </div>
        <div>
          <label htmlFor="name">image</label>
          <input name="image" id="image" type="file" onChange={onFieldChange} />
          {editedUser.image && (
            <img
              className="EditProfile__preview"
              src={editedUser.image}
              alt=""
            />
          )}
        </div>
        <button type="submit">Edit user</button>
      </form>
    </div>
  );
}
