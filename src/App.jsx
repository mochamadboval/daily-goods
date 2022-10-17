import React, { Suspense, useContext } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "./store/auth-context";

const Account = React.lazy(() => import("./pages/Account"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Categories = React.lazy(() => import("./pages/Categories"));
const Category = React.lazy(() => import("./pages/Category"));
const Home = React.lazy(() => import("./pages/Home"));
const Product = React.lazy(() => import("./pages/Product"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));

import Header from "./components/navigation/Header";
import Menu from "./components/navigation/Menu";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <HelmetProvider>
      <Header />
      <Menu />
      <main>
        <Suspense fallback={<p className="loading">Loading ...</p>}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            {authCtx.isLoggedIn && (
              <Route path="/cart">
                <Cart />
              </Route>
            )}
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
              {authCtx.isLoggedIn && <Wishlist />}
              {!authCtx.isLoggedIn && <Redirect to="/account" />}
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </HelmetProvider>
  );
};

export default App;
