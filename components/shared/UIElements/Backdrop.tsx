import React from "react";
import ReactDOM from "react-dom";
import classes from "./Backdrop.module.scss";
import { useEffect, useState } from "react";

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={onClick}></div>,
        document.getElementById("backdrop")!
      )
    : null;
};

export default Backdrop;
