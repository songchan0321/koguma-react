import * as React from "react";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  getRepLocationAPI,
  listLocationAPI,
  updateRepLocationAPI,
} from "../../apis/api/common";
import { useNavigate } from "react-router-dom";

const LocationBox = ({ location, setLocation }) => {
  const [locationList, setLocationList] = useState([]);
  const [dong, setDong] = useState();
  const navigate = useNavigate();

  const getRepLocation = async () => {
    const { data } = await getRepLocationAPI();
    return data;
  };
  const updateRepLocation = async (id) => {
    await updateRepLocationAPI(id);
  };

  const listLocation = async () => {
    const { data } = await listLocationAPI();
    setLocationList(data);
  };

  const fetchData = async () => {
    const data = await getRepLocation();
    setDong(data.dong);
    console.log(data.dong); // 올바른 값이 출력됩니다.
  };

  useEffect(() => {
    fetchData();
    listLocation();
  }, []);

  return (
    <FormControl sx={{ minWidth: 120 }}>
      {locationList ? (
        <Select
          displayEmpty
          id="demo-simple-select"
          value={dong}
          onChange={(event) => setDong(event.target.value)}
          input={<OutlinedInput label="대표동" id="demo-simple-select-label" />}
          sx={{
            fontSize: 14,
            padding: "0px",
            "& .MuiSelect-outlined": { borderBottom: "none" },
          }}
          inputProps={{ "aria-label": "Without label", maxLength: 5 }}
        >
          {locationList.map((location, idx) => (
            <MenuItem
              key={idx}
              value={location.dong}
              onClick={() => {
                console.log(location);
                updateRepLocation(location.id);
                setDong(location.dong);
                setLocation(location.id);
              }}
            >
              {location.dong}
            </MenuItem>
          ))}
          <MenuItem onClick={() => navigate("/common/location")}>
            동네 설정
          </MenuItem>
        </Select>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export default LocationBox;
