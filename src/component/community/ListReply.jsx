import { Fragment } from "react";
import GetReply from "./GetReply";

const ListReply = ({commentId}) => {
  return (
    <Fragment>
      <GetReply commentId={commentId}/>
    </Fragment>
  );
};

export default ListReply;
