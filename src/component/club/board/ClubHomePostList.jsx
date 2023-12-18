import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const ClubHomePostList = ({ clubId, clubMember }) => {
  return (
    <>
      <div style={fabContainerStyle}>
        <Link
          to={"/club/post/add"}
          state={{ clubId: clubId, clubMember: clubMember }}
        >
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </div>
    </>
  );
};

export default ClubHomePostList;

const fabContainerStyle = {
  position: "fixed",
  bottom: 45, // 조절 가능
  right: 40, // 조절 가능
};
