import { useEffect, useState } from "react";
import {
  acceptJoinRequestAPI,
  listClubJoinRequest,
  rejectJoinRequestAPI,
} from "../../../apis/api/club";
import { Button, List, Typography } from "@mui/material";
import MarginEmpty from "../../payment/MarginEmpty";

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
                  <Typography> 활동명: {JoinRequest.nickname}</Typography>
                </div>
                <div>
                  <Typography> 자기소개: {JoinRequest.content}</Typography>
                </div>
                <MarginEmpty value={5} />
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
                    variant="outlined"
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
