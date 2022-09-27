import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import cartIcon from "../assets/cart.svg";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>
        <a href="/" title="Daily Goods">
          DAILY GOODS
        </a>
      </h1>
      <NavLink
        className={classes.header__cart}
        activeClassName={classes.active}
        to="/cart"
      >
        <img src={cartIcon} height="24px" alt="" />
      </NavLink>
    </header>
  );
};

export default Header;
