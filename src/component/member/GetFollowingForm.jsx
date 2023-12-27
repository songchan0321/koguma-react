import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteFollowingAPI, getFollowingAPI } from "../../apis/api/member";
import { useModal } from "../../context/ModalContext";
import Modal from "../common/Modal";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import Back from "../../component/common/Back";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB7", // 보라색
    },
  },
});

const GetFollowingForm = () => {
  const { targetMemberId } = useParams();
  const [getFollowing, setGetFollowing] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnfollowing = async () => {
    handleClose(); // 다이얼로그를 닫음
    try {
      await deleteFollowingAPI(targetMemberId);
      await openModal("팔로우를 취소했습니다!", true, () => {
        navigate("/member/relationship/following/list");
      });
    } catch (error) {
      console.error("팔로잉을 해제하는 도중 에러 발생:", error);
    }
  };

  useEffect(() => {
    const fetchGetFollowing = async () => {
      try {
        const followingData = await getFollowingAPI(targetMemberId);
        console.log("Block Data:", followingData);
        setGetFollowing(followingData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching following data:", error);
        setLoading(false);
      }
    };

    fetchGetFollowing();
  }, [targetMemberId]);

  // 날짜 부분만 추출하는 함수
  const extractDate = (fullDate) => {
    const dateObj = new Date(fullDate);
    return dateObj.toISOString().split("T")[0];
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ textAlign: "center" }}>
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <div>
            <Modal />
            <img
              src={getFollowing.targetMember.profileURL}
              alt=""
              style={{
                width: "8rem",
                height: "8rem",
                marginTop: "100px",
                clipPath: "circle(50% at 50% 50%)",
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "40px",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              닉네임: {getFollowing.targetMember.nickname}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "1rem" }}
            >
              팔로우 메모: {getFollowing.content}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "1rem" }}
            >
              팔로우 일시: {extractDate(getFollowing.targetMember.regDate)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              style={{ marginTop: "20px", backgroundColor: "#D070FB" }}
            >
              팔로우 취소
            </Button>
            <Back />

            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{ sx: { borderRadius: "1rem" } }}
            >
              <DialogContent>
                <DialogContentText color="error">{error}</DialogContentText>
                팔로우를 취소하시겠습니까?
              </DialogContent>
              <DialogActions
                sx={{ pt: 0, display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                    border: "1px solid rgba(0,0,0, 0.2)",
                    color: "black",
                    width: "90%",
                  }}
                  onClick={handleClose}
                >
                  취소
                </Button>
              </DialogActions>
              <DialogActions
                sx={{
                  pt: 0,
                  pb: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "90%", backgroundColor: "#D070FB" }}
                  color="secondary"
                  onClick={handleUnfollowing}
                >
                  확인
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default GetFollowingForm;
