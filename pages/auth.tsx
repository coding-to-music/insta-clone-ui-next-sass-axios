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
import axios, { AxiosError } from "axios";

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const authCtx = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      //   login: { value: "", isValid: true },
    },
    true
  );

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let response;
    setIsLoading(true);
    if (isLogin) {
      try {
        response = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = await response.data;
        setIsLoading(false);
        authCtx.login();
        router.push("/");
      } catch (err) {
        const error = err as AxiosError;
        setError(error.response?.data.message);
        setIsLoading(false);
      }
    } else {
      try {
        response = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = await response.data;
        console.log(data);
        setIsLoading(false);
        authCtx.login();
        router.push("/");
      } catch (err) {
        const error = err as AxiosError;
        setError(error.response?.data.message);
        setIsLoading(false);
      }
    }
    console.log(response);
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
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
