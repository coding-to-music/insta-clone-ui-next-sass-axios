import React from "react";
import postObj from "../../models/postObj";
import classes from "./PlaceGrid.module.scss";
import Image from "next/image";
import Button from "../shared/FormElements/Button";
import borrowedClasses from "./PlaceList.module.scss";
import Link from "next/link";

const PlaceGrid: React.FC<{ items: postObj[] }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div
        className={`${borrowedClasses.placeList} ${borrowedClasses.notFound}`}
      >
        <h2>No Posts found. Try creating one!</h2>
        <Button href='/posts/new'>Create a Post!</Button>
      </div>
    );
  }
  return (
    <div className={classes.mainGrid}>
      {props.items
        .slice(0)
        .sort((a, b) => (a.createdAt > b.createdAt || b.createDate ? -1 : 1))
        .map((post) => (
          <Link passHref href={`/posts/${post.id}`} key={post.id}>
            <li className={classes.imageContainer}>
              <Image
                className={classes.image}
                src={post.image}
                alt={post.title}
                layout='fill'
              />
            </li>
          </Link>
        ))}
    </div>
  );
};

export default PlaceGrid;
