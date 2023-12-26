import { useNavigate, useParams } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import { listSuggestPriceAPI } from "../../apis/api/Product";

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import NotData from "../../component/product/NotData";
import SuggestPriceComponent from "../../component/product/SuggestPriceComponent";

const ProductList = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const { productId } = useParams();
  const [isDone, setIsDone] = useState(false);

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listSuggestPriceAPI(productId);
        setDatas(result);
        setIsDone(true);
        console.log(result);
        console.log("hi");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Back />
      <TopBar>가격제안 리스트</TopBar>
      <MarginEmpty />

      {isDone && datas.length > 0 ? (
        (console.log(datas),
        datas.map((suggestData, idx) => (
          <SuggestPriceComponent key={idx} data={suggestData} />
        )))
      ) : (
        <NotData
          children={
            <>
              <div style={{ color: "lightgray" }}>
                아직 가격을 제안한 이웃이 없어요.
              </div>
              <div style={{ color: "lightgray" }}>
                이웃이 가격 제안을 하면 알려드릴게요!
              </div>
            </>
          }
        />
      )}
    </>
  );
};
export default ProductList;
