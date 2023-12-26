import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Fab,
  Grid,
  TextField,
  Collapse,
  Modal,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddIcon from "@mui/icons-material/Add";
import { addCommentAPI } from "../../apis/api/community";

const AddReply = ({ commentId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { postId } = useParams();
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
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={9} sm={9}>
          <Collapse in={isDropdownOpen}>
            <TextField
              id="content"
              label="답글을 입력해보세요"
              variant="standard"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              InputProps={{
                disableUnderline: true,
                inputProps: { maxLength: 50 },
              }}
            />
          </Collapse>
        </Grid>
        <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
          <Fab
            variant="contained"
            color="secondary"
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              aspectRatio: 1,
            }}
            onClick={isDropdownOpen ? handleSubmit : handleDropdownToggle}
          >
            {isDropdownOpen ? (
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <AddIcon />
            )}
          </Fab>
        </Grid>
      </Grid>

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
