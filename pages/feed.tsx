import type { NextPage } from "next";
import React from "react";
import Users from "./Users";
import axios, { AxiosError } from "axios";
import UserObj from "../models/userObj";
import classes from "../pages/posts/NewPost.module.scss";

const Home: NextPage<{ data: UserObj[]; myerror: any }> = (props) => {
  return (
    <React.Fragment>
      {/* <Users data={props.data} />
      {props.myerror && (
        <p className={classes.placeForm}>
          Error fetching users: {props.myerror}
        </p>
      )} */}
    </React.Fragment>
  );
};

export default Home;

// export async function getStaticProps() {
//   let data = null;
//   let myerror = null;
//   try {
//     const response = await axios({
//       url: `${process.env.SERVER}/api/users`,
//       method: "GET",
//     });
//     data = await response.data;
//   } catch (err) {
//     const error = err as AxiosError;
//     myerror = error.response?.data.message || null;
//   }

//   return { props: { data, myerror }, revalidate: 30 };
// }
