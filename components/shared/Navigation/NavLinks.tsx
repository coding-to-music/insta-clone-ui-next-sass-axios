import classes from "./NavLinks.module.scss";
import Link from "next/link";
import { AuthContext } from "../context/auth-context";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const NavLinks: React.FC = (props) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = async () => {
    auth.logout();
    router.push("/");
  };

  return (
    <ul className={classes.navLinks}>
      <li>
        <Link href='/users'>BROWSE USERS</Link>
      </li>
      {auth.isLoggedIn && (
        <li>
          <Link href={`/user/${auth.username}`}>MY POSTS</Link>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Link href='/posts/new'>NEW POST</Link>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <Link href='/auth'>LOGIN</Link>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button className={classes.logout} onClick={logoutHandler}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
