import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, CardHeader, Avatar, AppBar } from "@mui/material";
import Back from "../../component/common/Back";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { getMemberAPI, getProfileAPI } from "../../apis/api/member";
import OtherMemberProduct from "../../component/product/OtherMemberProduct";
import LoadingProgress from "../../component/common/LoadingProgress";

const OtherMemberSaleList = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("거래 중");
  const [selectedMenuType, setSelectedMenuType] = useState("SALE");
  const menuList = ["거래 중", "거래 완료"];
  const menuListEng = ["SALE", "SALED"];
  const [member, setMember] = useState();
  const [loading, setLoading] = useState(true);

  const handleMenuClick = (idx) => {
    setSelectedMenu(menuList[idx]);
    setSelectedMenuType(menuListEng[idx]);
  };

  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(memberId);
        const data = await getProfileAPI(memberId);
        setMember(data);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching member data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <Back url={`/member/other/get/${state.memberId}`} />
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
              title={member && `${member.nickname}님 판매물품`}
              action={
                member && (
                  <Avatar
                    aria-label="recipe"
                    sx={{
                      width: "80px",
                      height: "80px",
                    }}
                    src={member?.profileURL}
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

          <hr></hr>

          {selectedMenu === "거래 중" && (
            <OtherMemberProduct
              selectedMenuType={selectedMenuType}
              onClickGetProduct={getProduct}
              memberId={memberId}
            />
          )}

          {selectedMenu === "거래 완료" && (
            <OtherMemberProduct
              selectedMenuType={selectedMenuType}
              onClickGetProduct={getProduct}
              memberId={memberId}
            />
          )}
        </>
      )}
    </>
  );
};

export default OtherMemberSaleList;
