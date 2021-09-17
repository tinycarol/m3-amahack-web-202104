import { Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./components/notFound/NotFound";
import Products from "./components/products/Products";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App__content">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} exact />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
