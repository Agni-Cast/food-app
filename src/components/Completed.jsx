import { useState, useEffect } from "react";
import SingleHike from "./SingleHike.jsx";

function Completed({
  user,
  completedHikes,
  setCompletedHikes,
  // hikesShown,
  // setHikesShown,
  shownHikesComp,
  setShownHikesComp,
}) {
  const [onCompletedPage, setOnCompletedPage] = useState(true);

  /////////
  return (
    <div className="completed">
      <div>Completed</div>
      {shownHikesComp.length > 0
        ? shownHikesComp.map((stateArr, index) => {
            return (
              <div key={index}>
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
                    <div className="hikeParkComp" key={i}>
                      {parkArr.map((hike, hikeIndex) => {
                        let compHikeIndex = completedHikes.indexOf(hike);
                        return (
                          <div className="hikeCardComp" key={hikeIndex}>
                            <SingleHike
                              hike={hike}
                              prevHike={completedHikes[compHikeIndex - 1]}
                              user={user}
                              setCompletedHikes={setCompletedHikes}
                              onCompletedPage={onCompletedPage}
                              shownHikesComp={shownHikesComp}
                            />
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
  /////////
}

export default Completed;
