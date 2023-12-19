import { useEffect, useState } from "react";
import { addClubPost, listClubPostCategories } from "../../../apis/api/club";
import { Button, Modal } from "@mui/material";
import { useLocation } from "react-router-dom";

const AddClubPost = () => {
  const location = useLocation();
  const clubId = location.state.clubId;
  const clubMember = location.state.clubMember;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("자유");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubPostCategories(clubId);
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터 생성
    const formData = { title, content };

    // 서버로 데이터 전송
    try {
      setIsSubmitting(true);
      const response = await addClubPost(clubId, formData);

      // 성공적으로 작성된 경우에 대한 처리
      console.log("게시글이 성공적으로 작성되었습니다.", response.data);

      // 폼 초기화 또는 닫기 등의 작업 수행
      setTitle("");
      setContent("");
    } catch (error) {
      // 작성 실패 시 에러 처리
      console.error("게시글 작성 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Button onClick={handleOpenModal}>{selectedCategory}</Button>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Modal>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "게시 중..." : "게시글 작성"}
        </button>
      </form>
    </>
  );
};

export default AddClubPost;
