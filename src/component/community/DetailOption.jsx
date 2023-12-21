import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
<<<<<<< Updated upstream
import { Link, useNavigate, useParams } from "react-router-dom";
=======
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
>>>>>>> Stashed changes
import { deletePostAPI, updatePostAPI } from "../../apis/api/community";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DetailOption = ({ editTo, deleteTo, reportTo, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { postId } = useParams();
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const navigate = useNavigate();

  const handleMoreVertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
<<<<<<< Updated upstream
    setIsDeleteModalOpen(false);
=======
    setIsDeleteModalOpen(false); // 추가: 모달 닫을 때 삭제 확인 모달도 닫기
>>>>>>> Stashed changes
  };

  const handleEdit = () => {
    console.log("수정 클릭");
    handleModalClose();
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
<<<<<<< Updated upstream
      await deletePostAPI(postId, { activeFlag: false });
      navigate("/post/list");
    } catch (error) {
      console.error("포스트 삭제 오류:", error);
    } finally {
=======
      // API 호출해서 activeFlag 변경
      await deletePostAPI(postId, { activeFlag: false });

      // 삭제 후 페이지 이동
      navigate("/post/list");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      // 모달 닫기
>>>>>>> Stashed changes
      handleModalClose();
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleReport = () => {
    console.log("신고 클릭");
    handleModalClose();
  };

  return (
    <Fragment>
      <Button
        sx={{ color: "#000000" }}
        variant="text"
        color="secondary"
        onClick={handleMoreVertClick}
        style={{ position: "absolute", right: 0 }}
      >
        <MoreVertIcon />
      </Button>

<<<<<<< Updated upstream
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{/* 내용 입력 */}</Typography>
=======
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{/* 내용 입력 */}</Typography>
        </DialogContent>
        <DialogActions>
>>>>>>> Stashed changes
          <Button
            onClick={handleEdit}
            color="secondary"
            component={Link}
            to={editTo}
          >
            수정
          </Button>
          <Button onClick={handleDelete} color="secondary">
            삭제
          </Button>
          <Button
            onClick={handleReport}
            color="secondary"
            component={Link}
            to={reportTo}
          >
            신고
          </Button>
<<<<<<< Updated upstream
        </Box>
      </Modal>

=======
        </DialogActions>
      </Dialog>

      {/* 추가: 삭제 확인 모달 */}
>>>>>>> Stashed changes
      <Dialog open={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="secondary">
            확인
          </Button>
          <Button onClick={handleDeleteCancel} color="secondary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DetailOption;
