import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ClubHomePostList = ({ clubId, clubMember }) => {
  return (
    <>
      <div style={fabContainerStyle}>
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
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
