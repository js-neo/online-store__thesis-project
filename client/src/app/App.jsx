import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import LoginForm from "./pages/loginForm";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RegisterForm from "./pages/registerForm";

const App = () => {
  const user = false;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category?">
          <ProductList />
        </Route>
        <Route path="/product/:id?">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginForm />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <RegisterForm />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
