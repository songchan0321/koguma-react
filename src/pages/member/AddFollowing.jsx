import React from "react";
import AddFollowingForm from "../../component/member/AddFollowingForm";


const AddFollowing = () => {


    const handleSubmitSuccess = () => {

    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>팔로잉 추가</h2>
            <AddFollowingForm onSubmit={handleSubmitSuccess} />
        </div>
    );
};

export default AddFollowing;