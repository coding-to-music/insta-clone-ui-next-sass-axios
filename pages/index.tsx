import PlaceList from "../components/places/PlaceList";
import postObj from "../models/postObj";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";

const Feed: NextPage<{ data: postObj[]; myerror: string }> = (props) => {
  const [posts, setPosts] = useState<postObj[]>([]);

  useEffect(() => {
    if (props.data) {
      setPosts(props.data);
    }
  }, [props.data]);

  return (
    <React.Fragment>
      <Head>
        <title>Instasham</title>
        <meta name='description' content='better than instagram, maybe' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <PlaceList items={posts} />
    </React.Fragment>
  );
};
export default Feed;

export async function getServerSideProps(context: any) {
  let data = null;

  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/posts/`,
      method: "GET",
    });
    data = (await response.data) || "";
  } catch (err) {
    console.warn(err);
  }

  return { props: { data } };
}
