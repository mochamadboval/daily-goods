import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";

import Header from "./components/Header";
import Menu from "./components/Menu";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>
          <Route path="/categories/:category">
            <Category />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/wishlist">
            <Wishlist />
          </Route>
        </Switch>
      </main>
      <Menu />
    </Fragment>
  );
};

export default App;
