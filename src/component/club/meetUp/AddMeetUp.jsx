import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addMeetUpAPI } from "../../../apis/api/club";
import { useNavigate } from "react-router-dom";
import TopBar from "../../payment/TopBar";

const AddMeetUp = ({ clubId }) => {
  const navigator = useNavigate();
  const [meetUp, setMeetUp] = useState({
    title: "",
    content: "",
    roadAddr: "",
    maxCapacity: 0,
  });

  const fixedButtonStyle = {
    position: "fixed",
    bottom: 10,
    left: 20,
    width: "90%",
    padding: "10px",
    textAlign: "center",
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
    console.log(meetUp.title);
    console.log(clubId);
    try {
      await addMeetUpAPI(
        clubId,
        meetUp.title,
        meetUp.content,
        meetUp.maxCapacity,
        meetUp.roadAddr
      );
      navigator("/club/" + clubId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TopBar>일정 생성</TopBar>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "90%",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h1> 일정명 </h1>
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
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          style={fixedButtonStyle}
          onClick={handleSubmit}
        >
          만들기
        </Button>
      </Box>
    </>
  );
};

export default AddMeetUp;
