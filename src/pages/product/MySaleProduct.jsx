import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardHeader, Avatar, AppBar } from "@mui/material";
import MyList from "../../component/product/MyList";
import MySaledList from "../../component/product/MySaledList";

import Back from "../../component/common/Back";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { useModal } from "../../context/ModalContext";
import {
  raiseProductAPI,
  updateTradeStateAPI,
  deleteProductAPI,
} from "../../apis/api/Product";
import { getMemberAPI } from "../../apis/api/member";
import Modal from "../../component/common/Modal";

const MySaleProduct = () => {
  //   const { clubId } = useParams();
  const navigate = useNavigate();
  const [change, setChange] = useState(0);
  const { openModal } = useModal();

  const [selectedActionSale, setSelectedActionSale] = useState([
    {
      name: "예약중",
      action: async (productId) => {
        await updateTradeState(productId, "RESERVATION");
        await openModal("상품을 예약중으로 바꿨습니다.", true, () => {});
        setChange(change + 1);
      },
    },
    {
      name: "거래완료",
      action: (productId) => navigate(`/product/get/seller/${productId}`),
    },
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "숨기기",
      action: async (productId) => {
        await updateTradeState(productId, "HIDE");
        await openModal(
          <div>
            <span>상품을 숨김 상태로 바꿨습니다.</span>
            <br />
            <span>숨긴 상품은 상품 목록에서</span>
            <br />
            <span>볼 수 없습니다.</span>
          </div>,
          true,
          () => {}
        );
        setChange(change + 1);
      },
    },
    {
      name: "삭제",
      action: async (productId) => {
        await openModal(<span>상품을 삭제했습니다.</span>, true, () => {});
        await deleteProduct(productId);
        setChange(change + 1);
      },
    },
  ]);
  const [selectedActionSaled, setSelectedActionSaled] = useState([
    {
      name: "판매중",
      action: async (productId) => {
        await updateTradeState(productId, "SALE");
        await openModal(
          <div>
            <span>상품을 판매중으로 바꿨습니다.</span>
            <br />
            <span>작성된 리뷰는 삭제됩니다.</span>
          </div>,
          true,
          () => {}
        );

        setChange(change + 1);
      },
    },
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "숨기기",
      action: async (productId) => {
        await updateTradeState(productId, "HIDE");
        await openModal(
          <div>
            <span>상품을 숨김 상태로 바꿨습니다.</span>
            <br />
            <span>숨긴 상품은 상품 목록에서</span>
            <br />
            <span>볼 수 없습니다.</span>
          </div>,
          true,
          () => {}
        );

        setChange(change + 1);
      },
    },
    {
      name: "삭제",
      action: async (productId) => {
        await deleteProduct(productId);
        await openModal(<span>상품을 삭제했습니다.</span>, true, () => {});

        setChange(change + 1);
      },
    },
  ]);
  const [selectedActionReservation, setSelectedActionReservation] = useState([
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "숨기기",
      action: async (productId) => {
        await updateTradeState(productId, "HIDE");
        await openModal(
          <div>
            <span>상품을 숨김 상태로 바꿨습니다.</span>
            <br />
            <span>숨긴 상품은 상품 목록에서</span>
            <br />
            <span>볼 수 없습니다.</span>
          </div>,
          true,
          () => {}
        );

        setChange(change + 1);
      },
    },
    {
      name: "삭제",
      action: async (productId) => {
        await deleteProduct(productId);
        await openModal(<span>상품을 삭제했습니다.</span>, true, () => {});
        setChange(change + 1);
      },
    },
  ]);
  const [selectedActionHide, setSelectedActionHide] = useState([
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "삭제",
      action: async (productId) => {
        await deleteProduct(productId);
        await openModal(<span>상품을 삭제했습니다.</span>, true, () => {});
        setChange(change + 1);
      },
    },
  ]);

  const [selectedMenu, setSelectedMenu] = useState("판매 중");
  const [selectedMenuType, setSelectedMenuType] = useState("SALE");
  const menuList = ["판매 중", "판매 완료", "예약 중", "숨김 중"];
  const menuListEng = ["SALE", "SALED", "RESERVATION", "HIDE"];
  const [member, setMember] = useState();
  const [alert, setAlert] = useState(null);

  const getProductReview = (productId) => {
    navigate(`/product/review/get/${productId}`);
  };
  const changeHide = async (productId) => {
    await updateTradeState(productId, "RESTORE");
    await openModal("상품을 숨김상태에서 해제했어요.", true, () => {});
  };

  const handleMenuClick = (idx) => {
    setSelectedMenu(menuList[idx]);
    setSelectedMenuType(menuListEng[idx]);
  };

  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  const raiseProduct = async (productId) => {
    try {
      const response = await raiseProductAPI(productId);
      await openModal("끌어올리기 성공!", true, () => {});
    } catch (err) {
      await openModal(
        <div>
          끌어올리기 가능 시간까지
          <br />
          {err.response.data}
        </div>,
        false,
        () => {}
      );

      console.log(err);
    }
  };
  const updateTradeState = async (prodcutId, type) => {
    // 상품 상태 변경 axios 요청
    await updateTradeStateAPI(prodcutId, type);
  };
  const updateTradeStateByReservation = async (prodcutId) => {
    //예약중인 상품을 판매중으로 변경
    await updateTradeStateAPI(prodcutId, "SALE");
    await openModal(
      <div>
        예약을 해제했습니다.
        <br />
        해제된 상품은 판매중에서
        <br />볼 수 있습니다.
      </div>,
      true,
      () => {}
    );
  };
  const deleteProduct = async (productId) => {
    await deleteProductAPI(productId);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberAPI();
        setMember(data);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Back url="/member/profile" />
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#ffffff",
          zIndex: 90,
        }}
      >
        <MarginEmpty value={"50px"} />
        <CardHeader
          sx={{ m: 4, color: "black" }}
          title="나의 판매내역"
          action={
            member && (
              <Avatar
                aria-label="recipe"
                sx={{
                  width: "80px",
                  height: "80px",
                }}
                src={member.profileURL === null ? undefined : member.profileURL}
                alt=""
              ></Avatar>
            )
          }
        />

        <div style={{ display: "flex", width: "100%" }}>
          {menuList.map((menu, idx) => (
            <Button
              key={menu}
              onClick={() => handleMenuClick(idx)}
              variant={selectedMenu === menu ? "contained" : "outlined"}
              color="secondary"
              style={{ flex: 1 }}
            >
              {menu}
            </Button>
          ))}
        </div>
      </AppBar>
      <Modal />

      <hr></hr>

      {selectedMenu === "판매 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="끌어올리기"
          onClick={raiseProduct}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionSale}
          setChange={setChange}
          change={change}
        />
      )}

      {selectedMenu === "판매 완료" && (
        <MySaledList
          selectedMenuType={selectedMenuType}
          buttonNM="받은 후기 보기"
          onClick={getProductReview}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionSaled}
          setChange={setChange}
          change={change}
        />
      )}
      {selectedMenu === "예약 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="예약 해제"
          onClick={updateTradeStateByReservation}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionReservation}
          setChange={setChange}
          change={change}
        />
      )}
      {selectedMenu === "숨김 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="숨기기 해제"
          onClick={changeHide}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionHide}
          setChange={setChange}
          change={change}
        />
      )}
    </>
  );
};

export default MySaleProduct;
