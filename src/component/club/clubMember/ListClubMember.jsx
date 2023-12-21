import { useEffect, useState } from "react";
import { listClubMemberAPI } from "../../../apis/api/club";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Grid,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListClubJoinRequest from "./ListClubJoinRequest";
import TopBarClub from "../common/TopBarClub";
import MarginEmpty from "../../payment/MarginEmpty";
import styled from "styled-components";

const ListClubMember = () => {
  const { clubId } = useParams();
  const location = useLocation();
  const navigator = useNavigate();
  const clubMember = location.state.clubMember;
  const [clubMembers, setClubMembers] = useState([]);
  const menuList = ["모임원", "가입요청"];
  const [selectedMenu, setSelectedMenu] = useState("모임원");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubMemberAPI(clubId);
        setClubMembers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleMenuClick = async (menu) => {
    if (menu !== "home" && clubMember.activeFlag === null) {
      alert("모임원만 이용할 수 있습니다.");
      return;
    }

    setSelectedMenu(menu);
  };

  return (
    <>
      <TopBarClub>모임원</TopBarClub>
      <MarginEmpty value={70} />

      {clubMember.memberRole ? (
        <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
          <div style={{ display: "flex", width: "100%" }}>
            {menuList.map((menu) => (
              <Button
                key={menu}
                onClick={() => handleMenuClick(menu)}
                variant={selectedMenu === menu ? "contained" : "outlined"}
                color="secondary"
                style={{ flex: 1 }}
              >
                {menu}
              </Button>
            ))}
          </div>
        </Box>
      ) : (
        <>
          <div></div>
        </>
      )}
      {selectedMenu === "모임원" && (
        <div>
          {" "}
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {clubMembers.map((clubMember) => {
              return (
                <Paper
                  key={clubMember.id}
                  onClick={() => navigator(`/club/member/${clubMember.id}`)}
                  style={backgroundStyle}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Avatar
                        alt="Remy Sharp"
                        style={{
                          width: "70px",
                          height: "70px",
                          margin: "auto",
                          borderRadius: "100%",
                        }}
                        src={clubMember.memberDTO.profileURL}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {clubMember.nickname}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </List>
        </div>
      )}
      {selectedMenu === "가입요청" && <ListClubJoinRequest clubId={clubId} />}
    </>
  );
};

export default ListClubMember;

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};

const ClubContent = styled(Avatar)({
  flex: 1,
  width: "200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
