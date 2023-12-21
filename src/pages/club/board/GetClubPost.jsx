import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClubPostAPI } from "../../../apis/api/club";
import TopBar from "../../../component/payment/TopBar";
import TopBarClub from "../../../component/club/common/TopBarClub";

const GetClubPost = () => {
  const navigate = useNavigate();
  const { clubPostId } = useParams();
  const [clubPost, setClubPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClubPostAPI(clubPostId);
      setClubPost(data);
      try {
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubPostId]);
  return (
    <>
      <div position="fixed" sx={{ textAlign: "center", mb: 1.5 }}>
        <TopBarClub>
          <div onClick={() => navigate(`/club/${clubPost.clubId}`)}>
            {clubPost.clubName}
          </div>
        </TopBarClub>
      </div>
    </>
  );
};

export default GetClubPost;
