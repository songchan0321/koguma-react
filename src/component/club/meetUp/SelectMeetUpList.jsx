import { useEffect, useState } from "react";
import { countMeetUpJoinMember, listMeetUpAPI } from "../../../apis/api/club";
import { CardContent, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarginEmpty from "../../payment/MarginEmpty";
import ListMeeUpJoinMember from "./ListMeeUpJoinMember";

const SelectMeetUpList = ({ clubId, clubMember, meetUpState }) => {
  const navigate = useNavigate();
  const [meetUpList, setMeetUpList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMeetUpAPI(clubId, meetUpState);
        console.log(data);
        setMeetUpList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [meetUpState, clubId]);

  const fetchMeetUpJoinMemberCount = async (meetUpId) => {
    try {
      const count = await countMeetUpJoinMember(meetUpId);
      return count;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

  const formatMonth = (dateString) => {
    const options = { month: "long" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  const formatDay = (dateString) => {
    const options = { day: "numeric" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleTimeString("ko-KR", options);
  };
  return (
    <>
      <MarginEmpty value={25} />
      {/* <div style={{ background: "#f2f2f2" }}> */}
      <div>
        {meetUpList &&
          meetUpList.map((meetUp) => (
            <>
              <Paper
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  boxShadow: "4px 6px 32px -4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
                elevation={0}
              >
                <div
                  key={meetUp.id}
                  onClick={() =>
                    navigate(`/club/meet-up/${meetUp.id}`, {
                      state: {
                        clubId: clubId,

                        clubMember: clubMember,
                      },
                    })
                  }
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <div>
                        {" "}
                        <Paper
                          style={{
                            textAlign: "center",
                            marginTop: "20px",
                            marginRight: "3px",
                          }}
                        >
                          <Typography variant="body1">
                            {formatMonth(meetUp.meetDate)}
                          </Typography>

                          <Typography variant="h6">
                            {formatDay(meetUp.meetDate)}
                          </Typography>
                          <br />
                          <br />
                        </Paper>
                      </div>{" "}
                    </Grid>
                    <Grid item xs={8}>
                      <ClubContent>
                        {/* 모임 타이틀 */}
                        <Typography variant="body1">{meetUp.title}</Typography>
                        {/* 모임 소개 */}
                        <Typography variant="body2" color="text.secondary">
                          {meetUp.title}{" "}
                        </Typography>
                        {/* 모임 인원수 */}
                        <Typography variant="body2" color="text.secondary">
                          참여 가능 인원: {meetUp.maxCapacity}
                        </Typography>
                      </ClubContent>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
              <MarginEmpty value={5} />
              <div style={{ marginLeft: "10px" }}>
                <ListMeeUpJoinMember meetUpId={meetUp.id} />
              </div>
              <MarginEmpty value={17} />
            </>
          ))}
      </div>
    </>
  );
};

export default SelectMeetUpList;
const ClubContent = styled(CardContent)({
  flex: 1,
  width: "200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
