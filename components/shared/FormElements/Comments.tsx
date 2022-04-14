import React, { useEffect, useReducer, useState, useContext } from "react";
import classes from "./Comments.module.scss";
import { validate } from "../Util/validators";
import { useHttpClient } from "../hooks/http-hook";
import useForm from "../hooks/form-hook";
import { AuthContext } from "../context/auth-context";
import Modal from "../../shared/UIElements/Modal";
import Button from "../../shared/FormElements/Button";
import Avatar from "../UIElements/Avatar";

interface inputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}
interface inputAction {
  type: "CHANGE" | string;
  isTouched?: boolean;
  val?: any;
  validators?: any;
}

const inputReducer = (state: inputState, action: inputAction) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    case "CLEAR": {
      return {
        ...state,
        value: "",
        isValid: false,
      };
    }
    default:
      return state;
  }
};

const Comments: React.FC<{
  id?: string;
  label?: string;
  element?: "input" | "textarea";
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  rows?: number;
  errorText?: string | "Error!";
  validators?: any;
  value?: any;
  valid?: boolean;
  postid: string;
}> = (props) => {
  const [formState, inputHandler] = useForm(
    {
      comment: { value: "", isValid: false },
    },
    false
  );
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });
  const [comments, setComments] = useState<any[]>([]);
  const [toBeDeletedComment, setToBeDeletedComment] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  let commentsPreview,
    fullComments: any = [];
  const { id } = props;
  const { value, isValid } = inputState;

  //inputhandler
  useEffect(() => {
    inputHandler(id, value, isValid);
  }, [id, value, isValid, inputHandler]);

  //fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await sendRequest(
          `${process.env.SERVER}/comments/${props.postid}`,
          "GET"
        );
        setComments(response);
      } catch (err) {}
    };
    fetchComments();
  }, [props.postid, sendRequest]);

  async function commentSubmitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.SERVER}/comments/${props.postid}`,
        "POST",
        {
          comment: formState.inputs.comment.value,
          postId: props.postid,
        },
        {
          "Content-Type": "application/json",
          Authorization: `BEARER ${auth.token}`,
        }
      );
    } catch (err) {
      console.warn(err);
    }

    if (comments.length > 0) {
      setComments((comments) => [
        ...comments,
        {
          id: Math.random(),
          creatorId: { username: auth.username },
          comment: formState.inputs.comment.value,
        },
      ]);
    } else {
      setComments([
        {
          id: Math.random(),
          creatorId: { username: auth.username },
          comment: formState.inputs.comment.value,
        },
      ]);
    }
    dispatch({ type: "CLEAR" });
  }

  const changeHandler = (e: any) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = (e: any) => {
    dispatch({ type: "TOUCH" });
  };

  function showDeleteModal() {
    setShowConfirmModal(true);
  }
  function cancelDeleteModal() {
    setShowConfirmModal(false);
  }
  function closeCommentsModal() {
    setShowCommentsModal(false);
  }
  async function confirmDeleteModal() {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.SERVER}/comments/delete/`,
        "DELETE",
        { commentId: toBeDeletedComment },
        { Authorization: `BEARER ${auth.token}` }
      );
    } catch (err) {
      console.warn(err);
    }
    setComments(
      comments.filter((c: any) => {
        return c.id !== toBeDeletedComment;
      })
    );
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 1}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  if (comments.length > 0) {
    commentsPreview = comments.slice(-3).map((comment: any) => {
      return (
        <li key={comment.id} className={classes.comment}>
          <p className={classes.creator}>{comment.creatorId.username}</p>
          <p className={classes.content}>{comment.comment}</p>
          {auth.userId == comment.creatorId.id && (
            <a
              className={classes.delete}
              onClick={() => {
                setToBeDeletedComment(comment.id);
                showDeleteModal();
              }}
            >
              Delete?
            </a>
          )}
        </li>
      );
    });
    fullComments = comments.map((comment: any) => {
      return (
        <li key={comment.id} className={classes.modalCommentsWrapper}>
          <div style={{ width: "7%" }}>
            <Avatar
              width={30}
              height={30}
              alt={comment.creatorId.username || `Loading...`}
              image={comment.creatorId.image}
            />
          </div>
          <p className={classes.creator}>{comment.creatorId.username}</p>
          <p className={classes.content}>{comment.comment}</p>
          {auth.userId == comment.creatorId.id && (
            <a
              className={classes.delete}
              onClick={() => {
                setToBeDeletedComment(comment.id);
                setShowCommentsModal(false);
                showDeleteModal();
              }}
            >
              Delete?
            </a>
          )}
        </li>
      );
    });
  }

  const formClass =
    !inputState.isValid && inputState.isTouched
      ? classes.invalid
      : classes.valid;

  return (
    <React.Fragment>
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

      <Modal
        show={showCommentsModal}
        onCancel={closeCommentsModal}
        header='Comments'
      >
        {fullComments}
      </Modal>

      <ul className={classes.commentWrapper}>{commentsPreview}</ul>

      {comments.length > 3 && (
        <p
          className={classes.modalLink}
          onClick={() => {
            setShowCommentsModal(true);
          }}
        >
          ...Read more comments
        </p>
      )}
      <form
        onSubmit={commentSubmitHandler}
        className={classes.commentsFormWrapper}
      >
        <div className={`${classes.formControl} ${classes.input} ${formClass}`}>
          {element}
          {!auth.isLoggedIn ? <p>Log in to comment</p> : <p></p>}
          {auth.isLoggedIn && !inputState.isValid && inputState.isTouched ? (
            <p>{props.errorText}</p>
          ) : (
            <p></p>
          )}

          {auth.isLoggedIn && !inputState.isValid && !inputState.isTouched ? (
            <p>Leave a comment..</p>
          ) : (
            <p></p>
          )}
        </div>
        <button
          className={classes.submit}
          type='submit'
          disabled={!formState.isValid || !auth.isLoggedIn}
        >
          Post
        </button>
      </form>
    </React.Fragment>
  );
};

export default Comments;
