import { useEffect, useState } from "react";
import { listMeetUpAPI } from "../../../apis/api/club";
import { CardContent, CardMedia, Grid, Typography } from "@mui/material";
import styled from "styled-components";

const SelectMeetUpList = ({ clubId, clubMember, meetUpState }) => {
  const [meetUpList, setMeetUpList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMeetUpAPI(clubId, meetUpState);
        setMeetUpList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  return (
    <>
      <div>
        {meetUpList &&
          meetUpList.map((meetUp) => (
            <div key={meetUp.id}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      borderRadius: "50%",
                    }}
                  />
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
                      인원: {meetUp.maxCapacity}/{meetUp.maxCapacity}
                    </Typography>
                  </ClubContent>
                </Grid>
              </Grid>
            </div>
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
