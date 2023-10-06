import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";

function Saved({ user, savedHikes, setSavedHikes, stateSource }) {
  const [remove, setRemove] = useState(true);
  const [onSavedPage, setOnSavedPage] = useState(true);

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
                  user={user}
                  setSavedHikes={setSavedHikes}
                  onSavedPage={onSavedPage}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Saved;
