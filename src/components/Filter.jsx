import { useState, useEffect } from "react";
import Modal from "react-modal";
import FilterButtons from "./FilterButtons.jsx";
import { IoFilter } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

function Filter({
  clickedFilters,
  hikesResult,
  hikesShown,
  setHikesShown,
  filterApplied,
  setFilterApplied,
  setClickedFilters,
  filters,
  setFilters,
  hikesShown2,
  setHikesShown2,
}) {
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allFilters, setAllFilters] = useState(["Pets Allowed", "No Fees"]);
  const [filtersObj, setFiltersObj] = useState({});
  const [filterOn, setFilterOn] = useState(false);
  // const [hikesShown2, setHikesShown2] = useState(() => {
  //   return hikesShown.flat();
  // });
  // console.log("HIKES SHOWN 2: ", hikesShown2);

  const createFiltersObj = () => {
    setFiltersObj(
      Object.assign(filtersObj, {
        pets: hikesResult.filter((hike) => {
          return hike.arePetsPermitted === "false";
        }),
      })
    );
    setFiltersObj(
      Object.assign(filtersObj, {
        fees: hikesResult.filter((hike) => {
          return hike.doFeesApply === "true";
        }),
      })
    );
  };

  useEffect(() => {
    createFiltersObj();
  }, [hikesResult]);
  // console.log("FILTERS OBJ: ", filtersObj);

  const handleClickeFilter = (index) => {
    const newArr = clickedFilters.map((bool, i) => {
      if (i === index) {
        return !bool;
      } else {
        return bool;
      }
    });
    setClickedFilters(newArr);
  };

  const handleClickModal = () => {
    setClickedModal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const hikesArray2 = () => {
    let res = [];
    let sameArr = [hikesShown2[0]];
    if (hikesShown2.length > 0) {
      for (let i = 1; i < hikesShown2.length; i++) {
        if (
          hikesShown2[i].relatedParks[0].fullName ===
          hikesShown2[i - 1].relatedParks[0].fullName
        ) {
          sameArr.push(hikesShown2[i]);
          // sameArr.push(hikesShown2[i].relatedParks[0].fullName);
        } else {
          res.push(sameArr);
          sameArr = [];
          sameArr.push(hikesShown2[i]);
          // sameArr.push(hikesShown2[i].relatedParks[0].fullName);
        }
      }
      res.push(sameArr);
    }
    setHikesShown(res);
  };

  const handleFilterBy = () => {
    for (let filt of filters) {
      if (filt === "Pets Allowed") {
        setHikesShown2(
          hikesShown2.filter((hike) => {
            return hike["arePetsPermitted"] === "true";
          })
        );
      }
      if (filt === "No Fees") {
        setHikesShown2(
          hikesShown2.filter((hike) => {
            return hike.doFeesApply === "false";
          })
        );
      }
    }
  };
  const handleSetFilters = (value) => {
    if (value === "Pets Allowed") {
      setFilterApplied(true);
      setFilters([...filters, "Pets Allowed"]);
    }
    if (value === "No Fees") {
      setFilterApplied(true);
      setFilters([...filters, "No Fees"]);
    }
  };

  const removeAllFilters = () => {
    setHikesShown2(hikesResult);
    hikesArray2();
    setFilterApplied(false);
    setFilters([]);
    setClickedFilters([false, false]);
  };

  const removeFilter = (value) => {
    let index = filters.indexOf(value);
    let newFilters = filters
      .slice(0, index)
      .concat(filters.slice(index + 1, filters.length));
    setFilters(newFilters);
    if (filters.length < 1) {
      setFilterApplied(false);
      setHikesShown2(hikesResult);
      hikesArray2();
    }
    if (value === "Pets Allowed") {
      let newHikes = hikesShown2.concat(filtersObj.pets);
      setHikesShown2(
        newHikes.sort(
          (a, b) =>
            // a.relatedParks[0].fullName > b.relatedParks[0].fullName ? 1 : -1
            a.relatedParks[0].fullName.localeCompare(
              b.relatedParks[0].fullName
            ) || a.title.localeCompare(b.title)
        )
        // .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
      hikesArray2();
    }
    if (value === "No Fees") {
      let newHikes = hikesShown2.concat(filtersObj.fees);
      setHikesShown2(
        newHikes.sort(
          (a, b) =>
            // a.relatedParks[0].fullName > b.relatedParks[0].fullName ? 1 : -1
            a.relatedParks[0].fullName.localeCompare(
              b.relatedParks[0].fullName
            ) || a.title.localeCompare(b.title)
        )
        // .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
      hikesArray2();
    }
    const ind = allFilters.indexOf(value);
    handleClickeFilter(ind);
  };

  // useEffect(() => {
  //   // if (Array.isArray(hikesShown[0])) {
  //   // setHikesShown2(hikesShown);
  //   // }
  // }, [hikesShown]);
  useEffect(() => {
    handleFilterBy();
  }, [filters]);

  useEffect(() => {
    // setHikesShown(hikesShown2);
    hikesArray2();
  }, [hikesShown2]);

  // useEffect(() => {}, [savedHikes]);
  // console.log("FILTER: ", filters);
  // console.log("HIKES SHOWN: ", hikesShown);
  // console.log("----> HIKES SHOWN 2: ", hikesShown2);

  /////////// IMPORTANT //////////
  //!!!!!!!!!!!!!!!!!!!
  // When searching for a ne state, HikesShown2 doesn not get updated, it remains the previous state's array
  // Filters seem to be working fine
  ///////////
  //!!!!!!!!!!!!!!!!!!!
  return (
    <div>
      <button
        className="filterBtnHome"
        onClick={handleClickModal}
        style={{ display: "flex" }}
      >
        {" "}
        <IoFilter style={{ marginRight: "5px" }} /> Filter
      </button>
      {clickedModal === true ? (
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",

              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              fontFamily: "helvetica",
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: "1px solid #094406",
              background: "#fff",
              overflow: "auto",
              borderRadius: "20px",
              borderWidth: "2px",
              outline: "none",
              padding: "20px",
              height: "100px",
            },
          }}
        >
          <div className="filterBy">
            Filter by:
            <div className="filterBtns">
              {allFilters.map((filter, index) => {
                return (
                  <div>
                    <FilterButtons
                      key={index}
                      filter={filter}
                      removeFilter={removeFilter}
                      handleSetFilters={handleSetFilters}
                      clickedFilters={clickedFilters}
                      setClickedFilters={setClickedFilters}
                      index={index}
                      handleClickeFilter={handleClickeFilter}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="showFilterBtn" onClick={closeModal}>
            Show results
          </button>
        </Modal>
      ) : null}
      {/* <div > */}
      {filters.length > 0 ? (
        <div className="filtersInfo">
          <div className="filtersApplied">
            {filters.map((oneFilter, index) => {
              return (
                <button
                  className="filterValue"
                  key={index}
                  onClick={() => removeFilter(event.target.value)}
                  key={index}
                  value={oneFilter}
                >
                  <TiDelete style={{ marginRight: "2px" }} />
                  {oneFilter}
                </button>
              );
            })}
          </div>
          <button className="clearAll" onClick={removeAllFilters}>
            Clear all
          </button>
        </div>
      ) : null}
      {/* </div> */}
    </div>
  );
}

export default Filter;
