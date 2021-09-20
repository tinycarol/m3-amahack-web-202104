import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute(props) {
  const { token } = useAuth();
  if (token) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
