import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { listClubByCategoryAPI } from "../../apis/api/club";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NotData from "../product/NotData";
import ClubNotData from "./common/ClubNotData";

const ClubListByCategory = ({ categoryId, keyword }) => {
  const [listClub, setListClub] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubByCategoryAPI(categoryId, keyword);
        setListClub(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [categoryId]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };

  return (
    <>
      {listClub.length > 0 ? (
        listClub.map((club) => (
          <div key={club.id}>
            <Link
              to={`/club/${club.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
                    image={club.profileImage[0].url}
                    alt={club.title}
                  />
                </Grid>
                <Grid item xs={8}>
                  <ClubContent>
                    {/* 모임 타이틀 */}
                    <Typography variant="body1">{club.title}</Typography>
                    {/* 모임 소개 */}
                    <Typography variant="body2" color="text.secondary">
                      {truncateText(club.content, 10)} {/* 최대 100자로 제한 */}
                    </Typography>
                    {/* 모임 인원수 */}
                    <Typography variant="body2" color="text.secondary">
                      인원: {club.currentCount}/{club.maxCapacity}
                    </Typography>
                  </ClubContent>
                </Grid>
              </Grid>
            </Link>
            <Divider style={{ height: 0.2, backgroundColor: "grey" }} />
          </div>
        ))
      ) : (
        // listClub이 비어있을 때 NotData 컴포넌트 렌더링
        <ClubNotData
          children={
            <>
              <div style={{ color: "lightgray" }}>아직 모임이 없어요...</div>
              <div style={{ color: "lightgray" }}>
                마을의 모임장이 되어주세요!{" "}
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default ClubListByCategory;

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
