import { useEffect, useState } from "react";

const ClubHome = ({ club }) => {
  return (
    <>
      <div>
        <h2>소 개</h2>
      </div>
      <br />
      <div>
        <p>{club.content}</p>
      </div>
      <hr />
    </>
  );
};

export default ClubHome;
