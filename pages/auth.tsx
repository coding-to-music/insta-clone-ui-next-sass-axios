import useForm from "../components/shared/hooks/form-hook";
import Input from "../components/shared/FormElements/Input";
import Button from "../components/shared/FormElements/Button";
import React, { useState, useContext } from "react";
import {
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

const Auth: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
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
          "http://localhost:5000/api/users/login",
          "POST",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          { "Content-Type": "application/json" }
        );

        authCtx.login(responseData.user.id);
        router.push("/");
      } catch (err) {}
    } else {
      try {
        responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          {
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          { "Content-Type": "application/json" }
        );
        authCtx.login(responseData.user.id);
        router.push("/");
      } catch (err) {}
    }
    console.log(responseData);
  };

  const changeModeHandler = () => {
    if (!isLogin) {
      setFormData(
        { ...formState.inputs, username: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, username: { value: "", isValid: false } },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.wrapper}>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <form className={classes.form} onSubmit={submitHandler}>
          <h2>{isLogin ? "Login" : "Create a new account"}</h2>
          {!isLogin && (
            <Input
              id='username'
              element='input'
              label='Account name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid account name'
              onInput={inputHandler}
              value={formState.inputs.username.value}
              valid={formState.inputs.username.isValid}
            />
          )}

          {!isLogin && <ImageUpload center={true} id='img id' />}
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
            errorText='Password is invalid, must be at least 6 characters'
            onInput={inputHandler}
            value={formState.inputs.password.value}
            valid={formState.inputs.password.isValid}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLogin ? "LOGIN" : "CREATE"}
          </Button>
          <Button type='button' inverse={true} onClick={changeModeHandler}>
            {isLogin ? "Need to make an account?" : "Already have an account?"}
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
