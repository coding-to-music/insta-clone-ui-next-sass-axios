import classes from "./SideDrawer.module.scss";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const SideDrawer: React.FC<{ show: boolean; onClick: () => void }> = (
  props
) => {
  const [mounted, setMounted] = useState(false);

  const drawer = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={props.onClick} className={classes.sideDrawer}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(drawer, document.getElementById("drawerportal")!)
    : null;
};

export default SideDrawer;
