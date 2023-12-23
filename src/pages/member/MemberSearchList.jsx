import * as React from "react";
import { useEffect, useState } from "react";

import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import NotData from "../../component/product/NotData";
import { getMemberSearchByLocationAPI } from "../../apis/api/member";
import LocationByMember from "../../component/member/LocationByMember";

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
        <LocationByMember data={data} />
      ) : (
        <NotData>값이 없어요!</NotData>
      )}
    </>
  );
};
export default MemberSearchList;
