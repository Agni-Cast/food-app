import { useState, useEffect } from "react";
import Modal from "react-modal";
import FilterButtons from "./FilterButtons.jsx";

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
}) {
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allFilters, setAllFilters] = useState(["Pets Allowed", "No Fees"]);
  const [filtersObj, setFiltersObj] = useState({});
  const [filterOn, setFilterOn] = useState(false);

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

  const handleFilterBy = () => {
    for (let filt of filters) {
      if (filt === "Pets Allowed") {
        setHikesShown(
          hikesShown.filter((hike) => {
            return hike["arePetsPermitted"] === "true";
          })
        );
      }
      if (filt === "No Fees") {
        setHikesShown(
          hikesShown.filter((hike) => {
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
    setHikesShown(hikesResult);
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
      setHikesShown(hikesResult);
    }
    if (value === "Pets Allowed") {
      let newHikes = hikesShown.concat(filtersObj.pets);
      setHikesShown(
        newHikes.sort(
          (a, b) =>
            // a.relatedParks[0].fullName > b.relatedParks[0].fullName ? 1 : -1
            a.relatedParks[0].fullName.localeCompare(
              b.relatedParks[0].fullName
            ) || a.title.localeCompare(b.title)
        )
        // .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
    }
    if (value === "No Fees") {
      let newHikes = hikesShown.concat(filtersObj.fees);
      setHikesShown(
        newHikes.sort(
          (a, b) =>
            // a.relatedParks[0].fullName > b.relatedParks[0].fullName ? 1 : -1
            a.relatedParks[0].fullName.localeCompare(
              b.relatedParks[0].fullName
            ) || a.title.localeCompare(b.title)
        )
        // .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
    }
    const ind = allFilters.indexOf(value);
    handleClickeFilter(ind);
  };

  useEffect(() => {}, [hikesShown]);
  useEffect(() => {
    handleFilterBy();
  }, [filters]);
  // useEffect(() => {}, [savedHikes]);
  // console.log("FILTER: ", filters);
  // console.log("HIKES SHOWN: ", hikesShown);

  return (
    <div>
      <button onClick={handleClickModal}>Filter</button>
      {clickedModal === true ? (
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          Filter by:
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
          <button onClick={closeModal}>Show results</button>
        </Modal>
      ) : null}
      <div>
        {filters.length > 0 ? (
          <div>
            <div>
              {filters.map((oneFilter, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => removeFilter(event.target.value)}
                    key={index}
                    value={oneFilter}
                  >
                    x {oneFilter}
                  </button>
                );
              })}
            </div>
            <button onClick={removeAllFilters}>Clear all</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Filter;
