import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ProductsContext from "../../store/products-context";

import classes from "./Header.module.css";

import cartIcon from "../../assets/cart.svg";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const productsCtx = useContext(ProductsContext);

  return (
    <header className={classes.header}>
      <h1>
        <a href="/" title="Daily Goods">
          DAILY GOODS
        </a>
      </h1>
      {authCtx.isLoggedIn && (
        <NavLink
          className={classes.header__cart}
          activeClassName={classes.active}
          to="/cart"
        >
          <img src={cartIcon} height="24px" alt="" />
          <p>{productsCtx.cart}</p>
        </NavLink>
      )}
    </header>
  );
};

export default Header;
