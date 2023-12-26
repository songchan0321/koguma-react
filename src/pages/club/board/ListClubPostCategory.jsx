import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addClubPostCategory,
  listClubPostCategories,
} from "../../../apis/api/club";
import TopBarClub from "../../../component/club/common/TopBarClub";
import ModalAddCategory from "./ModalAddCategory";
import MarginEmpty from "../../../component/payment/MarginEmpty";

const ListClubPostCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clubId } = location.state;
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listClubPostCategories(clubId);
      setCategories(data);
      console.log(data);
    };
    fetchData();
  }, [clubId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async (categoryName) => {
    alert(`handleConfirm=>${categoryName}`);
    await addClubPostCategory(clubId, categoryName);
    console.log(`Add category: ${categoryName}`);
    const newData = await listClubPostCategories(clubId);
    setCategories([...newData]);
  };

  return (
    <>
      <TopBarClub>게시판 관리</TopBarClub>
      <MarginEmpty value={60} />
      <div>
        {categories &&
          categories.map((category) => (
            <div style={backgroundStyle}>
              <Typography variant="body1">{category.name}</Typography>
            </div>
          ))}
      </div>
      <MarginEmpty value={13} />
      <Button
        variant="contained"
        color="secondary"
        style={fixedButtonStyle}
        onClick={handleOpenModal}
      >
        + 게시판 만들기
      </Button>
      <ModalAddCategory
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ListClubPostCategory;

const fixedButtonStyle = {
  bottom: 0,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
