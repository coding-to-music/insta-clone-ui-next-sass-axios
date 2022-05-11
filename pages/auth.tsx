import useForm from "../components/shared/hooks/form-hook";
import Input from "../components/shared/FormElements/Input";
import Button from "../components/shared/FormElements/Button";
import React, { useState, useContext } from "react";
import {
  VALIDATOR_ALPHANUM,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/shared/Util/validators";
import classes from "./Auth.module.scss";
import { AuthContext } from "../components/shared/context/auth-context";
import { useRouter } from "next/router";
import ErrorModal from "../components/shared/UIElements/ErrorModal";
import LoadingSpinner from "../components/shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../components/shared/hooks/http-hook";
import { NextPage } from "next";
import ImageUpload from "../components/shared/FormElements/ImageUpload";
import Modal from "../components/shared/UIElements/Modal";
import Link from "next/link";

const Auth: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    true
  );

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let responseData;
    if (isLogin) {
      try {
        responseData = await sendRequest(
          `${process.env.SERVER}/api/users/login`,
          "POST",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          { "Content-Type": "application/json" }
        );
        authCtx.login(
          responseData.userId,
          responseData.token,
          responseData.username,
          responseData.avatar
        );
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("username", formState.inputs.username.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        responseData = await sendRequest(
          `${process.env.SERVER}/api/users/signup`,
          "POST",
          formData
        );
        if (responseData) {
          setShowEmailVerificationModal(true);
        }
        // authCtx.login(
        //   responseData.userId,
        //   responseData.token,
        //   responseData.username,
        //   responseData.avatar
        // );
        // router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  function closeEmailVerificationModal() {
    setShowEmailVerificationModal(false);
    router.reload();
  }

  const changeModeHandler = () => {
    if (!isLogin) {
      setFormData(
        { ...formState.inputs, username: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <Modal
        show={showEmailVerificationModal}
        onCancel={closeEmailVerificationModal}
        header='Please Verify Email Address'
        footerClass={classes.modalActions}
        contentClass={classes.modalContent}
        footer={<Button onClick={closeEmailVerificationModal}>OK</Button>}
      >
        <p className={classes.message}>
          Thank you for registering! Before being able to use your account you
          need to verify that this is your email address by clicking the link in
          the email we just sent you. If you cannot find it, please check your
          spam filter.
        </p>
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
          <h2>{isLogin ? "Login" : "Create a new account"}</h2>
          {!isLogin && (
            <Input
              id='username'
              element='input'
              label='Account name'
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_ALPHANUM()]}
              errorText='Alphnumeric only please'
              onInput={inputHandler}
              value={formState.inputs.username.value}
              valid={formState.inputs.username.isValid}
            />
          )}
          <div className={classes.imageContainer}>
            {!isLogin && (
              <div className={classes.onlyImage}>
                <ImageUpload
                  errorText='Please choose a valid image'
                  onInput={inputHandler}
                  center={true}
                  id='image'
                />
              </div>
            )}

            <div className={classes.imageContainerRight}>
              <Input
                id='email'
                element='input'
                label='E-Mail'
                validators={[VALIDATOR_EMAIL()]}
                errorText='Please enter a valid email address'
                onInput={inputHandler}
                value={formState.inputs.email.value}
                valid={formState.inputs.email.isValid}
              />
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
                {isLogin ? "LOGIN" : "CREATE"}
              </Button>
              <span className={classes.gap}>...</span>
              <Button type='button' inverse={true} onClick={changeModeHandler}>
                {isLogin ? "No account?" : "Have an account?"}
              </Button>
              {isLogin && (
                <Link passHref href='/pwreset'>
                  <p className={classes.pwReset}>Forgot Password?</p>
                </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
