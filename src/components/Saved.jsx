import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";

function Saved({
  user,
  savedHikes,
  setSavedHikes,
  stateSource,
  stateSourceFull,
  // hikesShown,
  // setHikesShown,
  shownHikesSaved,
  setShownHikesSaved,
  activeComp,
  setActiveComp,
}) {
  const [remove, setRemove] = useState(true);
  const [onSavedPage, setOnSavedPage] = useState(true);
  const [statesArray, setStatesArray] = useState([]);
  // useEffect(() => {
  //   let arr = [];
  //   for (let hike of savedHikes) {
  //     arr.push(hike.state);
  //   }
  //   setStatesArray(arr);
  // }, [savedHikes]);
  // console.log("statesArray: ", statesArray);
  // useEffect(() => {}, [shownHikesSaved]);

  const checkPrevState = () => {};

  ////////////////////////////////////////////////////////////////////////////////////

  // const [shownHikesSaved, setShownHikesSaved] = useState(savedHikes);
  // console.log("SAVED HIKES: ", savedHikes);
  // console.log("ONSAVED: ", onSavedPage);
  // const hikesArraysSaved = () => {
  //   let res = [];
  //   let sameArr = [];
  //   let sameArr2 = [savedHikes[0]];
  //   if (savedHikes.length > 0) {
  //     for (let i = 1; i < savedHikes.length; i++) {
  //       if (savedHikes[i].state === savedHikes[i - 1].state) {
  //         if (savedHikes[i].parkSource === savedHikes[i - 1].parkSource) {
  //           // sameArr.push(savedHikes[i]);
  //           sameArr2.push(savedHikes[i]);
  //         } else {
  //           sameArr.push(sameArr2);
  //           sameArr2 = [];
  //           // sameArr.push(savedHikes[i]);
  //           sameArr2.push(savedHikes[i]);
  //         }
  //       } else {
  //         sameArr.push(sameArr2);
  //         res.push(sameArr);
  //         sameArr = [];
  //         sameArr2 = [];
  //         sameArr2.push(savedHikes[i]);
  //       }
  //     }
  //     sameArr.push(sameArr2);
  //     res.push(sameArr);
  //   }
  //   // setHikesShown(res);
  //   setShownHikesSaved(res);
  //   console.log("RES: ", res);
  // };

  // useEffect(() => {
  // if (page === "Saved") {
  // hikesArraysSaved();
  //   }
  // }, []);

  // console.log("Saved Hikes: ", savedHikes);
  // console.log("SHOWNSaved Hikes: ", shownHikesSaved);

  // console.log("Shown Hikes: ", hikesShown);
  return (
    <div className="saved">
      <div className="headerSaved">Your Saved Hikes</div>
      {shownHikesSaved.length > 0
        ? shownHikesSaved.map((stateArr, index) => {
            return (
              <div className="hikeStateSaved" key={index}>
                <div className="stateSaved">{stateArr[0][0].state}</div>
                {/* <div style={{ fontSize: "35px" }}>
                  {index === 0 ? hike.state : null}
                </div>
                <div style={{ fontSize: "35px" }}>
                  {index > 0 && hike.state !== savedHikes[index - 1].state
                    ? hike.state
                    : null}
                </div> */}
                {/* <div style={{ fontSize: "30px" }}>
                  {index === 0 ? hike.parkSource : null}
                </div>
                <div style={{ fontSize: "30px" }}>
                  {index > 0 &&
                  hike.parkSource !== savedHikes[index - 1].parkSource
                    ? hike.parkSource
                    : null}
                </div> */}
                {stateArr.map((parkArr, i) => {
                  return (
                    <div className="hikeParkSaved" key={i}>
                      {parkArr.map((hike, hikeIndex) => {
                        let savedHikeIndex = savedHikes.indexOf(hike);
                        return (
                          <div>
                            <div className="hikeCardSaved" key={hikeIndex}>
                              <SingleHike
                                hike={hike}
                                prevHike={savedHikes[savedHikeIndex - 1]}
                                remove={remove}
                                user={user}
                                setSavedHikes={setSavedHikes}
                                onSavedPage={onSavedPage}
                                shownHikesSaved={shownHikesSaved}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                {/* <div className="hikeParkSaved">
                 
                </div> */}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Saved;
