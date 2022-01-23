import userObj from "../../models/userObj";
import UserItem from "./UserItem";
import classes from "./UsersList.module.scss";

const UsersList: React.FC<{ items: userObj[] }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={classes.wrapper}>
        <h2 className={classes.error}>No Users Found</h2>
      </div>
    );
  }
  return (
    <ul className={classes.wrapper}>
      {props.items.map((user) => {
        return <UserItem user={user} key={user.id} />;
      })}
    </ul>
  );
};

export default UsersList;
