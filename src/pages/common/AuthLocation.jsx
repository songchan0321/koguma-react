import { Button, IconButton, List, Box, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useEffect, useRef, useState } from "react";
import SearchSlider from "../../component/location/SearchSlider";
import MapComponent from "../../component/location/MapComponent";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

import {
  addLocationAPI,
  deleteLocationAPI,
  getRepLocationAPI,
  listLocationAPI,
  updateRepLocationAPI,
  updateSearchRangeAPI,
} from "../../apis/api/common";
import { useLocation } from "react-router-dom";

const AuthLocation = () => {
  const [level, setLevel] = useState(7);
  const mapRef = useRef();
  const [latitude, setLatitude] = useState(37.4993705);
  const [longitude, setLongitude] = useState(127.0290175);
  const [searchRange, setSearchRange] = useState(2);
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [listLocationComplete, setListLocationComplete] = useState(false);
  const [type, setType] = useState();
  const [mapKey, setMapKey] = useState(0);
  const location = useLocation();
  const handleLocationClick = async (idx) => {
    updateRepLocation(locationList[idx].id);
    setSelectedLocation(idx);
    setLatitude(locationList[idx].latitude);
    setLongitude(locationList[idx].longitude);
    setSearchRange(locationList[idx].searchRange);
  };
  const handleAddLocationClick = async () => {
    //위치 추가를 위한 api
    const idx = locationList.length - 1;
    updateRepLocation(locationList[idx].id);
    setSelectedLocation(idx);
    setLatitude(locationList[idx].latitude);
    setLongitude(locationList[idx].longitude);
    setSearchRange(locationList[idx].searchRange);
  };
  const handleSearchRangeChange = (event, newValue) => {
    setSearchRange(newValue);
    updateSearchRange(newValue);
  };

  const updateRepLocation = async (id) => {
    await updateRepLocationAPI(id);
  };

  const addLocation = async () => {
    const location = await getCurrentLocation();
    const { data } = await addLocationAPI(location);
    await (async () => {
      setLocationList((prevList) => [...prevList, data]);
      setType("add");
    })();
  };
  useEffect(() => {
    console.log(locationList);
    if (type === "add") {
      handleAddLocationClick();
    }
    setType(null);
  }, [locationList]);

  const listLocation = async () => {
    const { data } = await listLocationAPI();
    setLocationList(data);
    setListLocationComplete(true);
  };
  const updateSearchRange = async (newValue) => {
    console.log(locationList[selectedLocation]);
    const updatedLocation = {
      ...locationList[selectedLocation],
      searchRange: newValue,
    };
    await updateSearchRangeAPI(updatedLocation);
  };
  const deleteLocation = async (idx) => {
    if (locationList.length === 1) {
      alert("위치는 하나이상 존재해야합니다");
      return;
    }
    await deleteLocationAPI(locationList[idx].id);
    const updatedLocationList = locationList.filter(
      (_, index) => index !== idx
    );
    const newSelectedLocation =
      updatedLocationList.length > 0
        ? updatedLocationList[idx >= updatedLocationList.length ? idx - 1 : idx]
        : null;

    // 나머지 위치 정보로 state 업데이트
    setLocationList(updatedLocationList);
    console.log(newSelectedLocation);
    setSelectedLocation(newSelectedLocation);
    await handleLocationClick(0);
    // setLocationList(updatedLocationList);
  };
  const getRepLocation = async () => {
    const { data } = await getRepLocationAPI();
    console.log(data);
    console.log(locationList);
    const repLocationIndex = locationList.findIndex(
      (location) => location.id === data.id
    );
    console.log("index : " + repLocationIndex);

    // 대표 Location의 인덱스를 setSelectedLocation에 설정
    setSelectedLocation(repLocationIndex);

    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setSearchRange(data.searchRange);
    setSelectedLocation(data);
    await handleLocationClick(repLocationIndex);
  };
  useEffect(() => {
    if (searchRange === 4 || searchRange === 5) {
      setLevel(8);
    }
    if (searchRange === 2 || searchRange === 3) {
      setLevel(7);
    }
  }, [searchRange]);

  useEffect(() => {
    if (!location || !location.state || !location.state.init) {
      listLocation();
    }
    // listLocation();
  }, [latitude, longitude, level, searchRange, mapKey]);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          resolve(location);
        },
        (err) => reject("위치 권한이 없어요!"),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };
  useEffect(() => {
    if (listLocationComplete) {
      getRepLocation();
    }
  }, [listLocationComplete]);

  return (
    <Fragment>
      <Back url={"/product/list"} />
      <TopBar>내 동네 설정</TopBar>
      <MarginEmpty />
      <List>
        <MapComponent
          key={mapKey}
          latitude={latitude}
          longitude={longitude}
          level={level}
          searchRange={searchRange}
        />
      </List>

      <Typography
        sx={{ flex: 1, mt: 2, mb: 2, ml: 5 }}
        variant="h6"
        component="div"
      >
        내 동네
      </Typography>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {locationList ? (
          locationList.map((list, idx) => (
            <Grid item xs={5} key={list.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  key={list.id}
                  onClick={() => handleLocationClick(idx)}
                  variant={selectedLocation === idx ? "contained" : "outlined"}
                  color="secondary"
                  style={{ flex: 1 }}
                >
                  {list.dong}
                </Button>
                <IconButton>
                  <DeleteIcon onClick={() => deleteLocation(idx)} />
                </IconButton>
              </Box>
            </Grid>
          ))
        ) : (
          <></>
        )}
        <Grid item xs={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => addLocation()}
              variant="outlined"
              color="secondary"
              style={{ flex: 1 }}
            >
              +
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ flex: 1, mt: 2, mb: 2, ml: 5 }}
            variant="h6"
            component="div"
          >
            {locationList[selectedLocation]?.dong || ""}과 근처 동네
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchSlider
              searchRange={searchRange}
              setSearchRange={handleSearchRangeChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AuthLocation;
