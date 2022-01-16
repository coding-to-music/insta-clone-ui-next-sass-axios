import classes from "./NavLinks.module.scss";
import Link from "next/link";

const NavLinks: React.FC = (props) => {
  return (
    <ul className={classes.navLinks}>
      <li>
        <Link href='/'>ALL USERS</Link>
      </li>
      <li>
        <Link href='/places/u1'>MY POSTS</Link>
      </li>
      <li>
        <Link href='/places/new'>NEW POST</Link>
      </li>
      <li>
        <Link href='/auth'>AUTHENTICATE</Link>
      </li>
    </ul>
  );
};

export default NavLinks;
