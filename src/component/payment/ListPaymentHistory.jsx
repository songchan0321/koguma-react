import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import PaymentInfo from "../../component/payment/PaymentInfo";
import TopBar from "../../component/payment/TopBar";
import { Fragment, useEffect, useState } from "react";
import LoadingProgress from "../common/LoadingProgress";
import { listPaymentHistoryAPI } from "../../apis/api/payment";
import { absoulte_timestamp } from "../../apis/utils/timestamp";
import { formatCommaNumber } from "../../apis/utils/price";

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
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {history.map((payment, idx) => (
        <>
          <ListItem alignItems="flex-start">
            <div style={{ position: "absolute", top: "1.8rem", right: "0" }}>
              {payment.type === "CHARGE" ? (
                <span style={{ color: "green" }}>
                  {"+" + formatCommaNumber(payment.price) + "원"}
                </span>
              ) : payment.type === "TRANSFER" && parseInt(payment.price) > 0 ? (
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
                  {absoulte_timestamp(payment.regDate, true)}
                </Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
        </>
      ))}
    </List>
  );
};

export default ListPaymentHistory;
