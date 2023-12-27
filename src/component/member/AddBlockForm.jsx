import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import Modal from "../common/Modal";

// 테마 정의
const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB7",
    },
  },
});

const AddBlockForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { openModal } = useModal();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    handleClose();
    try {
      // API 호출
      const response = await authInstance.post(
        `/member/relationship/block/add/`,
        {
          targetMember: {
            id: location.state.id,
          },
          content,
          memberRelationshipType: "BLOCK",
        }
      );

      console.log("응답 상태 코드:", response.status);
      console.log("응답 내용:", response.data);

      if (response.status === 200) {
        // 팔로우 추가 성공 시 리스트로 이동
        onSubmit();
        openModal("회원을 차단했습니다!", true, () => {
          navigate("/member/relationship/block/list");
        });
      } else {
        window.alert("차단 추가 실패.");
      }
    } catch (error) {
      window.alert("차단 추가 중 오류 발생");
    }
  };

  useEffect(() => {
    // id가 변경될 때마다 처리하는 로직 추가 가능
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Modal />
        <TextField
          label="차단 사유"
          value={content}
          onChange={handleContentChange}
          style={{ width: "100%", marginTop: "160px" }}
        />
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#d070fb" }}
            onClick={handleOpen}
          >
            차단
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { borderRadius: "1rem" } }}
          >
            <DialogContent>
              <DialogContentText color="error">{error}</DialogContentText>
              차단 하시겠습니까?
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
                onClick={handleSubmit}
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddBlockForm;
