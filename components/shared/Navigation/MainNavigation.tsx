import classes from "./MainNavigation.module.scss";
import React, { useState } from "react";
import MainHeader from "./MainHeader";
import Link from "next/link";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation: React.FC = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {drawerOpen ? <Backdrop onClick={closeDrawer} /> : null}
      <SideDrawer onClick={closeDrawer} show={drawerOpen}>
        <nav className={classes.drawerNav}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={classes.menuBtn} onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes.title}>
          <Link href='/'>InstaSham</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
