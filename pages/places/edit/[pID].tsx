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

const post1: postObj = {
  id: "p1",
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
  title: "My day off!",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  creatorId: "u1",
  address: "Atlantic City, NJ",
  coordinates: { lat: 39.3651633, lng: -74.4246609 },
};
const post2: postObj = {
  id: "p2",
  image:
    "https://images.unsplash.com/photo-1586751287766-b0d6eaee95ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  title: "Vacay!",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  creatorId: "u2",
  address: "Port Republic, NJ",
  coordinates: { lat: 39.52071742405363, lng: -74.50259282157384 },
};
const Posts: postObj[] = [post1, post2];

const Update: React.FC<{ filteredPosts?: postObj }> = (props) => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: props.filteredPosts?.title, isValid: true },
      description: { value: props.filteredPosts?.description, isValid: true },
    },
    true
  );

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  const element = props.filteredPosts ? (
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
        UPDATE PLACE
      </Button>
    </form>
  ) : (
    <h2>No Post with that ID found :(</h2>
  );

  return <div className={classes.wrapper}>{element}</div>;
};
export default Update;

export function getServerSideProps(context: any) {
  const postID = context.params.pID;

  const filteredPosts = Posts.find((post) => {
    return post.id === postID;
  });

  return { props: { filteredPosts: filteredPosts } };
}
