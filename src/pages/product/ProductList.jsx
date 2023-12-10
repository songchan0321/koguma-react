import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { memberchecAPI } from "../../apis/api/Product";

const ProductList = () => {
    console.log(localStorage.getItem("token"));
    (async () => {
        try {
          const data = await memberchecAPI();  //시큐리티 회원 확인 테스트용
          
          console.log(data)
        } catch (err) {
          console.error(err);
        } finally {
        }
      })();

    return (
        <>
            <h1>hello</h1>
        </>
    );
};
export default ProductList;