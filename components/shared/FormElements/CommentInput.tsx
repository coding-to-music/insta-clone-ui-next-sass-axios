import React, { useEffect, useReducer } from "react";
import classes from "./CommentInput.module.scss";
import { validate } from "../../shared/Util/validators";

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
    default:
      return state;
  }
};

const CommentInput: React.FC<{
  id?: string;
  label?: string;
  element?: "input" | "textarea";
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  rows?: number;
  errorText?: string | "Error!";
  validators?: any;
  onInput: (...args: any) => void;
  value?: any;
  valid?: boolean;
}> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

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

  const formClass =
    !inputState.isValid && inputState.isTouched
      ? classes.invalid
      : classes.valid;

  return (
    <div className={`${classes.formControl} ${formClass}`}>
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
  );
};

export default CommentInput;
