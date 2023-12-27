import React, { Fragment, useState, useEffect } from "react";
import ListComment from "../../component/community/ListCommment";
import GetPostForm from "../../component/community/GetPostForm";
import Back from "../../component/common/Back";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { CircularProgress } from "@mui/material";
import TopBar from "../../component/payment/TopBar";

const GetPost = () => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // 게시글 데이터를 가져오는 비동기 함수 (예: API 호출)
    const fetchData = async () => {
      try {
        // 데이터를 가져오는 비동기 호출 예시
        const response = await fetch("/api/getPostData");
        const data = await response.json();

        // 가져온 데이터를 상태에 저장
        setPostData(data);
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 에러 발생:", error);
      } finally {
        // 데이터 로딩이 완료되었음을 표시
        setLoading(false);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  return (
    <>
      <Back url={"/post/list"} />
      <MarginEmpty value={"70px"} />
      <TopBar>동네생활</TopBar>
      <Fragment>
        {/* <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
        elevation={3}
        >
        <DetailOption
        editTo="update"
        reportTo="/member/report/add"
        title="게시글 관리"
        />
      </Paper> */}
        <div>
          {/* <Divider /> */}

          {loading ? (
            // 로딩 중이면 CircularProgress 표시
            <CircularProgress />
          ) : (
            // 로딩이 완료되면 게시글 및 댓글 컴포넌트 랜더링
            <Fragment>
              <GetPostForm postData={postData} />
              {/* <AddComment /> */}
              <ListComment />
              <MarginEmpty value={"66px"} />
            </Fragment>
          )}
        </div>
      </Fragment>
    </>
  );
};

export default GetPost;
