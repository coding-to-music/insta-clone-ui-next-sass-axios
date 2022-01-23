/* eslint-disable @next/next/no-img-element */
import postObj from "../../models/postObj";
import classes from "./PlaceItem.module.scss";
import Button from "../shared/FormElements/Button";
import React, { useState } from "react";
import Modal from "../shared/UIElements/Modal";
import Map from "../shared/UIElements/Map";
import { getStaticProps } from "../../pages/404";

const PlaceItem: React.FC<{ post: postObj }> = ({ post }) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={post.address}
        contentClass={classes.placeItem}
        footerClass={classes.modalActions}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className={classes.mapContainer}>
          <Map zoom={16} center={post.coordinates} />
        </div>
      </Modal>
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
            <Button onClick={openMapHandler} inverse={true}>
              VIEW ON MAP
            </Button>
            <Button href={`/places/edit/${post.id}`}>EDIT</Button>
            <Button href={`/`} danger={true}>
              DELETE
            </Button>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};
export default PlaceItem;
