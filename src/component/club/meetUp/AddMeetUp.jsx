import {
  Box,
  Button,
  TextField,
  Modal,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useRef, useState } from "react";
import { addMeetUpAPI } from "../../../apis/api/club";
import { useNavigate, useParams } from "react-router-dom";
import TopBarClub from "../common/TopBarClub";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import MapTest from "../common/MapTest";
import MarginEmpty from "../../payment/MarginEmpty";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";

const AddMeetUp = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const navigator = useNavigate();
  const imageRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [meetUp, setMeetUp] = useState({
    title: "",
    content: "",
    roadAddr: "",
    maxCapacity: 0,
    selectedDate: null,
    selectedTime: null,
  });

  const fixedButtonStyle = {
    position: "fixed",
    bottom: 10,
    left: 20,
    width: "90%",
    padding: "10px",
    textAlign: "center",
  };

  const handleAddressUpdate = (address) => {
    setMeetUp({ ...meetUp, roadAddr: address });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

    if (value !== "" && name === "name" && regexp.test(value)) {
      return;
    }

    if (
      value !== "" &&
      (name === "accountNumber" ||
        name === "birthDate" ||
        name === "password1" ||
        name === "password2")
    ) {
      return;
    }

    setMeetUp({ ...meetUp, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // meetUp의 selectedDate와 selectedTime을 합쳐서 LocalDateTime 형식으로 변환
      const combinedDateTime = `${meetUp.selectedDate.format(
        "YYYY-MM-DD"
      )}T${meetUp.selectedTime.format("HH:mm:ss")}`;

      await addMeetUpAPI(
        clubId,
        meetUp.title,
        meetUp.content,
        meetUp.maxCapacity,
        meetUp.roadAddr,
        combinedDateTime
      );

      navigator("/club/" + clubId);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <TopBarClub children={"일정생성"}>일정생성</TopBarClub>
      <MarginEmpty />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "90%",
          },
        }}
        style={{ marginLeft: "5px" }}
        noValidate
        autoComplete="off"
      >
        <Paper elevation={0}>
          <div>
            <TextField
              fullWidth
              label="일정명"
              id="fullWidth"
              name="title"
              value={meetUp.title}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="내용"
              id="content"
              name="content"
              value={meetUp.content}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="인원"
              id="maxCapacity"
              type="number"
              name="maxCapacity"
              value={meetUp.maxCapacity}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="주소"
              id="roadAddr"
              name="roadAddr"
              value={meetUp.roadAddr}
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={openModal}>
                      <FmdGoodIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
              onClick={openModal}
            />
            <Modal open={isModalOpen} onClose={closeModal}>
              <div>
                <TopBarClub></TopBarClub>
                <MarginEmpty value={180} />
                <MapTest onAddressUpdate={handleAddressUpdate} />
                <Button
                  variant="contained"
                  color="secondary"
                  style={fixedButtonStyle}
                  onClick={closeModal}
                >
                  확인
                </Button>
              </div>
            </Modal>
          </div>

          <div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginLeft: "10px" }}>
                  <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DemoItem label="일정 날짜">
                      <DateCalendar
                        value={meetUp.selectedDate}
                        onChange={(newValue) => {
                          setMeetUp({
                            ...meetUp,
                            selectedDate: dayjs(newValue),
                          });
                        }}
                        shouldDisableDate={(date) =>
                          dayjs().isAfter(date, "day")
                        } // 오늘 이전의 날짜 비활성화
                      />
                    </DemoItem>
                  </DemoContainer>
                </div>
                <div>
                  <TimePicker
                    label="일정시간"
                    onChange={(newValue) =>
                      setMeetUp({ ...meetUp, selectedTime: dayjs(newValue) })
                    }
                  />
                </div>
              </LocalizationProvider>{" "}
            </div>

            <div></div>
          </div>
        </Paper>
      </Box>
      <MarginEmpty />
      <div>
        <MarginEmpty />
        <Button
          variant="contained"
          color="secondary"
          style={{
            position: "fixed",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            padding: "10px",
            textAlign: "center",
            zIndex: 1000, // 화면 최상단에 위치하도록 zIndex 속성 추가
          }}
          onClick={handleSubmit}
        >
          만들기
        </Button>
      </div>
    </>
  );
};

export default AddMeetUp;
