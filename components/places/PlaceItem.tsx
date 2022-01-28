/* eslint-disable @next/next/no-img-element */
import postObj from "../../models/postObj";
import classes from "./PlaceItem.module.scss";
import Button from "../shared/FormElements/Button";
import React, { useContext, useState } from "react";
import Modal from "../shared/UIElements/Modal";
import Map from "../shared/UIElements/Map";
import { AuthContext } from "../shared/context/auth-context";
import Auth from "../../pages/auth";

const PlaceItem: React.FC<{ post: postObj }> = ({ post }) => {
  const authCtx = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  function showDeleteModal() {
    setShowConfirmModal(true);
  }
  function cancelDeleteModal() {
    setShowConfirmModal(false);
  }
  function confirmDeleteModal() {
    setShowConfirmModal(false);
    console.log("deleting...");
  }

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
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteModal}
        header='Confirmation'
        footerClass={classes.modalActions}
        footer={
          <React.Fragment>
            <Button inverse={true} onClick={cancelDeleteModal}>
              Cancel
            </Button>
            <Button danger={true} onClick={confirmDeleteModal}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p className={classes.message}>
          Are you sure you want to delete this? This action is irreversible.
        </p>
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
            {authCtx.isLoggedIn && (
              <Button href={`/places/edit/${post.id}`}>EDIT</Button>
            )}
            {authCtx.isLoggedIn && (
              <Button onClick={showDeleteModal} danger={true}>
                DELETE
              </Button>
            )}
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};
export default PlaceItem;
