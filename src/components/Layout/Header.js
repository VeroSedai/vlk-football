import { Fragment } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import tsubasaimage from "../../assets/captain-tsubasa.jpg";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <Fragment>
      <Navbar color="primary" light expand="md">
        <NavbarBrand>Soccer Teams Creator</NavbarBrand>
      </Navbar>
        <div className={classes["main-image"]}>
          <img src={tsubasaimage} alt="VLK Football" />
        </div>
    </Fragment>
  );
};

export default Header;
