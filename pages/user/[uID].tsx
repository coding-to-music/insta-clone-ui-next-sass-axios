import PlaceGrid from "../../components/places/PlaceGrid";
import postObj from "../../models/postObj";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorModal from "../../components/shared/UIElements/ErrorModal";
import UserCard from "../../components/user/UserCard";
import UserObj from "../../models/userObj";

type UserPlacesProps = {
  postData: postObj[];
  userData: UserObj;
};

const UserPlaces: React.FC<UserPlacesProps> = (props) => {
  // const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<postObj[]>([]);

  useEffect(() => {
    if (props.postData) {
      setPosts(props.postData);
    }
    // setError(props.myerror);
  }, [props.postData]);

  // const errorHandler = () => {
  //   setError(null);
  // };

  return (
    <React.Fragment>
      <UserCard userData={props.userData}></UserCard>
      {/* <ErrorModal error={error} onClear={errorHandler} /> */}
      <PlaceGrid items={posts} />
      {/* <PlaceList items={posts} /> */}
    </React.Fragment>
  );
};
export default UserPlaces;

export async function getServerSideProps(context: any) {
  const user = context.params.uID;
  let postData = null;
  let userData = null;
  let myerror = null;
  try {
    const userResponse = await axios({
      url: `${process.env.SERVER}/api/users/un/${user}`,
      method: "GET",
    });
    userData = await userResponse.data;
    const response = await axios({
      url: `${process.env.SERVER}/api/posts/user/${user}`,
      method: "GET",
    });
    postData = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }

  return { props: { userData, postData } };
}
