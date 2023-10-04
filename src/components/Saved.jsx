import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";
// import { FaHeart } from "react-icons/fa6";

function Saved({
  user,
  savedHikes,
  setSavedHikes,
  stateSource,
  // setStateSource,
}) {
  const [remove, setRemove] = useState(true);
  const [onSavedPage, setOnSavedPage] = useState(true);
  // const [hikeState, setHikeState] = useState("");
  // useEffect(() => {
  //   setSavedHikes(
  //     savedHikes.sort(
  //       (a, b) =>
  //         a.state.localeCompare(b.state) ||
  //         a.parkSource.localeCompare(b.parkSource) ||
  //         a.title.localeCompare(b.title)
  //     )
  //   );
  // }, [savedHikes]);

  // console.log("SAVED HIKES: ", savedHikes);
  // console.log("ONSAVED: ", onSavedPage);
  return (
    <div>
      <div>Saved</div>
      {savedHikes.length > 0
        ? savedHikes.map((hike, index) => {
            return (
              <div key={hike.id}>
                <div style={{ fontSize: "35px" }}>
                  {index === 0 ? hike.state : null}
                </div>
                <div style={{ fontSize: "35px" }}>
                  {index > 0 && hike.state !== savedHikes[index - 1].state
                    ? hike.state
                    : null}
                </div>
                <div style={{ fontSize: "30px" }}>
                  {index === 0 ? hike.parkSource : null}
                </div>
                <div style={{ fontSize: "30px" }}>
                  {index > 0 &&
                  hike.parkSource !== savedHikes[index - 1].parkSource
                    ? hike.parkSource
                    : null}
                </div>
                <SingleHike
                  hike={hike}
                  prevHike={savedHikes[index - 1]}
                  remove={remove}
                  setRemove={setRemove}
                  user={user}
                  setSavedHikes={setSavedHikes}
                  onSavedPage={onSavedPage}
                  // stateSource={stateSource}
                  // setStateSource={setStateSource}
                  // hikeState={hikeState}
                  // setHikeState={setHikeState}
                />
              </div>
              // <div>{hike.id}</div>;
            );
          })
        : null}
      {/* <SingleHike hike={hike} /> */}
    </div>
  );
}

export default Saved;
