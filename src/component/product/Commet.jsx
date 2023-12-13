import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

const Commet = ({ type, commetHandler, checkboxHandler, checkBoxClear }) => {
  const [selectedActions, setSelectedAction] = useState({
    bad: [
      "시간약속을 안 지켜요.",
      "채팅 메시지를 읽고도 답이 없어요.",
      "원하지 않는 가격을 계속 요구해요.",
      "예약만 하고 거래 시간을 명확하게 알려주지 않아요.",
      "거래 시간과 장소를 정한 후 거래 직전 취소했어요.",
      "거래 시간과 장소를 정한 후 연락이 안돼요.",
      "약속 장소에 나타나지 않았어요.",
      "단순 변심으로 환불을 요구해요.",
      "반말을 사용해요.",
      "불친절해요.",
    ],
    good: [
      "제가 있는 곳까지 와서 거래했어요.",
      "시간 약속을 잘 지켜요.",
      "친절하고 매너가 좋아요.",
      "응답이 빨라요",
    ],
  });
  useEffect(() => checkBoxClear(), [type]);
  console.log(type);
  return (
    <>
      <FormGroup>
        {type === "bad" ? (
          <>
            <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
              어떤점이 별로셨나요?
            </Typography>
            {selectedActions.bad.map((selectedAction, index) => (
              <FormControlLabel
                control={<Checkbox color="secondary" sx={{ ml: 2 }} />}
                onChange={(event) => checkboxHandler(selectedAction, event)}
                label={selectedAction}
              />
            ))}
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
              어떤점이 좋으셨나요?
            </Typography>
            {selectedActions.good.map((selectedAction, index) => (
              <FormControlLabel
                color="secondary"
                control={<Checkbox color="secondary" sx={{ ml: 2 }} />}
                onChange={(event) => checkboxHandler(selectedAction, event)}
                label={selectedAction}
              />
            ))}
          </>
        )}
      </FormGroup>
      <TextField
        sx={{ mt: 2 }}
        label="거래후기를 작성해주세요"
        name="content"
        multiline
        fullWidth
        rows={4}
        onChange={commetHandler}
      />
    </>
  );
};
export default Commet;
