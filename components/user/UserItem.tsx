import userObj from "../../models/userObj";
import classes from "./UserItem.module.scss";
import Avatar from "../shared/UIElements/Avatar";
import Link from "next/link";

const UserItem: React.FC<{ user: userObj }> = ({ user }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Link href={`/places/${user.id}`} passHref>
          <div className={classes.innerWrapper}>
            <div className={classes.avatar}>
              <Avatar alt={user.name} image={user.image} />
            </div>
            <div className={classes.info}>
              <h2>{user.name}</h2>
              <h3>
                {user.places} {user.places === 1 ? "Post" : "Posts"}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
