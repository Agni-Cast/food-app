import { useEffect, useState } from "react";
import axios from "axios";
import AllHikes from "./AllHikes.jsx";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [hikesResult, setHikeResult] = useState([]);
  // const [a, setA] = useState("BBBB");

  const handleInputChange = (event) => {
    // event.preventDefault();
    setSearchInput(event.target.value);
  };
  // console.log("input: ", searchInput);

  const handleSubmit = async () => {
    if (searchInput !== "" && searchInput !== undefined) {
      const res = await axios.get(`/thingstodo?stateCode=${searchInput}`);
      setHikeResult(res.data.data);
    }
  };
  console.log("HIKE RESULTS: ", hikesResult);

  useEffect(() => {}, [hikesResult]);

  return (
    <div>
      <div>Home</div>
      <input
        onChange={handleInputChange}
        placeholder="Search for a trail, National Park, or State ..."
        value={searchInput}
      ></input>
      <button onClick={handleSubmit} action="submit">
        Go!
      </button>
      <div>
        {hikesResult.length > 0
          ? hikesResult.map((hike) => {
              return (
                <div key={hike.id}>
                  <AllHikes hike={hike} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Home;
