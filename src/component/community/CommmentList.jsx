import { Fragment } from "react";
import GetComment from "./GetComment";

const CommentList = () => {
  return (
    <Fragment>
      <div>댓글리스트</div>
      <GetComment />
      <GetComment />
      <GetComment />
    </Fragment>
  );
};

export default CommentList;
