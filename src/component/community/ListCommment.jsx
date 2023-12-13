import { Fragment } from "react";
import GetComment from "./GetComment";

const ListComment = () => {
  return (
    <Fragment>
      <div>댓글리스트</div>
      <GetComment />
      <GetComment />
      <GetComment />
    </Fragment>
  );
};

export default ListComment;
