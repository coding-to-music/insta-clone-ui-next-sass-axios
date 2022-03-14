import UserObj from "../../models/userObj";
import classes from "./UserItem.module.scss";
import Avatar from "../shared/UIElements/Avatar";
import Link from "next/link";

const UserItem: React.FC<{ user: UserObj }> = ({ user }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Link href={`/user/${user.id}`} passHref>
          <div className={classes.innerWrapper}>
            <div className={classes.avatar}>
              <Avatar
                alt={user.username}
                image={`http://localhost:5000/${user.image}`}
              />
            </div>
            <div className={classes.info}>
              <h2>{user.username}</h2>
              <h3>{`${user.posts.length} posts`}</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
