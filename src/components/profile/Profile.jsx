import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getUser } from "../../services/UserService";
import "./Profile.css";

export default function Profile() {
  const [profileUser, setProfileUser] = useState();
  const [error, setError] = useState();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    getUser(id || "me")
      .then((u) => setProfileUser(u))
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return <h2>There was an error :c</h2>;
  }

  if (!profileUser) {
    return <>Loading...</>;
  }

  return (
    <div className="Profile">
      <h2>🐤 {profileUser.name} 🐤</h2>
      <p>Email: {profileUser.email}</p>
			<img className="Profile__avatar" src={profileUser.image} alt="" />
			<br/>
      {user?.id === profileUser.id && <Link to="/profile/edit">Edit profile</Link>}
    </div>
  );
}
