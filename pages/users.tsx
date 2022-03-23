import UsersList from "../components/user/UsersList";
import UserObj from "../models/userObj";
import { useEffect, useState } from "react";
import React from "react";
import { NextPage } from "next";
import axios, { AxiosError } from "axios";

const Users: NextPage<{ data: UserObj[]; myerror: any }> = (props) => {
  const [users, setUsers] = useState<UserObj[]>([]);

  useEffect(() => {
    setUsers(props.data);
  }, [props.data]);

  return (
    <React.Fragment>{users && <UsersList items={users} />}</React.Fragment>
  );
};

export default Users;

export async function getServerSideProps() {
  let data = null;
  let myerror = null;
  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/users`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message || null;
  }

  return { props: { data, myerror } };
}
