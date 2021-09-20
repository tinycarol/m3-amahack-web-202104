import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/UserService";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <h2>There was an error :c</h2>;
  }

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <div className="Profile">
      <h2>🐤 {user.name} 🐤</h2>
      <p>Email: {user.email}</p>
      <img className="Profile__avatar" src={user.image} alt="" />
    </div>
  );
}
