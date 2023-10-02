import { useEffect, useState } from "react";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";
import HikeDetails from "./HikeDetails.jsx";
import Filter from "./Filter.jsx";

function Home({
  user,
  savedHikes,
  setSavedHikes,
  stateSource,
  setStateSource,
}) {
  const [searchInput, setSearchInput] = useState("");
  // const [stateSource, setStateSource] = useState(
  //   JSON.parse(localStorage.getItem("stateSource")) || ""
  // );
  const [hikesResult, setHikeResult] = useState(
    JSON.parse(localStorage.getItem("hikesResult")) || []
  );
  //passed to singleHikes to tell the components that the hikes variable was obtained from the home page (from api response)
  const [save, setSave] = useState(true);
  // hikes to be shown when filter is applied
  const [hikesShown, setHikesShown] = useState(
    // JSON.parse(localStorage.getItem("hikesShown")) ||
    hikesResult
  );

  //////////////////////////////////////////////////////////////////////////
  const [clickedFilters, setClickedFilters] = useState([false, false]);
  const [filters, setFilters] = useState(
    // JSON.parse(localStorage.getItem("filters")) ||
    []
  );

  // TEST //

  // useEffect(() => {
  //   localStorage.setItem("hikesShown", JSON.stringify(hikesShown));
  // }, [hikesShown]);

  // gets what is in localStorage
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("hikesShown"));
  //   if (data) {
  //     setHikesShown(data);
  //   }
  // }, []);
  //////////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   // console.log("HELLOOOOOOOOO");
  //   setHikesShown(hikesResult);
  // }, [hikesResult]);

  const [filterApplied, setFilterApplied] = useState(false);
  const [sortBy, setSortBy] = useState("park");

  // const [parkNameCat, setParkNameCat] = useState(
  //   hikesResult[0].relatedParks[0].fullName || ""
  // );

  // const handleFilterBy = (event) => {
  //   if (event.target.value === "park") {
  //     setHikesShown([hikesResult.filter]);
  //   }
  // };

  // console.log("USER HOME: ", user);
  // console.log("HIKES: ", hikesResult);

  // sets the state to search for based on user inout
  const handleInputChange = (event) => {
    setSearchInput(event.target.value.toUpperCase());
  };

  // send get request based on state searched for and sets the hikesResult array to the response data from the api
  const handleSubmit = async () => {
    if (searchInput !== "" && searchInput !== undefined) {
      const res = await axios.get(`/thingstodo?stateCode=${searchInput}`);
      // setHikeResult(res.data.data);
      // res.data.data.sort((a, b) =>
      //   // console.log("PARK: ", b.relatedParks[0].fullName)
      //   a.relatedParks[0].fullName > b.relatedParks[0].fullName ? 1 : -1
      // );
      setHikeResult(
        res.data.data.sort(
          (a, b) =>
            // console.log("PARK: ", b.relatedParks[0].fullName)
            // a.relatedParks[0].fullName > b.relatedParks[0].fullName ? 1 : -1

            a.relatedParks[0].fullName.localeCompare(
              b.relatedParks[0].fullName
            ) || a.title.localeCompare(b.title)
        )
        // .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
      setStateSource(searchInput);

      // setHikesShown(hikesResult);
    }
    setFilters([]);
    setClickedFilters([false, false]);
  };

  // allows to click on 'Enter' key to submit request
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  // saves the hikesResult array to localStorage
  useEffect(() => {
    localStorage.setItem("hikesResult", JSON.stringify(hikesResult));
    localStorage.setItem("stateSource", JSON.stringify(stateSource));
  }, [hikesResult]);

  // gets what is in localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hikesResult"));
    if (data) {
      setHikeResult(data);
    }
    const dataState = JSON.parse(localStorage.getItem("stateSource"));
    if (dataState) {
      setStateSource(dataState);
    }
  }, []);
  // console.log("STATE HOME: ", stateSource);
  useEffect(() => {
    // console.log("HELLOOOOOOOOO");
    setHikesShown(hikesResult);
  }, [hikesResult]);

  // console.log("SearchInput: ", searchInput);
  // console.log("StateSource: ", stateSource);
  // console.log("SORT BY: ", sortBy);
  // console.log(JSON.stringify([{id:'123', activities: [{idact: '234'}]}, {id:'1234', activities: [{idact: '2345'}]}]))
  //  '[{"id":"123","activities":[{"idact":"234"}]},{"id":"1234","activities":[{"idact":"2345"}]}]'
  // console.log("HIKES RESULT: ", hikesResult);
  // console.log("HIKES SHOWN: ", hikesShown);
  return (
    <div>
      <div className="header">
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
          {/* only works when a state has already been searched, doesn't work at login */}
          {hikesShown.length > 0 ? (
            <div>
              {hikesShown.length} hikes in
              {/* {searchInput} */}
              {stateSource.length > 0
                ? stateSource
                : hikesResult[0].relatedParks[0].states}
            </div>
          ) : null}
          {/* {hikesShown.length > 0 ? (
            <div>
              {hikesShown.length} hikes in
              {searchInput.length > 0
                ? searchInput
                : hikesResult[0].relatedParks[0].states}
            </div>
          ) : null} */}
        </div>
        <Filter
          hikesResult={hikesResult}
          hikesShown={hikesShown}
          setHikesShown={setHikesShown}
          filterApplied={filterApplied}
          setFilterApplied={setFilterApplied}
          clickedFilters={clickedFilters}
          setClickedFilters={setClickedFilters}
          filters={filters}
          setFilters={setFilters}
          // stateSource={stateSource}
        />
        {/* Filter by:
        <select>
          <option value="park">Park</option>
          <option value="duration"> Duration</option>
        </select> */}
      </div>
      <div>
        {hikesShown.length > 0
          ? hikesShown.map((singleHike, index) => {
              // console.log(index);
              // console.log(hikesShown[index - 1]);
              // console.log(singleHike);
              return (
                <div key={singleHike.id}>
                  <SingleHike
                    hike={singleHike}
                    index={index}
                    prevHike={hikesShown[index - 1]}
                    hikesResult={hikesResult}
                    user={user}
                    searchInput={searchInput}
                    save={save}
                    savedHikes={savedHikes}
                    setSavedHikes={setSavedHikes}
                    hikesShown={hikesShown}
                    stateSource={stateSource}
                    // setStateSource={setStateSource}
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
