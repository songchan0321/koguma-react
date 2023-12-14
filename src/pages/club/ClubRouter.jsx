import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ClubList from "./ClubList";
import GetClub from "./GetClub";
import AddClub, { Mobile } from "./AddClub";
import AddMeetUp from "../../component/club/meetUp/AddMeetUp";
import GetClubMeetUp from "./meetUp/GetClubMeetUp";
import { Provider } from "react-redux";
import store from "../../store";
import JoinRequest from "./clubMember/JoinReques";
import ListClubMember from "../../component/club/clubMember/ListClubMember";
import GetClubMember from "./clubMember/GetClubMember";

const ClubRouter = () => {
  return (
    <Routes>
      <Route path="/list" element={<ClubList />}></Route>
      <Route path="/add" element={<AddClub />}></Route>
      <Route path="/:clubId" element={<GetClub />}></Route>
      <Route path="/meet-up/add" element={<AddMeetUp />}></Route>
      <Route path="/meet-up/:meetUpId" element={<GetClubMeetUp />} />
      <Route path="/join/request" element={<JoinRequest />} />
      <Route path="/members/:clubId" element={<ListClubMember />} />
      <Route path="/member/:clubMemberId" element={<GetClubMember />} />
    </Routes>
  );
};

export default ClubRouter;
