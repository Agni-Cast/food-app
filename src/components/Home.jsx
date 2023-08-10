import { useEffect, useState } from "react";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";
import HikeDetails from "./HikeDetails.jsx";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [hikesResult, setHikeResult] = useState(
    JSON.parse(localStorage.getItem("hikesResult")) || []
  );
  // const [a, setA] = useState("BBBB");

  const handleInputChange = (event) => {
    // event.preventDefault();
    setSearchInput(event.target.value.toUpperCase());
  };
  // console.log("input: ", searchInput);

  const handleSubmit = async () => {
    if (searchInput !== "" && searchInput !== undefined) {
      const res = await axios.get(`/thingstodo?stateCode=${searchInput}`);
      setHikeResult(res.data.data);
    }
  };
  console.log("HIKE RESULTS: ", hikesResult) || {};
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
