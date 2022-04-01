import React, { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";

const CommentsBox: React.FC<{ post: String }> = (props) => {
  const [comments, setComments] = useState<any[]>([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let commentsArray;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await sendRequest(
          `${process.env.SERVER}/api/posts/comment/${props.post}`,
          "GET"
        );
        setComments(response);
      } catch (err) {}
    };
    fetchComments();
  }, [props.post, sendRequest]);

  if (comments.length > 0) {
    commentsArray = comments.map((comment: any) => {
      return (
        <p key={comment.id}>
          {comment.creatorId.username} : {comment.comment}
        </p>
      );
    });
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay={false} />}
      {!isLoading && commentsArray ? commentsArray : "No Comments found"}
    </React.Fragment>
  );
};

export default CommentsBox;
