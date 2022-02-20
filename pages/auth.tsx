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

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
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

    if (isLogin) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/api/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.warn(err);
      }
    }

    authCtx.login();
    router.push("/");
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
    <div className={classes.wrapper}>
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
  );
};

export default Auth;
