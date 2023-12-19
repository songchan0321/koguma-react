import { Avatar, CardHeader } from "@mui/material";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const ChoiceMember = ({ data }) => {
  return (
    <CardHeader
      avatar={
        <Avatar
          alt="/photo.png"
          // src={
          //     data.buyerDTO.image &&

          //     ? prod.productDTO.imageDTO[0].url
          //     : "/photo.png"
          // }
          // variant="square"
          // sx={{ width: 100, height: 100, mr: 1 }}
        />
      }
      title={data.buyerDTO.nickname}
      subheader={<>최근 대화일 {formatTimeAgo(data.regDate)}</>}
    />
  );
};
export default ChoiceMember;
