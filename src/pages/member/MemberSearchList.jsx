import * as React from "react";
import { useEffect, useState } from "react";

import LoadingProgress from "../../component/common/LoadingProgress";
import NotData from "../../component/product/NotData";
import { getMemberSearchByLocationAPI } from "../../apis/api/member";
import LocationByMember from "../../component/member/LocationByMember";
import MarginEmpty from "../../component/payment/MarginEmpty";

const MemberSearchList = ({ query }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const listProduct = async () => {
    try {
      const data = await getMemberSearchByLocationAPI(query);
      console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    listProduct();
  }, [query]);
  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : data.length > 0 ? (
        <>
          <MarginEmpty value={"8.0rem"} />
          <LocationByMember data={data} />
        </>
      ) : (
        <NotData>
          <div style={{ color: "lightgray" }}>검색된 회원이 없어요.</div>
        </NotData>
      )}
      <MarginEmpty />
    </>
  );
};
export default MemberSearchList;
