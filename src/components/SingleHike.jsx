import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HikeDetails from "./HikeDetails.jsx";
import Modal from "react-modal";

function SingleHike({ hikesResult, hike, index }) {
  const [clicked, setClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setClicked(true);
    setModalOpen(true);
    // navigate("/details");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    setClicked(!clicked);
  }, []);

  return (
    <div>
      {/* <Link to="/details"> */}
      <div onClick={handleClick} style={{ padding: "10px" }}>
        <img
          style={{ hight: "300px", width: "300px" }}
          src={`${hike.images[0].url}`}
        />
        <div style={{ fontSize: "20px" }}>{hike.title}</div>
        <div>at</div>
        <div>{hike.relatedParks[0].fullName}</div>
      </div>
      {clicked === true ? (
        <Modal
          className="modal"
          isOpen={modalOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <HikeDetails closeModal={closeModal} hike={hike} />
          {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
        </Modal>
      ) : null}
      {/* </Link> */}
      {/* <HikeDetails hikesResult={hikesResult} hike={hike} index={index} /> */}
    </div>
  );
}

export default SingleHike;
