import React, { useEffect, useReducer, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { validate } from "../Util/validators";
import { useHttpClient } from "../hooks/http-hook";
import useForm from "../hooks/form-hook";
import classes from "./CommentInput.module.scss";

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

type CommentProps = {
  value?: any;
  valid?: boolean;
  postid: string;
  id: string;
  placeholder?: string;
  validators: any;
  rows?: number;
  errorText?: string | "Error!";
  commentUpdate: any;
  curComments: any;
};

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

const CommentInput: React.FC<CommentProps> = (props) => {
  const [comments, setComments] = useState<any[]>(props.curComments);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });
  //needed to know which part of form state input is updating
  //more important for multiinput forms
  const { id, commentUpdate } = props;
  const { value, isValid } = inputState;
  const [formState, inputHandler] = useForm(
    {
      comment: { value: "", isValid: false },
    },
    false
  );

  //inputhandler
  useEffect(() => {
    inputHandler(id, value, isValid);
  }, [id, value, isValid, inputHandler]);

  useEffect(() => {
    commentUpdate(comments);
    console.log(comments);
  }, [comments, commentUpdate]);

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

    setComments((comments) => [
      ...comments,
      {
        id: Math.random(),
        creatorId: { username: auth.username, image: auth.avatar },
        comment: formState.inputs.comment.value,
      },
    ]);
    dispatch({ type: "CLEAR" });
  }

  const touchHandler = (e: any) => {
    dispatch({ type: "TOUCH" });
  };
  const changeHandler = (e: any) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const formClass =
    !inputState.isValid && inputState.isTouched
      ? classes.invalid
      : classes.valid;

  return (
    <form
      onSubmit={commentSubmitHandler}
      className={classes.commentsFormWrapper}
    >
      <div className={`${classes.formControl} ${classes.input} ${formClass}`}>
        <input
          id={props.id}
          type='input'
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />

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
  );
};

export default CommentInput;
