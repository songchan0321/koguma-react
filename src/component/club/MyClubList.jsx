import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { listMyClubAPI } from "../../apis/api/club";
import { useNavigate } from "react-router-dom";
import NotData from "../product/NotData";
import ClubNotData from "./common/ClubNotData";

const MyClubList = () => {
  const navigate = useNavigate();
  const [myClubs, setMyClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMyClubAPI();
        setMyClubs(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h5">내 모임</Typography>
      {myClubs.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            py: 1,
            overflow: "auto",
            width: 343,
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
            },
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {myClubs.map((club, index) => (
            <div key={index} onClick={() => navigate(`/club/${club.id}`)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    orientation="horizontal"
                    size="sm"
                    variant="outlined"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      ...backgroundStyle,
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "auto",
                        borderRadius: "50%",
                      }}
                      image={club.profileImage[0].url}
                      alt={club.title}
                    />
                  </Card>
                  <Grid
                    item
                    xs={12}
                    style={{ fontSize: "24px", textAlign: "center" }}
                  >
                    <Typography level="title-md">{club.title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          ))}
        </Box>
      ) : (
        <ClubNotData
          children={
            <>
              <div style={{ color: "lightgray" }}>
                아직 가입한 모임이 없어요 ...
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default MyClubList;

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};
