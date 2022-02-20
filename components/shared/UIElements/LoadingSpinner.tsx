import React from "react";
import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC<{ asOverlay: boolean }> = (props) => {
  const divClass = props.asOverlay ? classes.loadingSpinnerOverlay : "";

  return (
    <div className={divClass}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
};

export default LoadingSpinner;
