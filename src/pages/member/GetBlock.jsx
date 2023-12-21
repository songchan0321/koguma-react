import React from 'react';
import GetBlockForm from '../../component/member/GetBlockForm';
import TopBar from "../../component/payment/TopBar";
import BottomBar from "../../component/common/BottomBar";

const GetBlock = () => {
    return (
        <div>
            <GetBlockForm />
            <TopBar>차단 상세 조회</TopBar>
            <BottomBar/>
        </div>
    );
};

export default GetBlock;