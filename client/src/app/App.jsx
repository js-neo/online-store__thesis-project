import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import LoginForm from "./pages/loginForm";
import Cart from "./pages/Cart";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "./pages/registerForm";

const App = () => {
  return (
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
        <LoginForm />
      </Route>
      <Route path="/register">
        <RegisterForm />
      </Route>
    </Switch>
  );
};

export default App;
