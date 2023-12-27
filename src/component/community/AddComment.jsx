import {
  Box,
  Button,
  Fab,
  Grid,
  TextField,
  Modal,
  Typography,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import { addCommentAPI } from "../../apis/api/community";
import { useParams } from "react-router-dom";

const AddComment = () => {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    writerId: 0,
    postId: postId,
    content: "",
    activeFlag: true,
    parentId: null,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const red = "#FF0000";
  const handleSubmit = async (event) => {
    if (formData.content.length === 0) {
      // 텍스트 필드에 아무것도 입력되지 않았을 때 모달 열기
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

      // 입력창 초기화
      setFormData({
        writerId: 0,
        postId: postId,
        content: "",
        activeFlag: true,
        parentId: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleCloseModal = () => {
    // 모달을 닫을 때 모달 상태 업데이트
    setModalOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={9} sm={9}>
          <TextField
            id="content"
            label="댓글을 입력해보세요"
            variant="standard"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              inputProps: { maxLength: 50 },
            }}
          />
        </Grid>
        <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
          <Fab
            variant="contained"
            color="secondary"
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "60%",
              aspectRatio: 1,
            }}
            onClick={handleSubmit}
          >
            <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
          </Fab>
        </Grid>
      </Grid>

      {/* 모달 */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              color: red,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReportIcon sx={{ fontSize: "2rem", marginRight: "8px" }} />
            주의!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            한 글자 이상 작성해야합니다.
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
          >
            확인
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddComment;
