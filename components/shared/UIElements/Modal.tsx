import classes from "./Modal.module.scss";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

const ModalOverlay: React.FC<{
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  header?: any;
  footer?: any;
  onSubmit?: () => void;
  className?: "Header" | "Content" | "Footer";
}> = ({
  header,
  onSubmit,
  headerClass,
  contentClass,
  footerClass,
  children,
  footer,
}) => {
  const [mounted, setMounted] = useState(false);

  const content = (
    <div className={classes.modal}>
      <header className={`${classes.modalHeader} ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit ? onSubmit : (e: React.FormEvent) => e.preventDefault()
        }
      >
        <div className={`${classes.modalContent} ${contentClass}`}>
          {children}
        </div>
        <footer className={footerClass}>{footer}</footer>
      </form>
    </div>
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(content, document.getElementById("drawerportal")!)
    : null;
};

const Modal: React.FC<{
  show: boolean;
  onCancel: () => void;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  header?: any;
  footer?: any;
  onSubmit?: () => void;
  className?: "Header" | "Content" | "Footer";
}> = (props) => {
  return (
    <React.Fragment>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={11100}
        classNames={{
          enter: classes.modalEnter,
          enterActive: classes.modalEnterActive,
          exit: classes.modalExit,
          exitActive: classes.modalExitActive,
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>

      {props.show && <Backdrop onClick={props.onCancel} />}
    </React.Fragment>
  );
};
export default Modal;
