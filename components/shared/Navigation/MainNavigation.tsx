import classes from "./MainNavigation.module.scss";
import MainHeader from "./MainHeader";
import Link from "next/link";

const MainNavigation: React.FC = (props) => {
  return (
    <MainHeader>
      <button className={classes.menuBtn}>
        <span />
        <span />
        <span />
      </button>
      <h1 className={classes.title}>
        <Link href='/'>InstaSham</Link>
      </h1>
      <nav>...</nav>
    </MainHeader>
  );
};

export default MainNavigation;
