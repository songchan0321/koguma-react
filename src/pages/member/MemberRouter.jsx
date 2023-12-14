import React from 'react';
import { Route, Routes } from "react-router-dom";
import AddMember from "./AddMember";
import Profile from "./Profile";
import AddMemberComplete from "./AddMemberComplete";
import UpdateMember from "./UpdateMember";
import DeleteMember from "./DeleteMember";
import ListBlock from "./ListBlock";
import ListFollowing from "./ListFollowing";
import AddBlock from "./AddBlock";
import AddFollowing from "./AddFollowing";
import GetBlock from "./GetBlock";
import GetFollowing from "./GetFollowing";
import GetReport from "./GetReport";
import ListReport from "./ListReport";
import AddReport from "./AddReport";
import OtherProfile from "./OtherProfile";

const MemberRouter = () => {
    return(
        <Routes>
            <Route path="/add" element={<AddMember />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/add/complete" element={<AddMemberComplete/>} />
            <Route path="/update" element={<UpdateMember/>} />
            <Route path="/delete" element={<DeleteMember/>} />
            <Route path="/relationship/block/list" element={<ListBlock/>}/>
            <Route path="/relationship/following/list" element={<ListFollowing/>}/>
            <Route path="/relationship/block/add" element={<AddBlock/>}/>
            <Route path="/relationship/following/add" element={<AddFollowing/>}/>
            <Route path="/relationship/block/get/:targetMemberId" element={<GetBlock/>}/>
            <Route path="/relationship/following/get/:targetMemberId" element={<GetFollowing/>}/>
            <Route path="/report/get" element={<GetReport/>} />
            <Route path="/report/list" element={<ListReport/>} />
            <Route path="/report/add" element={<AddReport/>} />
            <Route path="/other/get/:id" element={<OtherProfile/>}/>

        </Routes>
    );
};

export default MemberRouter;