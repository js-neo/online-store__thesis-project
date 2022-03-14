import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import LoginForm from "./pages/LoginForm";
import Cart from "./pages/Cart";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";
import AppLoader from "./components/ui/hoc/appLoader";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <AppLoader>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category?">
          <ProductList />
        </Route>
        <Route path="/product/:id?">
          <ProductPage />
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
        <Route path="/admin/addProduct">
          <AdminPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </AppLoader>
  );
};

export default App;
