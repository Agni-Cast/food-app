import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HikeDetails from "./HikeDetails.jsx";
import Modal from "react-modal";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

function SingleHike({
  /*hikesResult,*/
  hike,
  index,
  user,
  searchInput,
  remove,
  onHomePage,
  savedHikes,
  setSavedHikes,
  onSavedPage,
  prevHike,
  hikesShown,
  stateSource,
  onCompletedPage,
  completedHikes,
  setCompletedHikes,
}) {
  // console.log("PREVIOUS HIKE: ", prevHike);
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saveOrRemove, setSaveOrRemove] = useState(<FaRegHeart />);
  const [emptyHeart, setEmptyHeart] = useState(true);
  const [checkOrUnccheck, setCheckOrUncheck] = useState(<BsCheckCircle />);
  const [emptyCheck, setEmptyCheck] = useState(true);
  const [imageSource, setImageSource] = useState(
    hike.image || `${hike.images[0].url}`
  );
  const [parkSource, setParkSource] = useState(
    hike.parkSource || hike.relatedParks[0].fullName
  );

  const [hikeState, setHikeState] = useState(hike.state || stateSource);
  // console.log("HikeState: ", hikeState);
  // console.log("ParkSource: ", parkSource);
  const [prevPark, setPrevPark] = useState("");
  // console.log("PREV PARK: ", prevPark);
  // console.log("PREV STATE: ", prevState);
  useEffect(() => {
    if (prevHike && prevHike.parkSource) {
      setPrevPark(prevHike.parkSource);
    } else if (prevHike && prevHike.relatedParks[0].fullName) {
      setPrevPark(prevHike.relatedParks[0].fullName);
    }
  }, [hikesShown]);
  // console.log("PARK SOURCE: ", parkSource);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setClickedModal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // console.log("STATE: ", stateSource);
  const saveHike = async (hikeToSave) => {
    const data = {
      user_id: user.id,
      hike_id: hikeToSave.id,
      title: hikeToSave.title,
      parkSource:
        hike.relatedParks[0].fullName /*hikeToSave.relatedParks[0].states*/,
      state: stateSource,
      shortDescription: hikeToSave.shortDescription,
      longDescription: hikeToSave.longDescription,
      duration: hikeToSave.duration,
      arePetsPermitted: hikeToSave.arePetsPermitted,
      petsDescription: hikeToSave.petsDescription,
      isReservationRequired: hikeToSave.isReservationRequired,
      doFeesApply: hikeToSave.doFeesApply,
      feeDescription: hikeToSave.feeDescription,
      age: hikeToSave.age,
      image: hikeToSave.images[0].url,
    };
    try {
      const res = await axios.post("/saved-hikes", data);
      // console.log(res.data);
      if (res.data.length > 0) {
        setSavedHikes(
          [...savedHikes, res.data[0]].sort(
            (a, b) =>
              a.state.localeCompare(b.state) ||
              a.parkSource.localeCompare(b.parkSource) ||
              a.title.localeCompare(b.title)
          )
        );
        setSaveOrRemove(<FaHeart />);
        setEmptyHeart(false);
      }
    } catch (error) {
      console.log("ERROR SAVING HIKE: ", error);
    }
  };

  const removeHike = (hikeToremove) => {
    let idToRemove = hikeToremove.hike_id || hikeToremove.id;
    axios
      .delete(`/saved-hikes?user_id=${user.id}&hike_id=${idToRemove}`)
      .then((res) => {
        console.log("POST RES: ", res.data);
        setSavedHikes(
          res.data.sort(
            (a, b) =>
              a.state.localeCompare(b.state) ||
              a.parkSource.localeCompare(b.parkSource) ||
              a.title.localeCompare(b.title)
          )
        );
        console.log("REMOVED!!!!!!");
        setSaveOrRemove(<FaRegHeart />);
        setEmptyHeart(true);
      })
      .catch((error) => {
        console.log("ERROR REMOVING HIKE: ", error);
      });
  };

  const saveCompleted = async (hikeCommpleted) => {
    const data = {
      user_id: user.id,
      hike_id: hikeCommpleted.id,
      title: hikeCommpleted.title,
      parkSource:
        hike.relatedParks[0].fullName /*hikeCommpleted.relatedParks[0].states*/,
      state: stateSource,
      shortDescription: hikeCommpleted.shortDescription,
      longDescription: hikeCommpleted.longDescription,
      duration: hikeCommpleted.duration,
      arePetsPermitted: hikeCommpleted.arePetsPermitted,
      petsDescription: hikeCommpleted.petsDescription,
      isReservationRequired: hikeCommpleted.isReservationRequired,
      doFeesApply: hikeCommpleted.doFeesApply,
      feeDescription: hikeCommpleted.feeDescription,
      age: hikeCommpleted.age,
      image: hikeCommpleted.images[0].url,
    };
    try {
      const res = await axios.post("/completed-hikes", data);
      if (res.data.length > 0) {
        setCompletedHikes(
          [...completedHikes, res.data[0]].sort(
            (a, b) =>
              a.state.localeCompare(b.state) ||
              a.parkSource.localeCompare(b.parkSource) ||
              a.title.localeCompare(b.title)
          )
        );
        setCheckOrUncheck(<BsCheckCircleFill />);
        setEmptyCheck(false);
      }
    } catch (error) {
      console.log("ERROR SAVING COMPLETED HIKE: ", error);
    }
  };

  const removeCompleted = (hikeNotCompleted) => {
    let idToRemove = hikeNotCompleted.hike_id || hikeNotCompleted.id;
    axios
      .delete(`/completed-hikes?user_id=${user.id}&hike_id=${idToRemove}`)
      .then((res) => {
        setCompletedHikes(
          res.data.sort(
            (a, b) =>
              a.state.localeCompare(b.state) ||
              a.parkSource.localeCompare(b.parkSource) ||
              a.title.localeCompare(b.title)
          )
        );
        console.log("REMOVED!!!!!!");
        setCheckOrUncheck(<BsCheckCircle />);
        setEmptyCheck(true);
      })
      .catch((error) => {
        console.log("ERROR REMOVING COMPLETED HIKE: ", error);
      });
  };
  const handleClickButton = (oneHike) => {
    if (emptyHeart === true) {
      saveHike(oneHike);
    } else if (emptyHeart === false) {
      removeHike(oneHike);
    }
  };
  const handleClickButtonComplete = (oneHike) => {
    if (emptyCheck === true) {
      saveCompleted(oneHike);
    } else if (emptyCheck === false) {
      removeCompleted(oneHike);
    }
  };
  // console.log("clicked save: ", clickedSaved);
  // console.log("HIKE: ", hike);

  useEffect(() => {
    if (onHomePage) {
      for (let obj of savedHikes) {
        if (obj.hike_id === hike.id) {
          setSaveOrRemove(<FaHeart />);
          setEmptyHeart(false);
        }
      }
    }
  }, [savedHikes]);

  useEffect(() => {
    if (onHomePage) {
      for (let obj of completedHikes) {
        if (obj.hike_id === hike.id) {
          setCheckOrUncheck(<BsCheckCircleFill />);
          setEmptyCheck(false);
        }
      }
    }
  }, [completedHikes]);
  useEffect(() => {}, [hikesShown]);
  useEffect(() => {}, [savedHikes]);
  useEffect(() => {}, [completedHikes]);
  // const name = onCompletedPage ? "imgCompleted" : "imgHomeSaved";

  return (
    <div>
      <div style={{ fontSize: "35px" }}>
        {/* {onSavedPage && hikeState !== prevPark ? prevState : null} */}
        {/* {onSavedPage && hikeState !== prevState ? hikeState : null} */}
      </div>
      <div className={name} style={{ fontSize: "30px" }}>
        {onHomePage && parkSource !== prevPark ? parkSource : null}
      </div>
      <div onClick={handleClick} style={{ padding: "10px" }}>
        <img style={{ hight: "300px", width: "300px" }} src={imageSource} />
        <div style={{ fontSize: "20px" }}>{hike.title}</div>
        <div>at</div>
        <div>{parkSource}</div>
        <div>{hike.id}</div>
      </div>
      {onHomePage ? (
        <button
          onClick={() => handleClickButton(hike)} /*disabled={clickedSaved}*/
        >
          {saveOrRemove}
        </button>
      ) : null}
      {onHomePage ? (
        <button onClick={() => handleClickButtonComplete(hike)}>
          {checkOrUnccheck}
        </button>
      ) : null}
      {/* line below is ok, only runs from Saved page, no need to modify */}
      {onCompletedPage ? (
        <button onClick={() => removeCompleted(hike)}>
          <BsCheckCircleFill />
        </button>
      ) : null}
      {remove ? (
        <button onClick={() => removeHike(hike)}>
          <FaHeart />
        </button>
      ) : null}
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
            stateSource={stateSource}
            hikeState={hikeState}
          />
          {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
        </Modal>
      ) : null}
    </div>
  );
}

export default SingleHike;
