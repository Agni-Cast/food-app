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
  const countParks = () => {
    let count = 0;
    for (let state of shownHikesComp) {
      for (let park of state) {
        count += 1;
      }
    }
    return count;
  };
  /////////
  return (
    <div className="completed">
      <div className="headerCompleted">Your Completed Hikes</div>
      <div className="statsCont">
        <div className="statsHeader">Your Stats</div>
        <div className="statsRes">
          <div className="stat">
            Total Hikes: <span className="num"> {completedHikes.length}</span>
          </div>
          <div className="stat">
            States Visited: <span className="num">{shownHikesComp.length}</span>
          </div>
          <div className="stat">
            Parks Visited: <span className="num">{countParks()}</span>
          </div>
        </div>
      </div>
      {shownHikesComp.length > 0
        ? shownHikesComp.map((stateArr, index) => {
            return (
              <div className="hikeStateComp" key={index}>
                <div className="stateComp">{stateArr[0][0].state}</div>
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
