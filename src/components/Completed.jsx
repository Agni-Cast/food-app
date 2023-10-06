import { useState, useEffect } from "react";
import SingleHike from "./SingleHike.jsx";

function Completed({ user, completedHikes, setCompletedHikes }) {
  const [onCompletedPage, setOnCompletedPage] = useState(true);
  return (
    <div>
      <div>Completed</div>
      {completedHikes.length > 0
        ? completedHikes.map((hike, index) => {
            return (
              <div key={hike.id}>
                <div style={{ fontSize: "35px" }}>
                  {index === 0 ? hike.state : null}
                </div>
                <div style={{ fontSize: "35px" }}>
                  {index > 0 && hike.state !== completedHikes[index - 1].state
                    ? hike.state
                    : null}
                </div>
                <div style={{ fontSize: "30px" }}>
                  {index === 0 ? hike.parkSource : null}
                </div>
                <div style={{ fontSize: "30px" }}>
                  {index > 0 &&
                  hike.parkSource !== completedHikes[index - 1].parkSource
                    ? hike.parkSource
                    : null}
                </div>

                <SingleHike
                  hike={hike}
                  prevHike={completedHikes[index - 1]}
                  onCompletedPage={onCompletedPage}
                  completedHikes={completedHikes}
                  setCompletedHikes={setCompletedHikes}
                  user={user}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Completed;
