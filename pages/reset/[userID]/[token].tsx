import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Modal from "../../../components/shared/UIElements/Modal";
import classes from "./reset.module.scss";
import Button from "../../../components/shared/FormElements/Button";
import { useHttpClient } from "../../../components/shared/hooks/http-hook";
import useForm from "../../../components/shared/hooks/form-hook";
import Input from "../../../components/shared/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../../components/shared/Util/validators";
import LoadingSpinner from "../../../components/shared/UIElements/LoadingSpinner";

//http://localhost:5000/api/users/62773742d256d3b0a4abb749/verify/
//107799f275637d314e71d65c5d4995bac766bd495f770ad7e1f3f0d433703283
const Verify: NextPage<{ data: any; myerror: any }> = (props) => {
  const [showEmailVerifiedModal, setShowEmailVerifiedModal] = useState(false);
  const [showPWChangedModal, setShowPWChangedModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      password: { value: "", isValid: false },
    },
    true
  );
  const { userID, token } = router.query;
  let inputForm = null;

  console.log(props.data);
  console.log(props.myerror);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.SERVER}/api/users/${userID}/resetPass/${token}`,
        "POST",
        {
          password: formState.inputs.password.value,
        },
        { "Content-Type": "application/json" }
      );
      setSuccessMessage(responseData.message);
      setShowPWChangedModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  function closeEmailVerificationModal() {
    setShowEmailVerifiedModal(false);
  }
  function closePWChangedModal() {
    setShowPWChangedModal(false);
    router.push("/auth");
  }

  if (props.data) {
    inputForm = (
      <div className={classes.wrapper}>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <form className={classes.form} onSubmit={submitHandler}>
          <h2>Password Reset</h2>
          <p style={{ marginBottom: ".6rem" }}>
            Enter your desired new password below
          </p>
          <Input
            id='password'
            element='input'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Must be at least 6 characters'
            onInput={inputHandler}
            value={formState.inputs.password.value}
            valid={formState.inputs.password.isValid}
          />
          <Button type='submit' disabled={!formState.isValid}>
            SUBMIT
          </Button>
        </form>
      </div>
    );
  } else {
    inputForm = (
      <div className={classes.wrapper}>
        <h1>Invalid Password Reset Link</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Modal
        show={showPWChangedModal}
        onCancel={closePWChangedModal}
        header='Password Changed'
        footerClass={classes.modalActions}
        contentClass={classes.modalContent}
        footer={<Button onClick={closePWChangedModal}>OK</Button>}
      >
        <p>{successMessage}</p>
      </Modal>
      <Modal
        show={showEmailVerifiedModal}
        onCancel={closeEmailVerificationModal}
        header='Email Verification'
        footerClass={classes.modalActions}
        contentClass={classes.modalContent}
        footer={<Button onClick={closeEmailVerificationModal}>OK</Button>}
      >
        <p>{props.data?.message}</p>
      </Modal>
      {inputForm}
    </React.Fragment>
  );
};

export default Verify;

export async function getServerSideProps(context: any) {
  const userID = context.params.userID;
  const token = context.params.token;

  let data = null;
  let myerror = null;

  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/users/${userID}/requestPWR/${token}`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }
  return { props: { data, myerror } };
}
