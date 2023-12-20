import React from "react";
import AddBlockForm from "../../component/member/AddBlockForm";
import BottomBar from "../../component/common/BottomBar";
import Back from "../../component/common/Back";
const AddBlock = () => {
    const handleSubmitSuccess = () => {};

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>회원 차단</h2>
            <AddBlockForm onSubmit={handleSubmitSuccess} />
            <BottomBar/>
            <Back/>
        </div>
    );
};

export default AddBlock;
