import { NextPage } from "next";
import React, { useState } from "react";
import Input from "../components/shared/FormElements/Input";
import useForm from "../components/shared/hooks/form-hook";
import { useHttpClient } from "../components/shared/hooks/http-hook";
import { VALIDATOR_EMAIL } from "../components/shared/Util/validators";
import classes from "./pwreset.module.scss";
import { useRouter } from "next/router";
import Button from "../components/shared/FormElements/Button";
import ErrorModal from "../components/shared/UIElements/ErrorModal";
import LoadingSpinner from "../components/shared/UIElements/LoadingSpinner";
import Modal from "../components/shared/UIElements/Modal";

const PWreset: NextPage = (props) => {
  const router = useRouter();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [showModal, setShowModal] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
    },
    false
  );

  function closeModalHandler() {
    setShowModal(false);
    router.push(`/auth`);
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.SERVER}/api/users/pwreset`,
        "POST",
        {
          email: formState.inputs.email.value,
        },
        { "Content-Type": "application/json" }
      );
      if (responseData) {
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header='Password Reset'
        footerClass={classes.modalActions}
        contentClass={classes.modalContent}
        footer={<Button onClick={closeModalHandler}>OK</Button>}
      >
        <p>Password reset email sent!</p>
      </Modal>
      <ErrorModal
        footerClass={classes.modalActions}
        contentClass={classes.modalContent}
        error={error}
        onClear={clearError}
      />
      <div className={classes.wrapper}>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <form className={classes.form} onSubmit={submitHandler}>
          <h2>Reset Request</h2>
          <p style={{ marginBottom: ".4rem" }}>
            Please enter your accounts email address below, we will then send an
            email to your address with a link to change your password.
          </p>
          <Input
            id='email'
            element='input'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address'
            onInput={inputHandler}
            value={formState.inputs.email.value}
            valid={formState.inputs.email.isValid}
          />
          <Button type='submit' disabled={!formState.isValid}>
            SUBMIT
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PWreset;
