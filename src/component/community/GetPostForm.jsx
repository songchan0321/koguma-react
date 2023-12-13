import { useEffect, useState, useContext } from "react";
import { IsLoginContext } from "../../context/LoginContextProvider";
import { getPostAPI } from "../../apis/api/community";
import { Container, Button } from "@mui/material";
import LoadingProgress from "../../component/common/LoadingProgress";

const GetPostForm = () => {
  const { setIsLogin } = useContext(IsLoginContext);
  const [getPost, setGetPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await getPostAPI.then(({ result }) => {
          setGetPost(result);
          //set댓글리스트
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container fixed>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <Button onClick={() => setIsLogin(false)}>Logout</Button>
        </>
      )}
    </Container>
  );
};
export default GetPostForm;
