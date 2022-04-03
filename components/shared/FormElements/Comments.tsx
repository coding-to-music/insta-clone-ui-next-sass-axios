import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";
import classes from "./Comments.module.scss";
import { validate } from "../Util/validators";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import useForm from "../hooks/form-hook";
import { AuthContext } from "../context/auth-context";

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
  onInput?: (...args: any) => void;
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const refInput = useRef<HTMLInputElement>(null);
  let commentsArray: any = [];

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    inputHandler(id, value, isValid);
  }, [id, value, isValid, inputHandler]);

  //fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await sendRequest(
          `${process.env.SERVER}/api/posts/comment/${props.postid}`,
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
        `${process.env.SERVER}/api/posts/comment/${props.postid}`,
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

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        ref={refInput}
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
  console.log(comments);
  if (comments.length > 0) {
    commentsArray = comments.map((comment: any) => {
      return (
        <li key={comment.id} className={classes.comment}>
          <p className={classes.creator}>{comment.creatorId.username}</p>
          <p className={classes.content}>{comment.comment}</p>
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
      <ul className={classes.commentWrapper}>
        {!isLoading && commentsArray ? commentsArray : ""}
      </ul>
      <form
        onSubmit={commentSubmitHandler}
        className={classes.commentsFormWrapper}
      >
        <div className={`${classes.formControl} ${classes.input} ${formClass}`}>
          {element}
          {!inputState.isValid && inputState.isTouched ? (
            <p>{props.errorText}</p>
          ) : (
            <p></p>
          )}

          {!inputState.isValid && !inputState.isTouched ? (
            <p>Leave a comment..</p>
          ) : (
            <p></p>
          )}
        </div>
        <button
          className={classes.submit}
          type='submit'
          disabled={!formState.isValid}
        >
          Post
        </button>
      </form>
    </React.Fragment>
  );
};

export default Comments;
