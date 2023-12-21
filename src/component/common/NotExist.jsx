import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const NotExist = ({ title, content, url }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: "1.5rem",
        //   justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography
          sx={{ width: "20rem", textAlign: "center", mt: "1rem" }}
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: "1.2rem" }}
          color="text.secondary"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          // sx={{ backgroundColor: "#4AD395" }}
          size="small"
          component={Link}
          to={`${url}`}
        >
          Click!
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotExist;
