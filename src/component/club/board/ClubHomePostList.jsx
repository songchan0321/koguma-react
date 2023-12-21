import { Box, Chip, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listClubPostCategories } from "../../../apis/api/club";
import ListClubPostByCategory from "./ListClubPostByCategory";
const ClubHomePostList = ({ clubId, clubMember }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubPostCategories(clubId);
        setCategories(["전체", ...data]);
        setSelectedCategory("전체");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "전체" ? "전체" : category);
  };

  return (
    <>
      <div style={{ marginTop: "3px", marginLeft: "5px" }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            py: 1,
            overflowX: "auto", // 변경: overflow-x 속성을 사용하여 가로 스크롤 적용
            width: "100%", // 변경: 컨테이너의 너비를 100%로 설정
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
              flex: "0 0 auto", // 변경: 각 칩이 자신의 크기를 유지하도록 flex 속성 추가
            },
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {categories.map((category, index) => (
            <Chip
              label={category === "전체" ? "전체" : category.name}
              key={index}
              onClick={() => handleCategoryClick(category)}
              variant={
                selectedCategory === categories[index]
                  ? "contained"
                  : "outlined"
              }
              color="secondary"
            />
          ))}
        </Box>

        {selectedCategory === "전체" ? (
          <div>
            {/* 전체 카테고리를 클릭한 경우에 보여줄 내용 */}
            {/* 예: 전체 포스트 리스트 */}
          </div>
        ) : (
          <div>
            <ListClubPostByCategory category={selectedCategory} />
          </div>
        )}

        <div style={fabContainerStyle}>
          <Link
            to={"/club/post/add"}
            state={{ clubId: clubId, clubMember: clubMember }}
          >
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClubHomePostList;

const fabContainerStyle = {
  position: "fixed",
  bottom: 45, // 조절 가능
  right: 40, // 조절 가능
};
