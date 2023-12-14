import { useEffect, useState } from "react";
import { listClubJoinRequest } from "../../../apis/api/club";
import { List } from "@mui/material";

const ListClubJoinRequest = ({ clubId }) => {
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubJoinRequest(clubId);
        setJoinRequests(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  return (
    <>
      <div>
        {" "}
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {joinRequests &&
            joinRequests.map((JoinRequest) => (
              <div
                key={JoinRequest.id}
                onClick={() =>
                  navigator(`/club/join/request/${JoinRequest.id}`)
                }
                style={backgroundStyle}
              >
                {JoinRequest.nickname}
              </div>
            ))}
        </List>
      </div>
    </>
  );
};

export default ListClubJoinRequest;

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
