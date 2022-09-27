import { NavLink } from "react-router-dom";

import classes from "./Menu.module.css";

import accountIcon from "../assets/account.svg";
import categoryIcon from "../assets/category.svg";
import homeIcon from "../assets/home.svg";
import wishlistIcon from "../assets/wishlist.svg";

const Menu = () => {
  return (
    <nav className={classes.menu}>
      <ul>
        <li>
          <NavLink
            className={classes.menu__page}
            activeClassName={classes.active}
            to="/home"
          >
            <img src={homeIcon} height="24px" alt="" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.menu__page}
            activeClassName={classes.active}
            to="/categories"
          >
            <img src={categoryIcon} height="24px" alt="" />
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.menu__page}
            activeClassName={classes.active}
            to="/wishlist"
          >
            <img src={wishlistIcon} height="24px" alt="" />
            <span>Wishlist</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.menu__page}
            activeClassName={classes.active}
            to="/account"
          >
            <img src={accountIcon} height="24px" alt="" />
            <span>Account</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
