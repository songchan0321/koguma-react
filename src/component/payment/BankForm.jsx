import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

const BankForm = ({ open, onClose, onSelectBank }) => {
  const banks = [
    { name: "KB국민은행", code: "004" },
    { name: "SC제일은행", code: "023" },
    { name: "경남은행", code: "039" },
    { name: "광주은행", code: "034" },
    { name: "기업은행", code: "003" },
    { name: "농협은행", code: "011" },
    { name: "대구은행", code: "031" },
    { name: "부산은행", code: "032" },
    { name: "산업은행", code: "002" },
    { name: "수협은행", code: "007" },
    { name: "신한은행", code: "088" },
    { name: "신협은행", code: "048" },

    // { name: "외환은행", code: "005" },
    { name: "우리은행", code: "020" },
    { name: "우체국", code: "071" },
    // { name: "전북은행", code: "037" },
    // { name: "제주은행", code: "035" },

    // { name: "축협", code: "012" },
    { name: "하나은행", code: "081" },
    { name: "케이뱅크", code: "089" },
    { name: "카카오뱅크", code: "090" },
    { name: "삼성증권", code: "240" },
    { name: "키움증권", code: "264" },
    { name: "한화증권", code: "269" },
  ];
  //   const banks = {
  //     : "",
  //     : "",
  //     : "",
  //     "": "",
  //     "한국씨티은행(한미은행)": "027",
  //     : "",
  //     : "",
  //     유안타증권: "209",
  //     현대증권: "218",
  //     미래에셋증권: "230",
  //     대우증권: "238",
  //     한국투자증권: "243",
  //     우리투자증권: "247",
  //     교보증권: "261",
  //     하이투자증권: "262",
  //   };

  const handleAvatarClick = (bank) => {
    onSelectBank(bank);
    onClose();
    console.log(`Selected bank: ${bank.name}`);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>은행 선택</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {banks.map((bank, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{ textAlign: "center" }}
                  onClick={() => handleAvatarClick(bank)}
                >
                  <Avatar
                    alt={`Avatar ${index + 1}`}
                    src={`/bank/금융아이콘_PNG_${bank.name}.png`}
                    sx={{ width: 56, height: 56, margin: "auto" }}
                  />
                  <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                    {bank.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </>
    // <Grid container spacing={2}>
    //   {banks.map((bank, index) => (
    //     <Grid item xs={4} key={index}>
    //       {" "}
    //       {/* xs={4}는 화면 크기에 따라 1줄에 3개를 의미합니다 */}
    //       <Avatar
    //         alt={`Avatar ${index + 1}`}
    //         src={`/bank/금융아이콘_PNG_${bank.name}.png`}
    //         sx={{ width: 56, height: 56 }}
    //       />
    //       <Typography variant="subtitle1" align="center">
    //         {/* 여기에 표시할 텍스트를 추가하세요 */}
    //         User {index + 1}
    //       </Typography>
    //     </Grid>
    //   ))}
    // </Grid>
    // <Avatar
    //   alt="Remy Sharp"
    //   src="/bank/금융아이콘_PNG_카카오뱅크.png"
    //   sx={{ width: 56, height: 56 }}
    // />
  );
};
// 에이치엠씨투자증권	263
//
// 이트레이드증권	265
// 에스케이증권	266
// 대신증권	267
// 솔로몬투자증권	268
// 하나대투증권	270
// 굿모닝신한증권	278
// 동부증권	279
// 유진투자증권	280
// 메리츠증권	287
// 엔에이치투자증권	289
// 부국증권	290
// };

export default BankForm;
