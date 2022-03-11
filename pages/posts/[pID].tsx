import { NextPage } from "next";
import PlaceItem from "../../components/places/PlaceItem";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import postObj from "../../models/postObj";
import ErrorModal from "../../components/shared/UIElements/ErrorModal";
import classes from "./Post.module.scss";

const Post: NextPage<{ data: postObj; myerror: string }> = (props) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(props.myerror);
  }, [props.myerror]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className={classes.wrapper}>
      <ErrorModal error={error} onClear={errorHandler} />
      {!props.myerror && <PlaceItem post={props.data} />}
    </div>
  );
};

export default Post;

export async function getServerSideProps(context: any) {
  const postID = context.params.pID;
  let data = null;
  let myerror = null;
  try {
    const response = await axios({
      url: `http://localhost:5000/api/posts/${postID}`,
      method: "GET",
    });
    data = await response.data;
    console.log(data);
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
    console.log(myerror);
  }

  return { props: { data, myerror } };
}
