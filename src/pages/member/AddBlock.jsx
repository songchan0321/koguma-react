import React from "react";
import AddBlockForm from "../../component/member/AddBlockForm";

const AddBlock = () => {
    const handleSubmitSuccess = () => {};

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>회원 차단</h2>
            <AddBlockForm onSubmit={handleSubmitSuccess} />
        </div>
    );
};

export default AddBlock;
