import MenuLink from "./MenuLink";

import classes from "./Menu.module.css";

import accountIcon from "../../assets/account.svg";
import categoryIcon from "../../assets/category.svg";
import homeIcon from "../../assets/home.svg";
import wishlistIcon from "../../assets/wishlist.svg";

const Menu = () => {
  return (
    <nav className={classes.menu}>
      <ul>
        <MenuLink page="/home" icon={homeIcon}>Home</MenuLink>
        <MenuLink page="/categories" icon={categoryIcon}>Categories</MenuLink>
        <MenuLink page="/wishlist" icon={wishlistIcon}>Wishlist</MenuLink>
        <MenuLink page="/account" icon={accountIcon}>Account</MenuLink>
      </ul>
    </nav>
  );
};

export default Menu;
