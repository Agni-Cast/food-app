import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HikeDetails from "./HikeDetails.jsx";
import Modal from "react-modal";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { FaRegCalendarDays } from "react-icons/fa6";
import Calendar from "./Calendar.jsx";
// import Calendar from "react-calendar";

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
  stateSourceFull,
  onCompletedPage,
  completedHikes,
  setCompletedHikes,
  shownHikesSaved,
  shownHikesComp,
}) {
  // console.log("PREVIOUS HIKE: ", prevHike);
  // console.log("HIKE: ", hike);
  // console.log("searchInput: ", searchInput);
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedModalCal, setClickedModalCal] = useState(false);
  const [modalOpenCal, setModalOpenCal] = useState(false);
  const [value, onChange] = useState(hike.date || [new Date(), new Date()]);
  const locale = "en-US";
  const [saveOrRemove, setSaveOrRemove] = useState(<FaRegHeart />);
  const [emptyHeart, setEmptyHeart] = useState(true);
  const [checkOrUnccheck, setCheckOrUncheck] = useState(<BsCheckCircle />);
  const [emptyCheck, setEmptyCheck] = useState(true);
  const [imageSource, setImageSource] = useState(
    //   () => {
    //   if (onHomePage && hike !== undefined) {
    //     return `${hike.images[0].url}`;
    //   } else if ((onSavedPage || onCompletedPage) && hike !== undefined) {
    //     return hike.image;
    //   }
    // }
    hike.image || `${hike.images[0].url}`
  );
  const [parkSource, setParkSource] = useState(
    hike.parkSource || hike.relatedParks[0].fullName
  );

  const [hikeState, setHikeState] = useState(stateSourceFull || hike.state);
  // console.log("HikeState: ", hikeState);
  // console.log("ParkSource: ", parkSource);
  const [prevPark, setPrevPark] = useState("");
  // console.log("PREV PARK: ", prevPark);
  // console.log("PREV STATE: ", prevState);
  const [prevState, setPrevState] = useState("");
  useEffect(() => {
    if (prevHike && prevHike.parkSource) {
      setPrevPark(prevHike.parkSource);
      setPrevState(prevHike.state);
      setParkSource(hike.parkSource);
      setHikeState(hike.state);
    } else if (prevHike && prevHike.relatedParks[0].fullName) {
      setPrevPark(prevHike.relatedParks[0].fullName);
    }
  }, [hikesShown, shownHikesSaved, shownHikesComp]);
  // console.log("PrevHike: ", prevHike);
  // console.log("HikeState: ", hikeState);
  // console.log("PrevState: ", prevState);
  // console.log("PARK SOURCE: ", parkSource);
  // console.log("Hike: ", hike);
  // console.log("prev hike: ", prevHike);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setClickedModal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickCal = () => {
    if (emptyHeart === false) {
      removeHike(hike);
    } else {
      setClickedModalCal(true);
      setModalOpenCal(true);
    }
  };

  const closeModalCal = () => {
    setModalOpenCal(false);
  };

  // console.log("STATE: ", stateSource);
  const saveHike = async (hikeToSave) => {
    const data = {
      user_id: user.id,
      hike_id: hikeToSave.id,
      title: hikeToSave.title,
      parkSource:
        hike.relatedParks[0].fullName /*hikeToSave.relatedParks[0].states*/,
      state: stateSourceFull,
      // stateFull: stateSourceFull,
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
      startDate: value[0],
      endDate: value[1],
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
      state: stateSourceFull,
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

  const updateDate = async (hike) => {
    let hikeId = hike.hike_id;
    // let newDate = formatDate(value);
    console.log("hikeId: ", hikeId, "user.id: ", user.id, "value: ", value);
    const data = {
      hike_id: hikeId,
      user_id: user.id,
      startDate: value[0],
      endDate: value[1],
    };
    try {
      const res = await axios.put(`/saved-hikes`, data);
      console.log("RETUNG DATA: ", res.data);
      if (res.data.length > 0) {
        setSavedHikes(res.data);
        //   // onChange()
      }
    } catch (error) {
      console.log("ERROR UPDATING DATE: ", error);
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
  // useEffect(() => {}, [savedHikes]);
  useEffect(() => {}, [completedHikes]);
  // const name = onCompletedPage ? "imgCompleted" : "imgHomeSaved";
  // console.log("VALUE: ", value);
  // console.log("HIKE: ", hike);

  // const formatDate2 = (value) => {
  //   if (value.length > 0) {
  //     return [value[0].toDateString(), value[1].toDateString()];
  //   }
  // };
  // console.log("VALUE: ", value, value[0] === value[1]);
  // console.log("DATE FORMAT: ", formatDate2(value));
  return (
    <div className="hikeCardInside">
      <div style={{ fontSize: "25px" }}>
        {/* {onSavedPage && hikeState !== prevPark ? prevState : null} */}
        {/* {onSavedPage && hikeState !== prevState ? hikeState : null} */}
        {/* {onCompletedPage && hikeState !== prevState ? hikeState : null} */}
      </div>
      <div style={{ fontSize: "20px", height: "20px" }}>
        {onHomePage && parkSource !== prevPark ? parkSource : " "}
        {onSavedPage && parkSource !== prevPark ? parkSource : " "}
        {onCompletedPage && parkSource !== prevPark ? parkSource : " "}
      </div>
      <div onClick={handleClick} style={{ padding: "10px" }}>
        <img
          className="image"
          style={{ objectFit: "cover", height: "250px", width: "300px" }}
          src={hike.image || hike.images[0].url}
        />
        <div style={{ fontSize: "20px" }}>{hike.title}</div>
        <div>at</div>
        <div>{parkSource}</div>
        {/* <div>{hike.id}</div> */}
        {onSavedPage ? <div>Scheduled date: {hike.date}</div> : null}
      </div>
      {onHomePage ? (
        <span>
          <button
            className="buttons"
            // onClick={() => handleClickButton(hike)} /*disabled={clickedSaved}*/
            onClick={handleClickCal}
          >
            {saveOrRemove}
          </button>
        </span>
      ) : null}

      {onHomePage && clickedModalCal === true ? (
        <Modal
          className="modalCal"
          isOpen={modalOpenCal}
          ariaHideApp={false}
          onRequestClose={closeModalCal}
          style={{
            content: { width: "300px", inset: "155px" },
          }}
        >
          <Calendar onHomePage={onHomePage} value={value} onChange={onChange} />
          <div className="buttonsCalCont">
            <button
              className="buttonsCal"
              onClick={() => {
                saveHike(hike), closeModalCal();
              }}
            >
              Save Date
            </button>
            <button
              className="buttonsCal"
              onClick={() => {
                saveHike(hike), closeModalCal();
              }}
            >
              Not Sure
            </button>
          </div>
        </Modal>
      ) : null}

      {onHomePage ? (
        <span>
          <button
            className="buttons"
            onClick={() => handleClickButtonComplete(hike)}
          >
            {checkOrUnccheck}
          </button>
        </span>
      ) : null}
      {remove ? (
        <span>
          <button className="buttons" onClick={() => removeHike(hike)}>
            <FaHeart />
          </button>
        </span>
      ) : null}
      {onSavedPage ? (
        <span>
          <button
            className="calIcon"
            onClick={() => {
              setClickedModalCal(true);
              setModalOpenCal(true);
            }}
          >
            <FaRegCalendarDays />
          </button>
        </span>
      ) : null}
      {onSavedPage && clickedModalCal === true ? (
        <Modal
          className="modalCal"
          isOpen={modalOpenCal}
          ariaHideApp={false}
          onRequestClose={closeModalCal}
          style={{
            content: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              width: "300px",
              inset: "155px",
            },
          }}
        >
          <Calendar
            onSavedPage={onSavedPage}
            hike={hike}
            value={value}
            onChange={onChange}
            updateDate={updateDate}
          />
          <div className="buttonsCalCont">
            <button
              className="buttonsCal"
              onClick={() => {
                updateDate(hike);
                closeModalCal();
              }}
            >
              Change Date
            </button>
            <button
              className="buttonsCal"
              onClick={() => {
                closeModalCal();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}
      {/* <FaRegCalendarDays onClick={handleClickCal}></FaRegCalendarDays> */}

      {/* line below is ok, only runs from Saved page, no need to modify */}
      {onCompletedPage ? (
        <span>
          <button className="buttons" onClick={() => removeCompleted(hike)}>
            <BsCheckCircleFill />
          </button>
        </span>
      ) : null}

      {clickedModal === true ? (
        <Modal
          className="modal"
          isOpen={modalOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          // style={{
          //   overlay: {
          //     position: "fixed",
          //     // inset: 55,
          //     // top: 0,
          //     // left: 0,
          //     // right: 0,
          //     // bottom: 0,
          //     backgroundColor: "rgba(255, 255, 255, 0.75)",
          //   },
          //   content: {
          //     position: "absolute",
          //     top: "40px",
          //     left: "40px",
          //     right: "40px",
          //     bottom: "40px",
          //     border: "1px solid #094406",
          //     background: "#fff",
          //     overflow: "auto",
          //     // WebkitOverflowScrolling: "touch",
          //     borderRadius: "20px",
          //     borderWidth: "2px",
          //     outline: "none",
          //     padding: "20px",
          //   },
          //   // overlay: {
          //   //   position: "fixed",
          //   //   inset: "54px",
          //   //   backgroundColor: "rgba(255, 255, 255, 0.85)",
          //   //   width: "700px",
          //   //   height: "600px",
          //   //   overflow: "auto",
          //   // },
          // }}
        >
          <HikeDetails
            className="innerModal"
            closeModal={closeModal}
            hike={hike}
            parkSource={parkSource}
            onSavedPage={onSavedPage}
            stateSource={stateSource}
            stateSourceFull={stateSourceFull}
            hikeState={hikeState}
            // style={{
            //   overlay: {

            //     border: "1px solid black",
            //     padding: "40px",
            //     borderRadius: "20px",
            //   }
            // }}
          />
          {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
        </Modal>
      ) : null}
    </div>
  );
}

export default SingleHike;
