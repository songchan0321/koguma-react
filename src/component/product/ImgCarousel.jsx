import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const ImgCarousel = ({ img }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  console.log(img);
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {img.map((image, idx) => (
        <Carousel.Item key={idx}>
          <a href={image.url} target="_blank" rel="noopener noreferrer">
            <img
              src={image.url}
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImgCarousel;
