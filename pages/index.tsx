import PlaceList from "../components/places/PlaceList";
import postObj from "../models/postObj";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import classes from "./Feed.module.scss";
import useScrollPosition from "../components/shared/hooks/scroll-hook";
import Button from "../components/shared/FormElements/Button";
import PlaceItem from "../components/places/PlaceItem";

const Feed: NextPage<{ posts: postObj[]; myerror: string }> = (props) => {
  const [posts, setPosts] = useState<postObj[]>([]);
  const [skip, setSkip] = useState(0);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (props.posts) {
      setPosts(props.posts);
    }
  }, [props.posts]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const request = await fetch(
          `${process.env.SERVER}/api/posts?skip=${skip}`
        );
        const response = await request.json();
        setPosts([...posts, ...response]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  useLayoutEffect(() => {
    if (scrollPosition > document.body.offsetHeight - window.innerHeight) {
      console.log("at bottom");
      setSkip(posts.length);
    }
    console.log(scrollPosition, window.innerHeight, document.body.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  if (props.posts.length === 0) {
    return (
      <React.Fragment>
        <Head>
          <title>Instasham</title>
          <meta name='description' content='better than instagram, maybe' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className={`${classes.placeList} ${classes.notFound}`}>
          <h2>No Posts found. Try creating one!</h2>
          <Button href='/posts/new'>Create a Post!</Button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Instasham</title>
        <meta name='description' content='better than instagram, maybe' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ul className={classes.placeList}>
        {posts.map((post) => (
          <PlaceItem key={post.id} post={post} />
        ))}
      </ul>
    </React.Fragment>
  );
};
export default Feed;

export async function getServerSideProps(context: any) {
  let posts = null;

  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/posts/`,
      method: "GET",
    });
    posts = (await response.data) || "";
  } catch (err) {
    console.warn(err);
  }

  return { props: { posts } };
}
