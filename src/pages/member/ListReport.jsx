import React from "react";
import ListReportForm from "../../component/member/ListReportForm";


const ListReport = () => {


    const handleSubmitSuccess = () => {

    };

    return (
        <div>
            <h2>문의 및 신고 리스트</h2>
            <ListReportForm onSubmit={handleSubmitSuccess} />
        </div>
    );
};

export default ListReport;