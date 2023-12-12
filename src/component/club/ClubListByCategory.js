import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { listClubByCategoryAPI } from "../../apis/api/club";
import { Link } from "react-router-dom";

const ClubListByCategory = ({ categoryId }) => {
  const [listClub, setListClub] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubByCategoryAPI(categoryId);
        console.log(data);
        setListClub(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <>
      <div>우리동네 모임 </div>
      {listClub &&
        listClub.map((club) => (
          <div key={club.id}>
            <Link to={`/club/${club.id}`}>
              <Button>
                <h2>{club.title}</h2>
              </Button>
            </Link>
          </div>
        ))}
    </>
  );
};

export default ClubListByCategory;
