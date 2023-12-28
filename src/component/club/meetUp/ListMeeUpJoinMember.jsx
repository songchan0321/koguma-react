import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { listJoinMeetUpMemberAPI } from "../../../apis/api/club";

const ListMeeUpJoinMember = ({ meetUpId }) => {
  const [joinMemberList, setJoinMemberList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listJoinMeetUpMemberAPI(meetUpId);
        setJoinMemberList(data);
        console.log(`listMeetUpJoinMembber`);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [meetUpId]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {joinMemberList.map((joinMember) => (
          <div key={joinMember.id}>
            <Avatar
              alt="Remy Sharp"
              src={joinMember.clubMemberDTO.memberDTO.profileURL}
              sx={{ width: 30, height: 30 }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListMeeUpJoinMember;
