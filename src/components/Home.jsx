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

  console.log("USER HOME: ", user);
  console.log("HIKES: ", hikesResult);
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

  console.log("STATE: ", searchInput);
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
