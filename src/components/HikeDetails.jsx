import { useState, useEffect } from "react";
import Modal from "react-modal";

function HikeDetails({ hike, closeModal }) {
  // console.log("HIKEs: ", hikesResult);
  return (
    <div>
      <div>{hike.duration}</div> <button onClick={closeModal}>close</button>
    </div>
  );
}

export default HikeDetails;
