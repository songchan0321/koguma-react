import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; //채워진 하트
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 안채워진 하트
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

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

const MyList = ({ buttonNM, selectedActions, onClick }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={
            <CardMedia
              component="img"
              height="120"
              image="/photo.png"
              alt="Paella dish"
            />
          }
          title={
            <Box>
              <Typography variant="h6" color="textSecondary">
                상품 이름
              </Typography>
            </Box>
          }
          subheader={
            <>
              <Typography variant="subtitle2" color="textSecondary">
                동 이름, 끌어올린 시간
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="h6" color="textSecondary">
                    상품 가격
                  </Typography>
                </div>
                <div id="icongroup" sx={{ marginTop: 100 }}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                  </IconButton>
                  1
                  <IconButton aria-label="add to favorites">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  5
                </div>
              </Box>
            </>
          }
        />
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ flex: 6, marginLeft: "10px" }}
            onClick={onClick}
          >
            {buttonNM}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleModalOpen}
            style={{ flex: 1, marginLeft: "10px", marginRight: "10px" }}
          >
            <MoreHorizIcon />
          </Button>
        </div>
      </Card>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>상품 설정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedActions.name.map((selectedAction, idx) => (
              <MenuItem
                key={idx}
                onClick={() => navigate("/product/review/add")}
              >
                {selectedAction}
              </MenuItem>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default MyList;
