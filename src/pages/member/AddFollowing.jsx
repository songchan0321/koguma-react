import React from "react";
import AddFollowingForm from "../../component/member/AddFollowingForm";
import BottomBar from "../../component/common/BottomBar";
import Back from "../../component/common/Back";

const AddFollowing = () => {


    const handleSubmitSuccess = () => {

    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>팔로잉 추가</h2>
            <AddFollowingForm onSubmit={handleSubmitSuccess} />
            <BottomBar/>
            <Back/>
        </div>
    );
};

export default AddFollowing;