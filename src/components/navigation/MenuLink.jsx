import { NavLink } from "react-router-dom";

import classes from "./MenuLink.module.css";

const MenuLink = (props) => {
  return (
    <li>
      <NavLink
        className={classes.menu__page}
        activeClassName={classes.active}
        to={props.page}
      >
        <img src={props.icon} height="24px" alt="" />
        <span>{props.children}</span>
      </NavLink>
    </li>
  );
};

export default MenuLink;
