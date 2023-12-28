import React from "react";
import AddReportForm from "../../component/member/AddReportForm";

const AddReport = () => {
  const handleSubmitSuccess = () => {};

  return (
    <div>
      <h2>문의 및 신고 추가</h2>
      <AddReportForm onSubmit={handleSubmitSuccess} />
    </div>
  );
};

export default AddReport;
