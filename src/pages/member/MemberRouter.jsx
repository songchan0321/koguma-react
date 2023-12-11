import React from 'react';
import { Route, Routes } from "react-router-dom";
import AddMember from "./AddMember";
import Profile from "./Profile";
import AddMemberComplete from "./AddMemberComplete";
import UpdateMember from "./UpdateMember";

const MemberRouter = () => {
    return(
        <Routes>
            <Route path="/add" element={<AddMember />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/add/complete" element={<AddMemberComplete/>} />
            <Route path="/update" element={<UpdateMember/>} />
        </Routes>
    );
};

export default MemberRouter;