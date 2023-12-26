import { Avatar, CardHeader } from "@mui/material";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const ChoiceMember = ({ data }) => {
  return (
    <CardHeader
      avatar={
        <Avatar
          aria-label="recipe"
          style={{ width: "48px", height: "48px" }} // Avatar 크기 조정
          src={data.buyerDTO?.profileURL}
          alt=""
        ></Avatar>
      }
      title={data.buyerDTO.nickname}
      subheader={<>최근 대화일 {formatTimeAgo(data.regDate)}</>}
    />
  );
};
export default ChoiceMember;
