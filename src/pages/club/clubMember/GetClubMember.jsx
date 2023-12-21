import { useEffect, useState } from "react";
import { getClubMemberAPI } from "../../../apis/api/club";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import TopBarClub from "../../../component/club/common/TopBarClub";

const GetClubMember = () => {
  const { clubMemberId } = useParams();
  const [clubMember, setClubMember] = useState({});

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

  return (
    <>
      <TopBarClub>모임원 상세 보기</TopBarClub>
      <Container maxWidth="lg">
        <Grid container spacing={3} justify="center" alignItems="center">
          {/* 회원 이미지 */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Avatar
                  src={clubMember.avatarUrl}
                  alt={clubMember.nickname}
                  style={{ width: "100px", height: "100px", margin: "auto" }}
                />
              </CardContent>
            </Card>
          </Grid>
          {/* 회원 닉네임 */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ textAlign: "center" }}
                >
                  {clubMember.nickname}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* 오른쪽: 추가 정보 */}
          <Grid item xs={12}>
            {/* 내가 따로 구성해둔 하단 내용 */}
            {/* 예: <AdditionalInfoComponent /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GetClubMember;
