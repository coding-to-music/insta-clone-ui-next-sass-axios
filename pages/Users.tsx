import axios, { AxiosError } from "axios";
import UsersList from "../components/user/UsersList";
import UserObj from "../models/userObj";
import { useEffect, useState } from "react";
import ErrorModal from "../components/shared/UIElements/ErrorModal";
import React from "react";
import LoadingSpinner from "../components/shared/UIElements/LoadingSpinner";

// const user1: UserObj = {
//   id: "u1",
//   name: "Mike Haslinsky",
//   image: "https://i.imgur.com/k7zmyLI.jpeg",
//   places: 3,
// };
// const user2: UserObj = {
//   id: "u2",
//   name: "Valon Rama",
//   image: "https://i.imgur.com/zTbh6K1.jpeg",
//   places: 1,
// };

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserObj[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const usersResponse = await axios
        .get("http://localhost:5000/api/users")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          const error = err as AxiosError;
          setError(error.response?.data.message);
          setIsLoading(false);
        });
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <UsersList items={users} />
    </React.Fragment>
  );
};

export default Users;

// export async function getStaticProps() {
//   const usersResponse = await axios.get("http://localhost:5000/api/users");
//   return { props: { usersResponse }, revalidate: 30 };
// }
