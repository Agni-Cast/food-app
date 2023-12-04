import { useEffect, useState } from "react";
import axios from "axios";
import SingleHike from "./SingleHike.jsx";
import HikeDetails from "./HikeDetails.jsx";
import Filter from "./Filter.jsx";
import { GrSearch } from "react-icons/gr";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import image1 from "../../dist/images/image1.png";
import image2 from "../../dist/images/image2.jpg";
import image3 from "../../dist/images/image3.jpg";
import image4 from "../../dist/images/image4.jpg";
import image5 from "../../dist/images/image5.jpg";

function Home({
  user,
  savedHikes,
  setSavedHikes,
  stateSource,
  setStateSource,
  completedHikes,
  setCompletedHikes,
  // hikesShown,
  // setHikesShown,
  // hikesResult,
  // setHikeResult,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [hikesResult, setHikeResult] = useState(
    JSON.parse(localStorage.getItem("hikesResult")) || []
  );
  const [hikesResultObj, setHikesResultObj] = useState(() => {
    let obj = {};
    for (let hike of hikesResult) {
      let park = hike.relatedParks[0].fullName;
      if (obj[park] === undefined) {
        obj[park] = [hike];
      } else {
        obj[park].push(hike);
      }
    }
    return obj;
  });
  //passed to singleHikes to tell the components that the hikes variable was obtained from the home page (from api response)
  const [onHomePage, setOnHomePage] = useState(true);
  // hikes to be shown when filter is applied
  const [hikesShown, setHikesShown] = useState(hikesResult);
  const [hikesShown2, setHikesShown2] = useState(hikesResult);
  const [clickedFilters, setClickedFilters] = useState([false, false]);
  const [filters, setFilters] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [sortBy, setSortBy] = useState("park");

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
      // console.log("Results: ", res.data.data);

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
  const countHikes = () => {
    let count = 0;
    if (hikesShown.length > 0) {
      for (let i = 0; i < hikesShown.length; i++) {
        count += hikesShown[i].length;
      }
    }
    console.log(count);
    return count;
  };

  const hikesArrays = () => {
    let res = [];
    let sameArr = [hikesResult[0]];
    if (hikesResult.length > 0) {
      for (let i = 1; i < hikesResult.length; i++) {
        if (
          hikesResult[i].relatedParks[0].fullName ===
          hikesResult[i - 1].relatedParks[0].fullName
        ) {
          sameArr.push(hikesResult[i]);
          // sameArr.push(hikesResult[i].relatedParks[0].fullName);
        } else {
          res.push(sameArr);
          sameArr = [];
          sameArr.push(hikesResult[i]);
          // sameArr.push(hikesResult[i].relatedParks[0].fullName);
        }
      }
      res.push(sameArr);
    }
    setHikesShown(res);
    // setHikesShown2(hikesResult);
    console.log("RES: ", res);
  };
  useEffect(() => {
    console.log("helooooooooooooooooo");
    setHikesShown(hikesResult);
    setHikesShown2(hikesResult);
    // if (onHomePage && hikesResult.length > 0) {
    hikesArrays();
    // }
  }, [hikesResult]);
  // console.log("HIKES SHOWN: ", hikesShown);
  console.log("Hikes Result: ", hikesResult);

  const imagesArr = [image1, image2, image3, image4, image5];
  const [imageIndex, setImageIndex] = useState(0);
  const changeIndexRight = () => {
    if (imageIndex === 4) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };
  const changeIndexLeft = () => {
    if (imageIndex === 0) {
      setImageIndex(4);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };
  console.log("imageIndex: ", imageIndex);
  // useEffect(() => {}, []);
  useEffect(() => {
    const interval = setInterval(() => {
      {
        changeIndexRight();
      }
    }, 4000);
    return () => clearInterval(interval);
  });

  // console.log("STATE HOME: ", stateSource);
  // console.log("SearchInput: ", searchInput);
  // console.log("StateSource: ", stateSource);
  // console.log("SORT BY: ", sortBy);
  // console.log(JSON.stringify([{id:'123', activities: [{idact: '234'}]}, {id:'1234', activities: [{idact: '2345'}]}]))
  //  '[{"id":"123","activities":[{"idact":"234"}]},{"id":"1234","activities":[{"idact":"2345"}]}]'
  // console.log("HIKES RESULT: ", hikesResult);
  // console.log("HIKES SHOWN: ", hikesShown);
  return (
    <div className="home">
      <div
        className="headerHome"
        // style={{ marginLeft: "5px", marginTop: "15px", marginBottom: "15px" }}
      >
        {/* <div>Home</div> */}
        {/* <img className="imgHome" src={imageIndex} /> */}
        {/* <div className="img&btn"> */}
        <button className="homeImgButtonLeft" onClick={changeIndexLeft}>
          {" "}
          <FaChevronLeft />{" "}
        </button>
        <img className="imgHome" src={imagesArr[imageIndex]} />
        <button className="homeImgButtonRight" onClick={changeIndexRight}>
          <FaChevronRight />
        </button>
        {/* </div> */}
        <div className="searchGo">
          <input
            className="search"
            onChange={handleInputChange}
            placeholder="Search for a trail, National Park, or State ..."
            value={searchInput}
            onKeyDown={handleKeyDown}
          ></input>
          <button className="goBtn" onClick={handleSubmit} action="submit">
            <GrSearch />
          </button>
        </div>
      </div>
      <div className="headerInfo">
        <div style={{ display: "flex" }}>
          {/* only works when a state has already been searched, doesn't work at login */}
          {hikesShown.length > 0 ? (
            <div>
              {/* {hikesShown.length}  */}
              {countHikes()} hikes in
              <span style={{ marginLeft: "5px" }}>
                {stateSource.length > 0
                  ? stateSource
                  : hikesResult[0].relatedParks[0].states}
              </span>
            </div>
          ) : null}
        </div>
        <Filter
          style={{ display: "flex" }}
          hikesResult={hikesResult}
          hikesShown={hikesShown}
          setHikesShown={setHikesShown}
          filterApplied={filterApplied}
          setFilterApplied={setFilterApplied}
          clickedFilters={clickedFilters}
          setClickedFilters={setClickedFilters}
          filters={filters}
          setFilters={setFilters}
          hikesShown2={hikesShown2}
          setHikesShown2={setHikesShown2}
        />
      </div>
      <div className="allHikes">
        {hikesShown.length > 0 && Array.isArray(hikesShown[0])
          ? hikesShown.map(
              (
                // singleHike,
                // index
                parkArr,
                arrIndex
              ) => {
                return (
                  <div className="hikesParkHome" key={arrIndex}>
                    {parkArr.map((singleHike, index) => {
                      // })
                      // console.log(index);
                      // console.log(hikesShown[index - 1]);
                      // console.log(
                      //   "SINGLE HIKE: ",
                      //   singleHike.relatedParks[0].fullName
                      // );

                      return (
                        <div className="hikeCard" key={singleHike.id}>
                          <SingleHike
                            hike={singleHike}
                            index={index}
                            prevHike={parkArr[index - 1]}
                            hikesResult={hikesResult}
                            user={user}
                            searchInput={searchInput}
                            onHomePage={onHomePage}
                            savedHikes={savedHikes}
                            setSavedHikes={setSavedHikes}
                            hikesShown={hikesShown}
                            stateSource={stateSource}
                            completedHikes={completedHikes}
                            setCompletedHikes={setCompletedHikes}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )
          : null}
      </div>
    </div>
  );
}

export default Home;
