import PlaceList from "../components/places/PlaceList";
import postObj from "../models/postObj";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorModal from "../components/shared/UIElements/ErrorModal";
import type { NextPage } from "next";
import Head from "next/head";

const Feed: NextPage<{ data: postObj[]; myerror: string }> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<postObj[]>([]);

  useEffect(() => {
    if (props.data) {
      setPosts(props.data);
    }
    setError(props.myerror);
  }, [props.data, props.myerror]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Instasham</title>
        <meta name='description' content='better than instagram, maybe' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ErrorModal error={error} onClear={errorHandler} />
      <PlaceList items={posts} />
    </React.Fragment>
  );
};
export default Feed;

export async function getServerSideProps(context: any) {
  let data = null;
  let myerror = null;
  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/posts/`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }

  return { props: { data, myerror } };
}
