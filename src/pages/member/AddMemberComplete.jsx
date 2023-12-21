// AddMemberCompletePage.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddMemberCompleteForm from "../../component/member/AddMemberCompleteForm";
import ProfileForm from "../../component/member/ProfileForm";

const AddMemberCompletePage = () => {
  const navigate = useNavigate();

  return (
    <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {/* <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
                    Grid 아이템에 display, justifyContent 및 alignItems 추가
                    고구마
                    <img
                        src="path/to/koguma/image.jpg"
                        alt="koguma"
                        style={{ width: "100%", borderRadius: "50%" }}
                    />
                </Grid> */}
        <Grid item xs={12} md={8}>
          {/* 회원 가입 완료 */}
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom mt={25}>
              회원가입 완료!
            </Typography>
            <Typography variant="h5" mt={2}>
              고구마 회원이 되신 것을 환영해요.
            </Typography>
            <AddMemberCompleteForm navigate={navigate} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddMemberCompletePage;
