import React from "react";
import { Route, Routes } from "react-router-dom";
import ClubList from "./ClubList";
import GetClub from "./GetClub";
import AddClub, { Mobile } from "./AddClub";
import AddMeetUp from "../../component/club/meetUp/AddMeetUp";

const ClubRouter = () => {
  return (
    <Routes>
      <Route path="/list" element={<ClubList />}></Route>
      <Route path="/:clubId" element={<GetClub />}></Route>
      <Route path="/add" element={<AddClub />}></Route>
      <Route path="/meet-up/add" element={<AddMeetUp />}></Route>
    </Routes>
  );
};

export default ClubRouter;
