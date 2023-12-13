import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import {
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MyList from "../../component/product/MyList";

const MySaleProduct = () => {
  //   const { clubId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedAction, setSelectedAction] = useState([
    {
      name: ["예약중", "거래완료", "게시글 수정", "숨기기", "삭제"],
      //    action:[handleReservation(),
      //            '2','3','4','5,'
      //     ]
    },
    { name: ["판매중", "게시글 수정", "숨기기", "삭제"] },
    { name: ["게시글 수정", "삭제"] },
  ]);
  const [selectedMenu, setSelectedMenu] = useState("판매 중");
  const menuList = ["판매 중", "판매 완료", "숨김 중"];

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = await getClubAPI(clubId);
  //         setProduct(data);
  //         console.log(data.title);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, [clubId]); // clubId가 변경될 때마다 데이터를 다시 가져오도록

  const selectActionHandler = () => {};
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <TopReturnBar />
      <CardHeader
        sx={{ m: 4 }}
        title="나의 판매내역"
        avatar={<Avatar aria-label="recipe">R</Avatar>}
      />
      <div>
        <h1>{product.title}</h1>
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        {menuList.map((menu) => (
          <Button
            key={menu}
            onClick={() => handleMenuClick(menu)}
            variant={selectedMenu === menu ? "contained" : "outlined"}
            color="secondary"
            style={{ flex: 1 }}
          >
            {menu}
          </Button>
        ))}
      </div>
      <hr></hr>

      {selectedMenu === "판매 중" && selectedAction && (
        <MyList buttonNM="끌어올리기" selectedActions={selectedAction[0]} />
      )}
      {/* {selectedMenu === "meetUp" && <ClubHomeMeetUp clubId={clubId} />} */}
      {selectedMenu === "판매 완료" && selectedAction && (
        <MyList buttonNM="받은 후기 보기" selectedActions={selectedAction[1]} />
      )}
      {selectedMenu === "숨김 중" && selectedAction && (
        <MyList buttonNM="숨기기 해제" selectedActions={selectedAction[2]} />
      )}
    </>
  );
};

export default MySaleProduct;
