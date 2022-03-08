import PlaceList from "../../components/places/PlaceList";
import postObj from "../../models/postObj";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorModal from "../../components/shared/UIElements/ErrorModal";

const UserPlaces: React.FC<{ data: postObj[]; myerror: any }> = (props) => {
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
      <ErrorModal error={error} onClear={errorHandler} />
      <PlaceList items={posts} />
    </React.Fragment>
  );
};
export default UserPlaces;

export async function getServerSideProps(context: any) {
  const userID = context.params.uID;
  let data = null;
  let myerror = null;
  try {
    const response = await axios({
      url: `http://localhost:5000/api/posts/user/${userID}`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }

  return { props: { data, myerror } };
}
