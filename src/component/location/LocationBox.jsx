import * as React from "react";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useModal } from "../../context/ModalContext";
import {
  getRepLocationAPI,
  listLocationAPI,
  updateRepLocationAPI,
} from "../../apis/api/common";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

const LocationBox = ({ location, setLocation }) => {
  const [locationList, setLocationList] = useState([]);
  const [dong, setDong] = useState();
  const navigate = useNavigate();
  const { openModal } = useModal();

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
        await openModal(
          "서비스를 이용하기 위해서는 위치 등록이 필요합니다.",
          false,
          () => {
            navigate("/common/location", { state: { init: true } });
          }
        );
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
    <FormControl sx={{ minWidth: 110 }}>
      {locationList.length > 0 ? (
        <>
          <Modal />
          <Select
            displayEmpty
            id="demo-simple-select"
            onChange={(event) => setDong(event.target.value)}
            input={
              <OutlinedInput label="대표동" id="demo-simple-select-label" />
            }
            sx={{
              fontSize: 14,
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
                        setDong(location.dong);
                        setLocation(location);

                        await openModal(
                          `동네가 ${location.dong}으로 변경되었어요.`,
                          true,
                          () => {}
                        );
                      })();
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
                  <MenuItem key={idx} value={location.dong}>
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
