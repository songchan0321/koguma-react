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

const MemberRouter = () => {
    return(
        <Routes>
            <Route path="/add" element={<AddMember />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/add/complete" element={<AddMemberComplete/>} />
            <Route path="/update" element={<UpdateMember/>} />
            <Route path="/delete" element={<DeleteMember/>} />
            <Route path="/member/relationship/block/list" element={<ListBlock/>}/>
            <Route path="/member/relationship/following/list" element={<ListFollowing/>}/>
            <Route path="/member/relationship/block/add" element={<AddBlock/>}/>
            <Route path="/member/relationship/following/add" element={<AddFollowing/>}/>
            <Route path="/member/relationship/block/get:targetMemberId" element={<GetBlock/>}/>
            <Route path="/member/relationship/following/get:targetMemberId" element={<GetFollowing/>}/>

        </Routes>
    );
};

export default MemberRouter;