import React from "react";
import Modal from "./Modal";
import Button from "../FormElements/Button";
import classes from "./ErrorModal.module.scss";

const ErrorModal: React.FC<{ onClear: () => void; error: string | null }> = (
  props
) => {
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p className={classes.stuff}>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
