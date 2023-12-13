import * as React from "react";
import { useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";

const ProductList = () => {
  // const navigator = useNavigate();
  // const [ref, inView] = useInView();
  // const queryClient = useQueryClient();

  // const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery("purchases", ({ pageParam = 0 }) => getList(pageParam), {
  //     select: (data) => ({
  //       pages: data.pages,
  //       nextPage: data.pages.length + 1,
  //       pageParam: data.pageParams,
  //     }),
  //     getNextPageParam: (lastPage, allPages) => {
  //       const nextPage = allPages.length;
  //       return lastPage.nextPage === 0 ? undefined : nextPage;
  //     },
  //   });

  // async function getList(page, keyword) {
  //   await ListProductAPI(page, keyword);
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   queryClient.removeQueries("products");
  //   fetchNextPage({ pageParam: 0 });
  // };
  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage({
  //       page: data.nextPage,
  //     });
  //   }
  // }, [inView, hasNextPage]);
  return (
    <>
      <ProductTopBar />
      <BottomBar />
      <AddFloatingButton arrival={"/product/add"} />
      <ListContainingProduct type="report" />
      {/* {data ? (
        data.pages.map((item) =>
          item.result.map((list, idx) => (
            <ListContainingProduct
              type="report"
              lastItemRef={idx === item.result.length - 1 ? ref : null}
              index={idx}
              data={list}
            />
          ))
        )
      ) : (
        <div>Loading...</div>
      )} */}
    </>
  );
};
export default ProductList;
