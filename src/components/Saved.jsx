import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";

function Saved({ user, savedHikes, setSavedHikes }) {
  const [remove, setRemove] = useState(true);
  // useEffect(() => {}, [savedHikes]);

  // console.log("SAVED HIKES: ", savedHikes);
  return (
    <div>
      <div>Saved</div>
      {savedHikes.length > 0
        ? savedHikes.map((hike) => {
            return (
              <div key={hike.id}>
                <SingleHike
                  hike={hike}
                  remove={remove}
                  setRemove={setRemove}
                  user={user}
                  setSavedHikes={setSavedHikes}
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
