import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import AttachMoney from '@mui/icons-material/AttachMoney';
import FaceRetouchingNatural from '@mui/icons-material/FaceRetouchingNatural';
import HolidayVillage from '@mui/icons-material/HolidayVillage';
import Groups from '@mui/icons-material/Groups';
import LocalMall from '@mui/icons-material/LocalMall';
import HandymanIcon from '@mui/icons-material/Handyman';

const ProfileForm = ({ navigate }) => {
  const handleNavigate = (url) => {
    navigate(url);
  };
  const [openPoint, setOpenPoint] = useState(false);
  const [openTrade, setOpenTrade] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);
  const [openClub, setOpenClub] = useState(false);
  const [openRelationship, setOpenRelationship] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);

  const handleToggle = (section) => {
    switch (section) {
      case "point":
        setOpenPoint(!openPoint);
        break;
      case "trade":
        setOpenTrade(!openTrade);
        break;
      case "community":
        setOpenCommunity(!openCommunity);
        break;
      case "club":
        setOpenClub(!openClub);
        break;
      case "relationship":
        setOpenRelationship(!openRelationship);
        break;
      case "support":
        setOpenSupport(!openSupport);
        break;
      default:
        break;
    }
  };

  return (
      <Box >
          <List >
            {/* 포인트 섹션 */}
            <ListItemButton onClick={() => handleToggle("point")}>
              <AttachMoney/>
              <ListItemText primary="포인트 관리"  sx={{ marginLeft: 2 }}/>
            </ListItemButton>
            <Collapse in={openPoint} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={() => handleNavigate("/payment/get")}>
                  <ListItemText primary="고구마 포인트" sx={{ marginLeft: 7 }} />
                </ListItemButton>
              </List>
            </Collapse>

            {/* 나의 거래 섹션 */}
            <ListItemButton onClick={() => handleToggle("trade")}>
              <LocalMall/>
              <ListItemText primary="나의 거래"  sx={{ marginLeft: 2 }}/>
            </ListItemButton>
            <Collapse in={openTrade} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={() => handleNavigate("/product/list/sale")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="내 상품" sx={{marginLeft: 7}}/>
                </ListItemButton>
                <ListItemButton onClick={() => handleNavigate("/product/list/buy")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="구매 내역" sx={{marginLeft: 7}}/>
                </ListItemButton>
                <ListItemButton onClick={() => handleNavigate("/product/list/like")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="관심 상품" sx={{marginLeft: 7}}/>
                </ListItemButton>
              </List>
            </Collapse>

            {/* 나의 동네생활 섹션 */}
            <ListItemButton onClick={() => handleToggle("community")}>
              <HolidayVillage/>
              <ListItemText primary="나의 동네생활"  sx={{ marginLeft: 2 }}/>
            </ListItemButton>
            <Collapse in={openCommunity} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={() => handleNavigate("/post/list/community")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="동네생활 활동" sx={{marginLeft: 7}}/>
                </ListItemButton>
              </List>
            </Collapse>

            {/* 나의 모임 섹션 */}
            <ListItemButton onClick={() => handleToggle("club")}>
              <Groups/>
              <ListItemText primary="나의 모임"  sx={{ marginLeft: 2 }}/>
            </ListItemButton>
            <Collapse in={openClub} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={() => handleNavigate("/club/list")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="모임 활동" sx={{marginLeft: 7}}/>
                </ListItemButton>
              </List>
            </Collapse>

            {/* 회원 관계 섹션 */}
            <ListItemButton onClick={() => handleToggle("relationship")}>
              <FaceRetouchingNatural/>
              <ListItemText primary="차단 및 팔로잉" sx={{ marginLeft: 2 }} />
            </ListItemButton>
            <Collapse in={openRelationship} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={() => handleNavigate("/member/relationship/block/list")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="차단" sx={{marginLeft: 7}}/>
                </ListItemButton>
                <ListItemButton onClick={() => handleNavigate("/member/relationship/following/list")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="팔로잉" sx={{marginLeft: 7}}/>
                </ListItemButton>
              </List>
            </Collapse>

            {/* 고객센터 섹션 */}
            <ListItemButton onClick={() => handleToggle("support")}>
              <HandymanIcon/>
              <ListItemText primary="계정 관리"  sx={{ marginLeft: 2 }}/>
            </ListItemButton>
            <Collapse in={openSupport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/*<ListItemButton onClick={() => handleNavigate("/member/report/list")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="문의 및 신고" sx={{marginLeft: 5}}/>
                </ListItemButton>*/}
                <ListItemButton onClick={() => handleNavigate("/member/delete")} fullWidth style={{ marginTop: 10 }}>
                  <ListItemText primary="회원 탈퇴" sx={{marginLeft: 7}}/>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
      </Box>
  );
};

export default ProfileForm;
