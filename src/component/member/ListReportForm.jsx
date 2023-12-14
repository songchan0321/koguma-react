import React, { useEffect, useState } from 'react';
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from 'react-router-dom';

const ListReportForm = () => {
    const [reportList, setReportList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportList = async () => {
            try {
                const response = await authInstance.get('/member/report/list');
                console.log('Response:', response); // 응답 전체를 출력
                console.log('Data:', response.data); // 응답에서 데이터만 출력
                setReportList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchReportList();

    }, []);

    const handleNavigateToReportDetail = () => {
        // 신고 상세 페이지로 이동
        navigate(`/member/report/get`);
    };

    return (
        <div>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <ul>
                    {reportList.map((report) => (
                        <li key={report.reportTitle}>
                            {report.reportTitle}
                            {' '}
                            <button onClick={() => handleNavigateToReportDetail(report.reportTitle)}>
                                신고 상세 정보
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListReportForm;
