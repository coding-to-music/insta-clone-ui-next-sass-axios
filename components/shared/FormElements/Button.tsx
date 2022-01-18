import React from "react";
import Link from "next/link";
import classes from "./Button.module.scss";

const Button: React.FC<{
  href?: string;
  inverse?: boolean;
  danger?: boolean;
  size?: "Small" | "Big";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
}> = (props) => {
  const inverseClass = props.inverse ? classes.buttonInverse : "";
  const dangerClass = props.danger ? classes.buttonDanger : "";
  const buttonSize = props.size ? `button${props.size}` : "";
  if (props.href) {
    return (
      <Link href={props.href} passHref>
        <a
          className={`${classes.button} ${buttonSize} ${inverseClass} ${dangerClass}`}
        >
          {props.children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={`${classes.button} ${buttonSize} ${inverseClass} ${dangerClass}`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
