import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DaumPost from "../common/DaumPost";
import { useState } from "react";
import { absoulte_timestamp_new_date } from "../../apis/utils/timestamp";

const AddPlan = ({ open, handleClose, roomId, sendTextMessageHandler }) => {
  const [address, setAddress] = useState(null);
  const [time, setTime] = useState(absoulte_timestamp_new_date(new Date()));
  const sendPlanMessage = () => {
    if (time == null || address == null) {
      alert("약속 정보를 입력해주세요");
    }
    sendTextMessageHandler({ text: `${address},${time}`, type: "PLAN" });

    handleClose();
  };
  const daumAddressGetHandler = (addr) => {
    setAddress(addr);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: "1rem", padding: "0 0.4rem" } }}
    >
      <DialogTitle>약속 만들기</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DemoContainer components={["MobileDateTimePicker"]}>
            <DemoItem>
              <MobileDateTimePicker
                defaultValue={dayjs(new Date())}
                onChange={(value) =>
                  setTime(absoulte_timestamp_new_date(new Date(value.$d)))
                }
                minDate={dayjs(new Date())}
                label={"약속 시간을 정해주세요"}
                inputFormat={"yyyy-MM-dd HH:mm"}
                mask={"____-__-__"}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <br />
        <DaumPost
          daumAddressGetHandler={daumAddressGetHandler}
          address={address}
        />
      </DialogContent>

      <DialogActions sx={{ pt: 0, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0, 0.2)",
            color: "black",
            width: "90%",
          }}
          onClick={handleClose}
        >
          취소
        </Button>
      </DialogActions>
      <DialogActions
        sx={{
          pt: 0,
          pb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          // fullWidth
          sx={{
            width: "90%",
            backgroundColor: "#D070FB",
            "&:hover": {
              backgroundColor: "#D070FB", // hover 효과 시 변경할 배경색
            },
          }}
          // color="error"
          onClick={sendPlanMessage}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlan;
