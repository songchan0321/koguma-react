import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarginEmpty from "../../component/payment/MarginEmpty";

const AddClubConfirm = ({ clubId }) => {
  const navigate = useNavigate();
  const [club, setClub] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClub(clubId);
        console.log(clubId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = () => {
    navigate(`/club/${clubId}`, { replace: true });
  };

  return (
    <>
      <MarginEmpty value={120} />

      <div>
        <Typography
          variant="h5"
          style={{ marginTop: "20px", marginLeft: "30px" }}
        >
          모임 생성을 축하합니다. !
        </Typography>
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={fixedButtonStyle}
        onClick={handleConfirm}
      >
        확인
      </Button>
    </>
  );
};

export default AddClubConfirm;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 20,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
