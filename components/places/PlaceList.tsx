import PlaceItem from "./PlaceItem";
import classes from "./PlaceList.module.scss";
import postObj from "../../models/postObj";

const PlaceList: React.FC<{ items: postObj[] }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={classes.placeList}>
        <h2>No Posts found. Try creating one!</h2>
        <button>Create Post</button>
      </div>
    );
  }
  return (
    <ul className={classes.placeList}>
      {props.items.map((post) => (
        <PlaceItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
export default PlaceList;
