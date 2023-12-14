import React from "react";
import AddBlockForm from "../../component/member/AddBlockForm";


const AddBlock = () => {


    const handleSubmitSuccess = () => {

    };

    return (
        <div>
            <h2>차단 추가 페이지</h2>
            <AddBlockForm onSubmit={handleSubmitSuccess} />
        </div>
    );
};

export default AddBlock;