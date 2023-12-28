import React, { useRef, useState } from "react";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import {
  Box,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import MarginEmpty from "../../payment/MarginEmpty";

const EventMarkerContainer = ({ club }) => {
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();
  const markerRef = useRef(null);
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };

  const content = (
    <CustomOverlayMap
      position={{ lat: club.latitude, lng: club.longitude }}
      zIndex={1000}
      yAnchor={1.1}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "300px",
          padding: "16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CancelIcon
          fontSize="small"
          onClick={() => setIsOpen(false)}
          sx={{
            alignSelf: "flex-end",
            marginTop: "-8px",
            marginRight: "-8px",
            cursor: "pointer",
          }}
        />
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
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Typography>모임명: {club.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                모임소개: {truncateText(club.content, 10)}{" "}
                {/* 최대 100자로 제한 */}
              </Typography>
              <MarginEmpty value={5} />
              <Chip
                label="모임으로 이동"
                onClick={() => navigate(`/club/${club.id}`)}
              />
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </CustomOverlayMap>
  );

  const handleMarkerClick = () => {
    setIsOpen(true);
    if (map && markerRef.current) {
      map.panTo(markerRef.current.getPosition());
    }
  };

  return (
    <>
      <MapMarker
        ref={markerRef}
        position={{ lat: club.latitude, lng: club.longitude }}
        onClick={handleMarkerClick}
      />
      {isOpen && content}
    </>
  );
};

export default EventMarkerContainer;
