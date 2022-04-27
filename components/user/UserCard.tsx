import React from "react";
import classes from "./UserCard.module.scss";
import UserObj from "../../models/userObj";
import Image from "next/image";
import { BsGear } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../shared/context/auth-context";

type UserCardProps = { userData: UserObj };

const UserCard: React.FC<UserCardProps> = (props) => {
  const auth = useContext(AuthContext);

  if (!props.userData) {
    return <p className={classes.error}>We cant seem to find that user :(</p>;
  }

  const description = props.userData.description ? (
    <div className={classes.desc}>{props.userData.description}</div>
  ) : (
    <div className={classes.noDesc}>No description set...</div>
  );

  const options =
    auth.userId == props.userData.id ? (
      <BsGear className={classes.settingsIcon} />
    ) : (
      ""
    );

  return (
    <header className={classes.wrapper}>
      <div className={classes.avaWrapper}>
        <div className={classes.avatar}>
          <Image
            className={classes.image}
            layout='fill'
            alt={props.userData.username}
            src={props.userData.image}
          />
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.username}>
          <p>{props.userData.username}</p>
          {options}
        </div>
        <div className={classes.stats}>
          <div>
            <span className={classes.important}>
              {props.userData.posts.length}
            </span>{" "}
            {props.userData.posts.length > 1 || props.userData.posts.length == 0
              ? "Posts"
              : "Post"}
          </div>
          <div className={classes.numbers}>
            <span className={classes.important}>
              {props.userData.comments.length}
            </span>{" "}
            {props.userData.comments.length > 1 ||
            props.userData.comments.length == 0
              ? "Comments"
              : "Comment"}
          </div>
        </div>
        {description}
      </div>
    </header>
  );
};

export default UserCard;
