import { useEffect, useState } from "react";
import {
  acceptJoinRequestAPI,
  listClubJoinRequest,
  rejectJoinRequestAPI,
} from "../../../apis/api/club";
import { Button, List } from "@mui/material";

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

  const handleReject = async (id) => {
    try {
      const response = await rejectJoinRequestAPI(id);
      const updatedJoinRequests = joinRequests.filter(
        (request) => request.id !== id
      );
      setJoinRequests(updatedJoinRequests);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await acceptJoinRequestAPI(id);
      const updatedJoinRequests = joinRequests.filter(
        (request) => request.id !== id
      );
      setJoinRequests(updatedJoinRequests);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        {" "}
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {joinRequests &&
            joinRequests.map((JoinRequest) => (
              <div key={JoinRequest.id} style={backgroundStyle}>
                <div>
                  <span>활동명: </span>
                  <span>{JoinRequest.nickname}</span>
                </div>
                <div>
                  <span>자기소개: </span>
                  <span>{JoinRequest.content}</span>
                </div>
                <div>
                  {" "}
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "35%", left: 10 }}
                    onClick={() => handleAccept(JoinRequest.id)}
                  >
                    승인
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "35%", left: 60 }}
                    onClick={() => handleReject(JoinRequest.id)}
                  >
                    거절
                  </Button>
                </div>
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
