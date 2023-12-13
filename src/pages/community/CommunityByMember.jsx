import { Fragment } from "react";
import ListCommentByMember from "../../component/community/ListCommentByMember";
import ListPostByMember from "../../component/community/ListPostByMember";

const CommunityByMember = () => {
  return (
    <Fragment>
      <div>나의 동네생활</div>
      <ListCommentByMember />
      <ListPostByMember />
    </Fragment>
  );
};
export default CommunityByMember;

//post/list/community
