import { useEffect, useState } from "react";
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
import TopBarClub from "./common/TopBarClub";

const ClubListByCategory = ({ categoryId }) => {
  const [listClub, setListClub] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubByCategoryAPI(categoryId);
        console.log(data);
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
      {listClub &&
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
                      인원: {club.maxCapacity}/{club.maxCapacity}
                    </Typography>
                  </ClubContent>
                </Grid>
              </Grid>
            </Link>
            <Divider />
          </div>
        ))}
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
