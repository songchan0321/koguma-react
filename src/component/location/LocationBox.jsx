import * as React from "react";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  getRepLocationAPI,
  listLocationAPI,
  loginMemberhasLocationAPI,
  updateRepLocationAPI,
} from "../../apis/api/common";
import { useNavigate } from "react-router-dom";
import { InputLabel } from "@mui/material";

const LocationBox = ({ location, setLocation }) => {
  const [locationList, setLocationList] = useState([]);
  const [dong, setDong] = useState();
  const navigate = useNavigate();

  const loginMemberhasLocation = async () => {
    try {
      const data = await loginMemberhasLocationAPI();

      if (!data) {
        console.log("if");
        navigate("/common/location", { state: { init: true } });
      }
    } catch (error) {
      console.log(error);
      navigate("/common/location", { state: { init: true } });
    }
  };
  // loginMemberhasLocation();
  const getRepLocation = async () => {
    try {
      const response = await getRepLocationAPI();
      const data = response.data;

      if (data) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (err) {
      console.log(err);
      navigate("/common/location", { state: { init: true } });
    }
  };
  const updateRepLocation = async (id) => {
    try {
      await updateRepLocationAPI(id);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const listLocation = async () => {
    const { data } = await listLocationAPI();
    setLocationList(data);
  };

  const fetchData = async () => {
    try {
      const data = await getRepLocation();

      if (data && data.dong) {
        setDong(data.dong);
      } else {
        console.log("data 또는 data.dong이 정의되지 않았습니다.");
        navigate("/common/location", { state: { init: true } });
      }
    } catch (err) {
      console.log(err);
      navigate("/common/location", { state: { init: true } });
    }
  };

  useEffect(() => {
    fetchData();
    listLocation();
  }, []);

  useEffect(() => {
    if (dong != null) {
      listLocation();
    }
  }, [dong]);

  return (
    <FormControl sx={{ minWidth: 120 }}>
      {locationList.length > 0 ? (
        <>
          {/* <InputLabel>name</InputLabel> */}
          <Select
            displayEmpty
            id="demo-simple-select"
            // value={dong}
            onChange={(event) => setDong(event.target.value)}
            input={
              <OutlinedInput label="대표동" id="demo-simple-select-label" />
            }
            sx={{
              fontSize: 14,
              padding: "0px",
              // "& .MuiSelect-outlined": { borderBottom: "none" },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // 테두리 없애기
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none", // 호버 상태일 때 테두리 없애기
              },
            }}
            inputProps={{ "aria-label": "Without label", maxLength: 5 }}
          >
            <MenuItem onClick={() => navigate("/common/location")}>
              동네 설정
            </MenuItem>
            {locationList
              .filter((location) => !location.repAuthLocationFlag)
              .map((location, idx) => (
                <>
                  <MenuItem
                    key={idx}
                    value={location.dong}
                    onClick={() => {
                      console.log(location);
                      (async () => {
                        await updateRepLocation(location.id);
                        await setDong(location.dong);
                        await setLocation(location);
                      })();

                      // setDong(location.dong);
                    }}
                  >
                    {location.dong}
                  </MenuItem>
                </>
              ))}
            {locationList
              .filter((location) => location.repAuthLocationFlag)
              .map((location, idx) => (
                <>
                  <MenuItem
                    key={idx}
                    value={location.dong}
                    onClick={() => {
                      // console.log(location);
                      // updateRepLocation(location.id);
                      // setDong(location.dong);
                      // setLocation(location.id);
                    }}
                  >
                    {location.dong}
                  </MenuItem>
                </>
              ))}
          </Select>
        </>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export default LocationBox;
