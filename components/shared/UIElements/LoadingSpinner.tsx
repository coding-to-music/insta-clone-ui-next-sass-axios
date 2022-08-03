import React from "react";
import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC<{ asOverlay: boolean; asInside?: boolean }> = (props) => {
  let divClass = "";
  if (props.asOverlay) {
    divClass = classes.loadingSpinnerOverlay;
  } else if (props.asInside) {
    divClass = classes.loadingSpinnerInside;
  }

  return (
    <div className={divClass}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
};

export default LoadingSpinner;
