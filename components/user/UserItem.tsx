import userObj from "../../models/userObj";
import classes from "./UserItem.module.scss";
import Avatar from "../shared/UIElements/Avatar";
import Link from "next/link";

const UserItem: React.FC<{ user: userObj }> = ({ user }) => {
  return (
    <li className={classes.wrapper}>
      <div className={classes.content}>
        <Link href={`/places/${user.id}`} passHref>
          <div className={classes.image}>
            <Avatar alt={user.name} image={user.image} />
            <div className={classes.info}>
              <h2>{user.name}</h2>
              <h3>
                {user.places} {user.places === 1 ? "Post" : "Posts"}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
