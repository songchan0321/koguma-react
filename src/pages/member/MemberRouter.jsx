import React from 'react';
import { Route, Routes } from "react-router-dom";
import AddMember from "./AddMember";
import Profile from "./Profile";
import AddMemberComplete from "./AddMemberComplete";

const MemberRouter = () => {
    return(
        <Routes>
            <Route path="/add" element={<AddMember />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/add/complete" element={<AddMemberComplete/>} />
        </Routes>
    );
};

export default MemberRouter;