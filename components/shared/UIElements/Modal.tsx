import classes from "./Modal.module.scss";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

type ModalProps = {
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  header?: any;
  footer?: any;
  onSubmit?: () => void;
  className?: "Header" | "Content" | "Footer";
  ref?: any;
};

const ModalOverlay: React.FC<ModalProps> = forwardRef<
  HTMLDivElement,
  ModalProps
>((props, ref) => {
  ModalOverlay.displayName = "ModalOverlay";
  const [mounted, setMounted] = useState(false);

  const content = (
    <div ref={ref} className={classes.modal}>
      <header className={`${classes.modalHeader} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (e: React.FormEvent) => e.preventDefault()
        }
      >
        <div className={`${classes.modalContent} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={props.footerClass}>{props.footer}</footer>
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
});

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
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        nodeRef={modalRef}
        timeout={300}
        classNames={{
          enter: classes.modalEnter,
          enterActive: classes.modalEnterActive,
          exit: classes.modalExit,
          exitActive: classes.modalExitActive,
        }}
      >
        <ModalOverlay ref={modalRef} {...props} />
      </CSSTransition>
      {props.show && <Backdrop onClick={props.onCancel} />}
    </React.Fragment>
  );
};
export default Modal;
