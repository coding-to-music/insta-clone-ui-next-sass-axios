import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../components/shared/context/auth-context";
import { useHttpClient } from "../../../components/shared/hooks/http-hook";
import useForm from "../../../components/shared/hooks/form-hook";
import UserObj from "../../../models/userObj";
import ErrorModal from "../../../components/shared/UIElements/ErrorModal";
import Input from "../../../components/shared/FormElements/Input";
import Button from "../../../components/shared/FormElements/Button";
import classes from "./EditDesc.module.scss";
import { VALIDATOR_MINLENGTH } from "../../../components/shared/Util/validators";
import LoadingSpinner from "../../../components/shared/UIElements/LoadingSpinner";

type EditDescProps = { userData: UserObj; myerror: any };

const EditDescription: React.FC<EditDescProps> = (props) => {
  const router = useRouter();
  const { uID } = router.query;
  const auth = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest, setError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      description: { value: props.userData?.description, isValid: true },
    },
    true
  );

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.SERVER}/api/users/description/${uID}`,
        "PATCH",
        {
          description: formState.inputs.description.value,
        },
        {
          "Content-Type": "application/json",
          Authorization: `BEARER ${auth.token}`,
        }
      );
      router.push(`/user/${uID}`);
    } catch (err) {
      setError("An irregularity has been detected");
    }
  };

  const element =
    props.userData && !props.myerror ? (
      <form onSubmit={submitHandler} className={classes.form}>
        <Input
          id='description'
          element='textarea'
          label='About Me'
          errorText='Please enter a valid description'
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(0)]}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLoading ? (
            <div className={classes.spinnerWrapper}>
              <LoadingSpinner asOverlay={false} />
            </div>
          ) : (
            "UPDATE"
          )}
        </Button>
      </form>
    ) : (
      <h2>{props.myerror}</h2>
    );

  return (
    <>
      <ErrorModal onClear={clearError} error={error}></ErrorModal>
      <div className={classes.wrapper}>{element}</div>
    </>
  );
};

export default EditDescription;

export async function getServerSideProps(context: any) {
  const userID = context.params.uID;
  let userData = null;
  let myerror = null;
  try {
    const userResponse = await axios({
      url: `${process.env.SERVER}/api/users/un/${userID}`,
      method: "GET",
    });
    userData = await userResponse.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }
  return { props: { userData, myerror } };
}
