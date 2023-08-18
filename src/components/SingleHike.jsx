import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HikeDetails from "./HikeDetails.jsx";
import Modal from "react-modal";
import axios from "axios";

function SingleHike({
  /*hikesResult,*/
  hike,
  index,
  user,
  searchInput,
  remove,
  save,
  savedHikes,
  setSavedHikes,
  // hikesSaved,
  // setHikesSaved,
  // isSaved,
  // setIsSaved,
  // isUser,
}) {
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedSaved, setClickedSaved] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  const [imageSource, setImageSource] = useState(
    hike.image || `${hike.images[0].url}`
  );
  const [parkSource, setParkSource] = useState(
    hike.park || hike.relatedParks[0].fullName
  );

  const navigate = useNavigate();

  const handleClick = (event) => {
    setClickedModal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveHike = async (hikeToSave) => {
    const data = {
      user_id: user.id,
      hike_id: hikeToSave.id,
      title: hikeToSave.title,
      state: searchInput,
      park: hikeToSave.relatedParks[0].fullName,
      summary: hikeToSave.shortDescription,
      summary_long: hikeToSave.longDescription,
      duration: hikeToSave.duration,
      pets: hikeToSave.arePetsPermitted,
      pets_info: hikeToSave.petsDescription,
      reservation: hikeToSave.isReservationRequired,
      fee: hikeToSave.doFeesApply,
      fee_info: hikeToSave.feeDescription,
      age: hikeToSave.age,
      image: hikeToSave.images[0].url,
    };
    try {
      const res = await axios.post("/saved-hikes", data);
      // console.log(res.data);
      if (res.data.length > 0) {
        setClickedSaved(true);
        setSavedHikes([...savedHikes, res.data[0]]);
      }
    } catch (error) {
      console.log("ERROR SAVING HIKE: ", error);
    }
  };

  const removeHike = (hikeToremove) => {
    // setClickedSaved(!clickedSaved);
    axios
      .delete(`/saved-hikes?user_id=${user.id}&hike_id=${hikeToremove.hike_id}`)
      .then((res) => {
        console.log("POST RES: ", res.data);
        setSavedHikes(res.data);
      })
      .catch((error) => {
        console.log("ERROR REMOVING HIKE: ", error);
      });
  };
  // console.log("clicked save: ", clickedSaved);
  // console.log("HIKE: ", hike);
  return (
    <div>
      {/* <Link to="/details"> */}
      <div onClick={handleClick} style={{ padding: "10px" }}>
        <img style={{ hight: "300px", width: "300px" }} src={imageSource} />
        <div style={{ fontSize: "20px" }}>{hike.title}</div>
        <div>at</div>
        <div>{parkSource}</div>
        <div>{hike.id}</div>
      </div>
      {save ? (
        <button onClick={() => saveHike(hike)} disabled={clickedSaved}>
          Save
        </button>
      ) : null}
      {/* {!isSaved ? (
        <button onClick={() => saveHike(hike)} disabled={clickedSaved}>
          Save
        </button>
      ) : (
        <button onClick={() => removeHike(hike)}>Remove</button>
      )} */}

      {remove ? <button onClick={() => removeHike(hike)}>Remove</button> : null}
      {clickedModal === true ? (
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
