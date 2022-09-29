import React, { Fragment, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Account = React.lazy(() => import("./pages/Account"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Categories = React.lazy(() => import("./pages/Categories"));
const Category = React.lazy(() => import("./pages/Category"));
const Home = React.lazy(() => import("./pages/Home"));
const Product = React.lazy(() => import("./pages/Product"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));

import Header from "./components/Header";
import Menu from "./components/Menu";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Suspense fallback={<p className="loading">Loading ...</p>}>
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
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/wishlist">
              <Wishlist />
            </Route>
          </Switch>
        </Suspense>
      </main>
      <Menu />
    </Fragment>
  );
};

export default App;
