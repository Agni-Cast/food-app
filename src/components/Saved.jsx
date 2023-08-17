import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";

function Saved({ user, savedHikes }) {
  const [remove, setRemove] = useState(true);
  // console.log("USER Saved: ", user);
  // if (!user.id) {
  //   return <Navigate to="/login" replace />;
  // }
  // const [savedHikes, setSavedHikes] = useState([]);
  // useEffect(() => {}, [savedHikes]);

  // useEffect(() => {
  //   axios.get("/saved-hikes").then((res) => setSavedHikes(res.data));
  // }, []);

  console.log("SAVED HIKES: ", savedHikes);
  return (
    <div>
      <div>Saved</div>
      {savedHikes.length > 0
        ? savedHikes.map((hike) => {
            return (
              <div key={hike.id}>
                <SingleHike hike={hike} remove={remove} setRemove={setRemove} />
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
