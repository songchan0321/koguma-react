import { Typography } from "@mui/material";

const ClubHome = ({ club }) => {
  return (
    <>
      <div>
        <Typography variant="h5">소 개</Typography>
      </div>
      <br />
      <div>
        <p>{club.content}</p>
      </div>
    </>
  );
};

export default ClubHome;
