/* eslint-disable @next/next/no-img-element */
import postObj from "../../models/postObj";
import classes from "./PlaceItem.module.scss";
import Button from "../shared/FormElements/Button";
import React, { useContext, useState } from "react";
import Modal from "../shared/UIElements/Modal";
import Map from "../shared/UIElements/Map";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const PlaceItem: React.FC<{ post: postObj }> = ({ post }) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError, setError } =
    useHttpClient();
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
  async function confirmDeleteModal() {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${post.id}`,
        "DELETE",
        null,
        { Authorization: `BEARER ${auth.token}` }
      );
    } catch (err) {
      console.warn(err);
    }
    router.push(`/user/${auth.userId}`);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <div className={classes.content}>
          <Link href={`/posts/${post.id}`} passHref>
            <div className={classes.imageContainer}>
              <img
                alt={post.title}
                src={`http://localhost:5000/${post.image}`}
                className={classes.images}
              />
            </div>
          </Link>
          <div className={classes.info}>
            <h2>{post.title}</h2>
            <h3>{post.address}</h3>
            <p>{post.description}</p>
          </div>
          <div className={classes.actions}>
            <Button onClick={openMapHandler} inverse={true}>
              VIEW ON MAP
            </Button>
            {auth.userId == post.creatorId && (
              <Button href={`/posts/edit/${post.id}`}>EDIT</Button>
            )}
            {auth.userId == post.creatorId && (
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
