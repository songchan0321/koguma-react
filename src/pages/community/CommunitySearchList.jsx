import { Fragment } from "react";
import MarginEmpty from "../../component/payment/MarginEmpty";
import PostThumbnail from "../../component/community/PostThumbnail";
import { callPostListAPI } from "../../apis/api/community";

const CommunitiySearchList = ({ query }) => {
  return (
    <Fragment>
      <MarginEmpty value={"8.0rem"} />
      <PostThumbnail callAPI={callPostListAPI} callParam={query} />

      <MarginEmpty />
    </Fragment>
  );
};
export default CommunitiySearchList;
