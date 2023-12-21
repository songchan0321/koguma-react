import { Box, Button, TextField, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { addMeetUpAPI } from "../../../apis/api/club";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopBarClub from "../common/TopBarClub";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddMeetUpLo from "./AddMeetUpLo";
import DaumPostcodeEmbed from "react-daum-postcode";
import MapTest from "../common/MapTest";

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
    console.log(`111111111111`);
    console.log(address);
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
    console.log(meetUp);
    console.log(`-------------`);
    try {
      await addMeetUpAPI(
        clubId,
        meetUp.title,
        meetUp.content,
        meetUp.maxCapacity,
        // meetUp.meetDate,
        meetUp.roadAddr
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
          {/* <DaumPostcodeEmbed /> */}
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
              <Button onClick={openModal}>
                <FmdGoodIcon />
              </Button>
              <Modal open={isModalOpen} onClose={closeModal}>
                <div>
                  <MapTest onAddressUpdate={handleAddressUpdate} />
                  <Button onClick={closeModal}>닫기</Button>
                </div>
              </Modal>
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
