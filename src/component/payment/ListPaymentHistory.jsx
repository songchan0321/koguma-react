import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import LoadingProgress from "../common/LoadingProgress";
import { listPaymentHistoryAPI } from "../../apis/api/payment";
import { absoulte_timestamp } from "../../apis/utils/timestamp";
import { formatCommaNumber } from "../../apis/utils/price";
import NotExist from "../common/NotExist";

const ListPaymentHistory = ({ type }) => {
  const [history, setHistory] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await listPaymentHistoryAPI(type);
      setHistory(data);
    })();
  }, [type]);
  return !history ? (
    <LoadingProgress />
  ) : (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {console.log("history")}
      {console.log(history)}
      {history.length <= 0 ? (
        <NotExist
          title={(type === "TRANSFER" ? "송금" : "페이") + " 이력이 없어요!"}
          content={
            type === "TRANSFER"
              ? "마음에 드는 상품을 찾아볼까요?"
              : "충전을 통해 페이를 충전해보세요!"
          }
          url={type === "TRANSFER" ? "/product/list" : "/payment/charge"}
        />
      ) : (
        history.map((payment, idx) => (
          <>
            <ListItem alignItems="flex-start">
              <div style={{ position: "absolute", top: "1.8rem", right: "0" }}>
                {payment.type === "CHARGE" ? (
                  <span style={{ color: "green" }}>
                    {"+" + formatCommaNumber(payment.price) + "원"}
                  </span>
                ) : payment.type === "TRANSFER" &&
                  parseInt(payment.price) > 0 ? (
                  <span style={{ color: "green" }}>
                    {"+" + formatCommaNumber(payment.price) + "원"}
                  </span>
                ) : (
                  formatCommaNumber(payment.price) + "원"
                )}
                {/* {formatCommaNumber(payment.price) + "원"} */}
              </div>
              <ListItemText
                primary={
                  payment.type === "TRANSFER"
                    ? payment.info.replace(",", " (") + ")"
                    : payment.info
                }
                secondary={
                  <Fragment>
                    {/* <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography> */}
                    {absoulte_timestamp(payment.regDate, true)}{" "}
                    {payment.type === "REFUND_REQUEST" && "(환급 요청)"}
                  </Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </>
        ))
      )}
    </List>
  );
};

export default ListPaymentHistory;
