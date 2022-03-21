import PlaceItem from "./PlaceItem";
import classes from "./PlaceList.module.scss";
import postObj from "../../models/postObj";
import Button from "../shared/FormElements/Button";

const PlaceList: React.FC<{ items: postObj[] }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes.placeList} ${classes.notFound}`}>
        <h2>No Posts found. Try creating one!</h2>
        <Button href='/posts/new'>Create a Post!</Button>
      </div>
    );
  }
  return (
    <ul className={classes.placeList}>
      {props.items
        .slice(0)
        .reverse()
        .map((post) => (
          <PlaceItem key={post.id} post={post} />
        ))}
    </ul>
  );
};
export default PlaceList;
