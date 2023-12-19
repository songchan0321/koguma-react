import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { listMyClubPostAPI } from "../../../apis/api/club";

const MyClubPostList = () => {
  const [clubPosts, setClubPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMyClubPostAPI();
        console.log(data);
        setClubPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Typography variant="h5">피드</Typography>
      </div>

      <Paper>
        {clubPosts.map((clubPost) => (
          <div>{clubPost.content}</div>
        ))}
      </Paper>
    </>
  );
};

export default MyClubPostList;
