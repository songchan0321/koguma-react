import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ReviewProductBar = ({ data }) => {
  return (
    <>
      {data && (
        <Card id={data.id} sx={{ maxWidth: "100%" }}>
          <CardHeader
            avatar={
              <Avatar
                alt="/photo.png"
                src={
                  data.imageDTO && data.imageDTO.length > 0
                    ? data.imageDTO[0].url
                    : "/photo.png"
                }
                variant="square"
                sx={{ width: 100, height: 100, mr: 1 }}
              />
            }
            title={
              <Box>
                <Typography variant="h6" color="textSecondary">
                  {data.title}
                </Typography>
              </Box>
            }
            subheader={
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="subtitle1" color="textSecondary">
                      <span>
                        <span>거래한 회원 </span>
                        <b>{data.sellerDTO.nickname}</b>
                      </span>
                    </Typography>
                  </div>
                </Box>
              </>
            }
          />
        </Card>
      )}
    </>
  );
};
export default ReviewProductBar;
