/* eslint-disable @next/next/no-img-element */
import postObj from "../../models/postObj";
import classes from "./PlaceItem.module.scss";
import Button from "../shared/FormElements/Button";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../shared/UIElements/Modal";
import Map from "../shared/UIElements/Map";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from "../shared/UIElements/Avatar";
import UserObj from "../../models/userObj";

const PlaceItem: React.FC<{ post: postObj }> = ({ post }) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [user, setUser] = useState<UserObj>();
  const {
    isLoading: avaLoading,
    error: avaError,
    sendRequest: avaSendRequest,
    clearError: avaClearError,
  } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await avaSendRequest(
          `${process.env.SERVER}/api/users/${post.creatorId}`,
          "GET"
        );
        setUser(response);
        console.log(response);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchUser();
  }, [avaSendRequest, post.creatorId]);

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
        `${process.env.SERVER}/api/posts/${post.id}`,
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
        <div className={classes.headerSection}>
          {avaLoading && <LoadingSpinner asOverlay={true} />}
          <a href={`/user/${user?.id}`}>
            <Avatar
              width={50}
              height={50}
              alt={user?.username || `Loading...`}
              image={`${process.env.SERVER}/${user?.image}`}
            />
          </a>
          <div className={classes.headerSub}>
            <h4>{user?.username}</h4>
            <h6 style={{ cursor: "pointer" }} onClick={openMapHandler}>
              {post.address}
            </h6>
          </div>
        </div>
        <div className={classes.content}>
          <Link href={`/posts/${post.id}`} passHref>
            <div className={classes.imageContainer}>
              <img
                alt={post.title}
                src={`${process.env.SERVER}/${post.image}`}
                className={classes.images}
              />
            </div>
          </Link>
          <div className={classes.info}>
            <h2>{post.title}</h2>

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
