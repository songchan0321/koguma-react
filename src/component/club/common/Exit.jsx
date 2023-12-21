import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";

const Exit = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      style={{ position: "absolute", left: "-0.6rem", top: "0.4rem" }}
      onClick={goBack}
    >
      <ClearIcon sx={{ color: "#000000" }} />
    </Button>
  );
};

export default Exit;
