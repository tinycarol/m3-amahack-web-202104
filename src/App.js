import { Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/login/Login";
import Product from "./components/product/Product";
import Products from "./components/products/Products";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/editProfile/EditProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App__content">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/profile/edit" component={EditProfile} />
          <ProtectedRoute path="/profile/:id" component={Profile} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} exact />
          <Route path="/products/:id" component={Product} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
