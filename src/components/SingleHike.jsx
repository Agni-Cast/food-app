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
  onSavedPage,
  // hikesSaved,
  // setHikesSaved,
  // isSaved,
  // setIsSaved,
  // isUser,
}) {
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedSaved, setClickedSaved] = useState(false);
  const [saveOrRemove, setSaveOrRemove] = useState("Save");
  // const [isSaved, setIsSaved] = useState(false);
  const [imageSource, setImageSource] = useState(
    hike.image || `${hike.images[0].url}`
  );
  const [parkSource, setParkSource] = useState(
    hike.park || hike.relatedParks[0].fullName
  );
  // const [stateSource, setStateSource] = useState(
  //   hike.state || hike.relatedParks[0].state
  // );
  const navigate = useNavigate();

  const handleClick = (event) => {
    setClickedModal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveHike = async (hikeToSave) => {
    // if (saveOrRemove === "Save") {
    const data = {
      user_id: user.id,
      hike_id: hikeToSave.id,
      title: hikeToSave.title,
      parksource: searchInput /*hikeToSave.relatedParks[0].states*/,
      park: hikeToSave.relatedParks[0].fullName,
      shortdescription: hikeToSave.shortDescription,
      longdescription: hikeToSave.longDescription,
      duration: hikeToSave.duration,
      arepetspermitted: hikeToSave.arePetsPermitted,
      petsdescription: hikeToSave.petsDescription,
      isreservationrequired: hikeToSave.isReservationRequired,
      dofeesapply: hikeToSave.doFeesApply,
      feedescription: hikeToSave.feeDescription,
      age: hikeToSave.age,
      image: hikeToSave.images[0].url,
    };
    try {
      const res = await axios.post("/saved-hikes", data);
      // console.log(res.data);
      if (res.data.length > 0) {
        setClickedSaved(true);
        setSavedHikes([...savedHikes, res.data[0]]);
        setSaveOrRemove("Remove");
      }
    } catch (error) {
      console.log("ERROR SAVING HIKE: ", error);
    }
    // } else {
    //   removeHike(hikeToSave);
    // }
  };

  const removeHike = (hikeToremove) => {
    // setClickedSaved(!clickedSaved);
    let idToRemove = hikeToremove.hike_id || hikeToremove.id;
    axios
      .delete(`/saved-hikes?user_id=${user.id}&hike_id=${idToRemove}`)
      .then((res) => {
        console.log("POST RES: ", res.data);
        setSavedHikes(res.data);
        console.log("REMOVED!!!!!!");
        setSaveOrRemove("Save");
      })
      .catch((error) => {
        console.log("ERROR REMOVING HIKE: ", error);
      });
  };
  const handleClickButton = (oneHike) => {
    if (saveOrRemove === "Save") {
      saveHike(oneHike);
    } else if (saveOrRemove === "Remove") {
      removeHike(oneHike);
    }
  };
  // console.log("clicked save: ", clickedSaved);
  // console.log("HIKE: ", hike);
  useEffect(() => {
    if (save) {
      // console.log(hike);
      for (let obj of savedHikes) {
        // console.log("OBJ.ID", obj.hike_id);
        // console.log("HIKE.ID", hike.id);

        if (obj.hike_id === hike.id) {
          // console.log("ALREADY SAVED!!!!!!!");
          setSaveOrRemove("Remove");
        }
      }
    }
  }, [savedHikes]);

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
        <button
          onClick={() => handleClickButton(hike)} /*disabled={clickedSaved}*/
        >
          {saveOrRemove}
        </button>
      ) : null}
      {/* {!isSaved ? (
        <button onClick={() => saveHike(hike)} disabled={clickedSaved}>
          Save
        </button>
      ) : (
        <button onClick={() => removeHike(hike)}>Remove</button>
      )} */}

      {/* line below is ok, only runs from Saved page, no need to modify */}
      {remove ? <button onClick={() => removeHike(hike)}>Remove</button> : null}
      {clickedModal === true ? (
        <Modal
          className="modal"
          isOpen={modalOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <HikeDetails
            closeModal={closeModal}
            hike={hike}
            parkSource={parkSource}
            onSavedPage={onSavedPage}
            // stateSource={stateSource}
          />
          {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
        </Modal>
      ) : null}
      {/* </Link> */}
      {/* <HikeDetails hikesResult={hikesResult} hike={hike} index={index} /> */}
    </div>
  );
}

export default SingleHike;
