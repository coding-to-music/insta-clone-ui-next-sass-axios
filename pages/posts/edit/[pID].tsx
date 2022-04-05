import postObj from "../../../models/postObj";
import classes from "./Update.module.scss";
import Input from "../../../components/shared/FormElements/Input";
import Button from "../../../components/shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../components/shared/Util/validators";
import useForm from "../../../components/shared/hooks/form-hook";
import React from "react";
import axios, { AxiosError } from "axios";
import { useHttpClient } from "../../../components/shared/hooks/http-hook";
import { useRouter } from "next/router";
import ErrorModal from "../../../components/shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/shared/UIElements/LoadingSpinner";
import { AuthContext } from "../../../components/shared/context/auth-context";
import { useContext } from "react";

const Update: React.FC<{ data: postObj; myerror: any }> = (props) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { pID } = router.query;
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: props.data?.title, isValid: true },
      address: { value: props.data?.address, isValid: true },
      description: { value: props.data?.description, isValid: true },
    },
    true
  );

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.SERVER}/api/posts/${pID}`,
        "PATCH",
        {
          title: formState.inputs.title.value,
          address: formState.inputs.address.value,
          description: formState.inputs.description.value,
        },
        {
          "Content-Type": "application/json",
          Authorization: `BEARER ${auth.token}`,
        }
      );
      router.push(`/posts/${pID}`);
    } catch (err) {}
  };

  const element =
    props.data && !props.myerror ? (
      <form onSubmit={submitHandler} className={classes.form}>
        <Input
          id='title'
          element='input'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title'
          onInput={inputHandler}
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter an address'
          onInput={inputHandler}
          value={formState.inputs.address.value}
          valid={formState.inputs.address.isValid}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (5 characters min)'
          onInput={inputHandler}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          UPDATE POST
        </Button>
      </form>
    ) : (
      <h2>{props.myerror}</h2>
    );

  return (
    <React.Fragment>
      <ErrorModal onClear={clearError} error={error}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <div className={classes.wrapper}>{element}</div>
    </React.Fragment>
  );
};
export default Update;

export async function getServerSideProps(context: any) {
  const postID = context.params.pID;

  let data = null;
  let myerror = null;

  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/posts/${postID}`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }
  return { props: { data, myerror } };
}
