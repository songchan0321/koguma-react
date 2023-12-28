import { useEffect, useState } from "react";
import { getClubMemberAPI } from "../../../apis/api/club";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import TopBarClub from "../../../component/club/common/TopBarClub";
import styled from "styled-components";
import MarginEmpty from "../../../component/payment/MarginEmpty";

const GetClubMember = () => {
  const { clubMemberId } = useParams();
  const [clubMember, setClubMember] = useState({});
  const [myClubList, setMyClubList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubMemberAPI(clubMemberId);
        setClubMember(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubMemberId]);

  const handleTabChange = (event, newValue) => {
    setMyClubList(newValue === 1); // 1이면 내 모임, 0이면 전체 모임
  };

  return (
    <>
      <TopBarClub>모임원 상세 보기</TopBarClub>
      <MarginEmpty value={10} />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Paper elevation={0}>
          <Grid container spacing={2} tyle={{ marginLeft: "4px" }}>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                style={{
                  width: "150px", // 이미지의 가로 크기
                  height: "150px", // 이미지의 세로 크기
                  margin: "auto",
                  borderRadius: "50%",
                }}
                image={
                  clubMember.memberDTO
                    ? clubMember.memberDTO.profileURL || ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8} style={{ display: "flex", alignItems: "center" }}>
              <ClubContent style={{ marginLeft: "20px" }}>
                {/* 모임 타이틀 */}
                <Typography variant="body1" style={{ fontSize: "1.5rem" }}>
                  {" "}
                  {clubMember.nickname}
                </Typography>
                {/* 모임 소개 */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "1.5rem" }}
                ></Typography>
                {clubMember.memberDTO?.memberRole ? "모임" : "모임원"}{" "}
              </ClubContent>
            </Grid>
          </Grid>
          <Divider />
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              marginTop: "30px",
              fontSize: "1.5rem",
              marginLeft: "10px",
            }}
          >
            {clubMember.content}
          </Typography>
          <MarginEmpty value={10}></MarginEmpty>
          {/* <Button
            variant="contained"
            color="secondary"
            style={fixedButtonStyle}
          >
            상세 정보 수정하기{" "}
          </Button> */}
          <br />

          <br />

          <Divider style={{ backgroundColor: "gray", height: 0.1 }} />
        </Paper>
        <div style={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={myClubList ? 1 : 0} // 전체 모임과 내 모임을 탭으로 구분
              onChange={handleTabChange} // 탭 변경 시 내 모임 선택
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="category tabs"
            >
              <Tab label="게시글" />
              <Tab label="댓글" />
            </Tabs>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default GetClubMember;
const ClubCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
});

const ClubContent = styled(CardContent)({
  flex: 1,
  width: "200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const fixedButtonStyle = {
  bottom: 0,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
