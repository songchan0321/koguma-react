import React from "react";
import AddFollowingForm from "../../component/member/AddFollowingForm";
import BottomBar from "../../component/common/BottomBar";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";

const AddFollowing = () => {


    const handleSubmitSuccess = () => {

    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <AddFollowingForm onSubmit={handleSubmitSuccess} />
            <TopBar>팔로우 추가</TopBar>
            <BottomBar/>
            <Back/>
        </div>
    );
};

export default AddFollowing;