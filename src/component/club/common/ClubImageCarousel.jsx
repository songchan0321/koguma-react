import React from "react";
import { Carousel } from "react-bootstrap";

const ClubImageCarousel = () => {
  const test = [`1`, "2", "3"];

  return (
    <div>
      <Carousel
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={30}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
      >
        {test.map((t) => (
          <div>
            <p>{t}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ClubImageCarousel;
