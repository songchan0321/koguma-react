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
    { name: "우리은행", code: "020" },
    { name: "우체국", code: "071" },
    { name: "하나은행", code: "081" },
    { name: "케이뱅크", code: "089" },
    { name: "카카오뱅크", code: "090" },
    { name: "삼성증권", code: "240" },
    { name: "키움증권", code: "264" },
    { name: "한화증권", code: "269" },
  ];

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
      </Dialog>
    </>
  );
};

export default BankForm;
