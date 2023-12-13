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

const MyBuyProduct = () => {
  //   const { clubId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedAction, setSelectedAction] = useState([
    {
      name: ["목록에서 제외하기"],
      //    action:[handleReservation(),
      //            '2','3','4','5,'
      //     ]
    },
  ]);

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

  return (
    <>
      <TopReturnBar />

      {selectedAction && (
        <MyList buttonNM="받은 후기 보기" selectedActions={selectedAction[0]} />
      )}
    </>
  );
};

export default MyBuyProduct;
