import Input from "../../components/shared/FormElements/Input";
import classes from "./NewPost.module.scss";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../components/shared/Util/validators";
import Button from "../../components/shared/FormElements/Button";
import useForm from "../../components/shared/hooks/form-hook";
import { useHttpClient } from "../../components/shared/hooks/http-hook";
import React, { useContext } from "react";
import { AuthContext } from "../../components/shared/context/auth-context";
import ErrorModal from "../../components/shared/UIElements/ErrorModal";
import LoadingSpinner from "../../components/shared/UIElements/LoadingSpinner";
import { useRouter } from "next/router";
import ImageUpload from "../../components/shared/FormElements/ImageUpload";

const NewPost: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const placeSubmitHandler = async (e: any) => {
    e.preventDefault();
    let response;
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      response = await sendRequest(
        `${process.env.SERVER}/api/posts/`,
        "POST",
        formData,
        { Authorization: `BEARER ${auth.token}` }
      );
      router.push(`/posts/${response.id}`);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <form className={classes.placeForm} onSubmit={placeSubmitHandler}>
        <div className={classes.imagePrev}>
          <ImageUpload
            errorText='PNG/JPG only please.'
            onInput={inputHandler}
            center={true}
            id='image'
          />
        </div>
        <Input
          id='title'
          label='Title'
          type='text'
          validators={[VALIDATOR_REQUIRE()]}
          element='input'
          errorText='Please enter a valid entry'
          onInput={inputHandler}
        />
        <Input
          id='address'
          label='Address'
          type='text'
          validators={[VALIDATOR_REQUIRE()]}
          element='input'
          errorText='Please enter a valid address'
          onInput={inputHandler}
        />
        <Input
          id='description'
          label='Description'
          type='textarea'
          validators={[VALIDATOR_MINLENGTH(5)]}
          element='textarea'
          errorText='Please enter a valid description (5 characters)'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          POST!
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
