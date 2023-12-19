import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import LikeCheckButton from "../common/LikeCheckButton";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  addProductLikeAPI,
  deleteProductLikeAPI,
  getProductLikeAPI,
} from "../../apis/api/Product";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const LikeProduct = ({ prodId }) => {
  const [checked, setChecked] = React.useState(false);
  const [load, isLoad] = React.useState(false);
  console.log(prodId);
  const handleChange = async (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      await addProductLikeAPI(prodId);
    } else {
      await deleteProductLikeAPI(prodId);
    }
  };

  const getProductLike = async () => {
    try {
      const data = await getProductLikeAPI(prodId);
      // data가 null이 아니라면 setChecked 호출
      console.log(data);
      if (data && data.id !== null) {
        console.log("hi");
        setChecked(true);
      }
    } catch (err) {
      console.log("Error fetching product like:", err);
    }
  };

  useEffect(() => {
    getProductLike();
    console.log();
    isLoad(true);
  }, []);

  return (
    <IconButton aria-label="add to favorites">
      <div>
        <Checkbox
          color="secondary"
          {...label}
          checked={checked}
          onChange={handleChange}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </div>
    </IconButton>
  );
};

export default LikeProduct;
