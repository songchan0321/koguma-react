import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {deleteReportAPI, getReportAPI} from '../../apis/api/member';

const GetReportForm = () => {
    const { reporterId } = useParams();
    const [getReport, setGetReport] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDeleteReport = async () => {
        const confirmed = window.confirm('신고를 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await deleteReportAPI();
                alert('신고가 삭제되었습니다.');
                alert('신고 목록으로 돌아갑니다.')



                navigate('/member/report/list');
            } catch (error) {
                console.error('Error deleting report:', error);
            }
        }
    };

    useEffect(() => {
        const fetchGetReport = async () => {

            try {
                const reportData = await getReportAPI();
                console.log('Report Data:', reportData);
                setGetReport(reportData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setLoading(false);
            }
        };

        fetchGetReport();
    }, []);

    return (
        <div>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <div>
                    <p>신고 제목: {getReport.reportTitle}</p>
                    <p>신고 내용: {getReport.reportContent}</p>
                    <p>신고 일시: {getReport.regDate}</p>
                    <button onClick={handleDeleteReport}>신고 삭제</button>
                </div>
            )}
        </div>
    );
};

export default GetReportForm;
