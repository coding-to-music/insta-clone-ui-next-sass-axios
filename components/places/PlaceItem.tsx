/* eslint-disable @next/next/no-img-element */
import postObj from "../../models/postObj";
import classes from "./PlaceItem.module.scss";

const PlaceItem: React.FC<{ post: postObj }> = ({ post }) => {
  return (
    <li className={classes.placeItem}>
      <div className={classes.content}>
        <div className={classes.image}>
          <img alt={post.title} src={post.image}></img>
        </div>
        <div className={classes.info}>
          <h2>{post.title}</h2>
          <h3>{post.address}</h3>
          <p>{post.description}</p>
        </div>
        <div className={classes.actions}>
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </div>
    </li>
  );
};
export default PlaceItem;
