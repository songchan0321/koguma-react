import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {
  Box,
  Button,
  Grid,
  Collapse,
  Modal,
  Typography,
  InputBase,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import { addCommentAPI } from "../../apis/api/community";

const AddReply = ({ commentId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    writerId: 0,
    postId: postId,
    content: "",
    activeFlag: true,
    parentId: commentId,
  });

  const handleSubmit = async (event) => {
    if (formData.content.trim() === "") {
      // 입력 내용이 비어있을 때 모달 열기
      setModalOpen(true);
      return;
    }

    try {
      const { data } = await addCommentAPI(
        formData.postId,
        formData.writerId,
        formData.content,
        formData.activeFlag,
        formData.parentId
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    // 드랍다운 닫기
    setDropdownOpen(false);

    // 입력창 초기화
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: "",
    }));
    navigate(`/post/${postId}`);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 0, width: "100%" },
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <div style={{ position: "relative", marginLeft: 0 }}>
        <Grid container alignItems="flex-end">
          <Grid>
            <Collapse in={isDropdownOpen}>
              {/* <TextField
              id="content"
              // label="답글을 입력해보세요"
              variant="standard"
              value={formData.content}
              onChange={handleChange}
              // fullWidth
              // sx={{ backgroundColor: "#E9ECEF", p: "2rem" }}
              InputProps={{
                disableUnderline: true,
                inputProps: { maxLength: 50 },
                sx: {
                  backgroundColor: "#E9ECEF",
                  pl: "2rem",
                  borderRadius: "3rem",
                },
              }}
            /> */}
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  width: "100%",
                  backgroundColor: "#E7E3E3",
                }}
              >
                <InputBase
                  sx={{ ml: 1, pl: "0.3rem" }}
                  id="content"
                  placeholder="답글을 입력해주세요."
                  value={formData.content}
                  onChange={handleChange}
                />
                <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
                <IconButton
                  disabled={formData.content === ""}
                  color="secondary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                  onClick={handleSubmit}
                >
                  <RateReviewIcon />
                </IconButton>
              </Paper>
            </Collapse>
          </Grid>
        </Grid>
        {!isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              right: "0",
              bottom: "-1.3rem",
              // backgroundColor: "black",
            }}
          >
            <Button
              onClick={isDropdownOpen ? handleSubmit : handleDropdownToggle}
            >
              답글 작성
            </Button>
          </div>
          // <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
          //   <Fab
          //     variant="contained"
          //     color="secondary"
          //     style={{
          //       height: "35px",
          //       width: "35px",
          //       borderRadius: "50%",
          //       aspectRatio: 1,
          //     }}
          //     onClick={isDropdownOpen ? handleSubmit : handleDropdownToggle}
          //   >
          //     {isDropdownOpen ? (
          //       <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
          //     ) : (
          //       <AddIcon />
          //     )}
          //   </Fab>
          // </Grid>
        )}
      </div>

      {/* 모달 */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            color="error.main"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            경고!
          </Typography>
          <Typography>답글 내용을 입력해주세요.</Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            확인
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddReply;
