import React from 'react';
import ListBlockForm from '../../component/member/ListBlockForm';
import BottomBar from "../../component/common/BottomBar";
const ListBlock = () => {
    return (
        <div style={{  alignItems: 'center', marginTop: '50px' }}>
            <ListBlockForm />
            <BottomBar/>
        </div>
    );
};

export default ListBlock;
