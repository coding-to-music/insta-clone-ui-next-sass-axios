import UsersList from "../components/user/UsersList";
import UserObj from "../models/userObj";
import { useEffect, useState } from "react";
import React from "react";
import { NextPage } from "next";

const Users: NextPage<{ data: UserObj[] }> = (props) => {
  const [users, setUsers] = useState<UserObj[]>([]);

  useEffect(() => {
    setUsers(props.data);
  }, [props.data]);

  return (
    <React.Fragment>{users && <UsersList items={users} />}</React.Fragment>
  );
};

export default Users;
