import { useEffect, useState } from "react";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";
import HikeDetails from "./HikeDetails.jsx";

function Home({ user, savedHikes, setSavedHikes }) {
  const [searchInput, setSearchInput] = useState("");
  const [hikesResult, setHikeResult] = useState(
    JSON.parse(localStorage.getItem("hikesResult")) || []
  );
  const [save, setSave] = useState(true);
  // console.log("1 HIKES SAVED HOME: ", hikesSaved);
  ///// added from singleHike, was cheking if each hike from resultHikes was in the database
  ///// trying to get the saved hikes id's from the Home, store them in hikesSaved and check if any hike is present in both arrays
  ///// if it is, show 'Remove' instead of 'Save'
  // const [isSaved, setIsSaved] = useState(false);
  // const [hikesSaved, setHikesSaved] = useState([]);
  // const isUser = !user.id ? false : true;
  // useEffect(() => {
  //   if (isUser) {
  //     axios.get(`/saved-hikes?user_id=${user.id}`).then((res) => {
  //       let arr = res.data;

  //       arr.map((one) => {
  //         // console.log(">>>>>>>>>>>>>>", one.hike_id);
  //         // console.log(hikesSaved);
  //         setHikesSaved([...hikesSaved, one.hike_id]);
  //         // setHikesSaved
  //       });
  //       setIsSaved(true);
  //     });
  //   }
  // }, [isUser, hikesSaved]);
  // console.log("2 HIKES SAVED HOME: ", hikesSaved);

  // console.log("HIKES SAVED HOME: ", hikesSaved);
  /////

  // console.log("USER HOME: ", user);
  const handleInputChange = (event) => {
    // event.preventDefault();
    setSearchInput(event.target.value.toUpperCase());
  };

  const handleSubmit = async () => {
    if (searchInput !== "" && searchInput !== undefined) {
      const res = await axios.get(`/thingstodo?stateCode=${searchInput}`);
      setHikeResult(res.data.data);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };
  useEffect(() => {
    localStorage.setItem("hikesResult", JSON.stringify(hikesResult));
  }, [hikesResult]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hikesResult"));
    if (data) {
      setHikeResult(data);
    }
  }, []);

  // console.log(JSON.stringify([{id:'123', activities: [{idact: '234'}]}, {id:'1234', activities: [{idact: '2345'}]}]))
  //  '[{"id":"123","activities":[{"idact":"234"}]},{"id":"1234","activities":[{"idact":"2345"}]}]'

  return (
    <div>
      <div>Home</div>
      <input
        onChange={handleInputChange}
        placeholder="Search for a trail, National Park, or State ..."
        value={searchInput}
        onKeyDown={handleKeyDown}
      ></input>
      <button onClick={handleSubmit} action="submit">
        Go!
      </button>
      <div>
        {hikesResult.length > 0
          ? hikesResult.map((singleHike, index) => {
              return (
                <div key={singleHike.id}>
                  <SingleHike
                    hike={singleHike}
                    index={index}
                    hikesResult={hikesResult}
                    user={user}
                    searchInput={searchInput}
                    save={save}
                    savedHikes={savedHikes}
                    setSavedHikes={setSavedHikes}
                    // hikesSaved={hikesSaved}
                    // setHikesSaved={setHikesSaved}
                    // isSaved={isSaved}
                    // setIsSaved={setIsSaved}
                    // isUser={isUser}
                  />
                </div>
              );
            })
          : null}
      </div>

      {/* <HikeDetails hikesResult={hikesResult} /> */}
    </div>
  );
}

export default Home;
