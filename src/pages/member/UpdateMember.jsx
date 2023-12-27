import React, { useEffect, useState } from "react";
import { Avatar, Box, CircularProgress, Grid, Typography } from "@mui/material";
import UpdateMemberForm from "../../component/member/UpdateMemberForm";
import { authInstance } from "../../apis/utils/instance";
import MarginEmpty from "../../component/payment/MarginEmpty";

const UpdateMember = () => {
  const [member, setMember] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await authInstance.get("/member/profile/get", {
          headers: {
            Accept: "application/json",
          },
        });
        setMember(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("오류 발생: ", error);
        setLoading(false); // Set loading to false on error
      }
    };
    fetchMemberData();
  }, []);

  const handleUpdateSuccess = async () => {
    // 업데이트 성공 시 다시 멤버 정보를 가져와서 화면을 갱신
    try {
      setLoading(true); // Set loading to true before fetching updated data
      const response = await authInstance.get("/member/profile/get", {
        headers: {
          Accept: "application/json",
        },
      });
      setMember(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("오류 발생: ", error);
      setLoading(false); // Set loading to false on error
    }
  };

  return (
    <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
      <MarginEmpty />
      <Grid container>
        <Grid item xs={12} md={4}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              src={member?.profileURL}
              sx={{
                width: "7.5rem",
                height: "7.5rem",
                border: "solid 1px rgba(120, 120, 120, 0.5)",
              }}
            />
            {/* <img
              src={member?.profileURL}
              alt=""
              style={{
                width: "8rem",
                height: "8rem",
                marginTop: "30px",
                clipPath: "circle(50% at 50% 50%)",
              }}
            /> */}
            <div></div>
          </div>
        </Grid>
        <Grid xs={12} style={{ pt: 0 }}>
          {/* <div style={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                // 로딩이 완료되면 멤버 닉네임 표시
                member?.nickname
              )}
            </Typography>
          </div> */}
          {/* UpdateMemberForm 사용 */}
          <UpdateMemberForm
            member={member}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateMember;
