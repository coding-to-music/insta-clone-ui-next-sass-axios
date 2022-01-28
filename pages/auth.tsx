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

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formState.inputs);
    authCtx.login();
    router.push("/");
  };

  const changeModeHandler = () => {
    if (!isLogin) {
      setFormData(
        { ...formState.inputs, login: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, login: { value: "", isValid: false } },
        false
      );
    }
    console.log(formState.isValid);
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>{isLogin ? "Login" : "Create a new account"}</h2>
        {!isLogin && (
          <Input
            id='login'
            element='input'
            label='Account name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid account name'
            onInput={inputHandler}
            value={formState.inputs.login.value}
            valid={formState.inputs.login.isValid}
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
          errorText='Password is invalid, must be at least 5 characters'
          onInput={inputHandler}
          value={formState.inputs.password.value}
          valid={formState.inputs.password.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          LOGIN
        </Button>
        <Button type='button' inverse={true} onClick={changeModeHandler}>
          {isLogin ? "Need to make an account?" : "Already have an account?"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
