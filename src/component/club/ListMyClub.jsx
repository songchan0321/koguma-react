import { useEffect, useState } from "react";
import { listMyClubAPI } from "../../apis/api/club";

const ListMyClub = () => {
  const [myClubs, setMyClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMyClubAPI();
        setMyClubs(data);
      } catch (err) {
        console.log(err);
      }
    };
  });

  return (
    <>
      <div></div>
    </>
  );
};

export default ListMyClub;
