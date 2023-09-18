import { useState, useEffect } from "react";
import Modal from "react-modal";

function Filter({
  hikesResult,
  hikesShown,
  setHikesShown,
  filterApplied,
  setFilterApplied,
}) {
  //   console.log("HIKES RESULT FILTER: ", hikesResult);
  const [clickedModal, setClickedModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState(
    // JSON.parse(localStorage.getItem("filters")) ||
    []
    // {}
  );
  // const [filtersKeys, setFiltersKeys] = useState([]);
  //   const [clickedFilter, setClickedFilter] = useState(false);

  const handleClickModal = () => {
    setClickedModal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFilterBy = (event) => {
    if (event.target.value === "Pets") {
      setHikesShown(
        hikesShown.filter((hike) => {
          return hike["arePetsPermitted"] === "true";
        })
      );
      setFilterApplied(true);
      setFilters([...filters, "Pets Allowed"]);
      // setFilters(Object.assign(filters, { Pets: "arePetsPermitted" }));
      // setFiltersKeys(Object.keys(filters));
    }
    if (event.target.value === "No Fees") {
      setHikesShown(
        hikesShown.filter((hike) => {
          return hike.doFeesApply === "false";
        })
      );
      setFilterApplied(true);
      setFilters([...filters, "No Fees"]);
      // setFilters(Object.assign(filters, { "No Fees": "doFeesApply" }));
      // setFiltersKeys(Object.keys(filters));
    }

    // setFilters([...filters, event.target.value]);
    return;
  };

  const removeAllFilters = () => {
    setHikesShown(hikesResult);
    setFilterApplied(false);
    // localStorage.removeItem("filters");
    setFilters([]);
    // setFilters({});
    // setFiltersKeys([]);
  };
  const removeFilter = (event) => {
    let index = filters.indexOf(event.target.value);
    // console.log("INDEX: ", index);
    // console.log("FILTER BEFORE: ", filters);
    // filters.splice(index, 1);
    // setFilters(filters.splice(index, 1));
    let newFilters = filters
      .slice(0, index)
      .concat(filters.slice(index + 1, filters.length));
    setFilters(newFilters);

    // delete filters.oneFilter;
    // setFilters(filters);
    // setHikesShown(hikesResult.filter((hike) => {

    // }))
    if (filters.length < 1) {
      setFilterApplied(false);
      setHikesShown(hikesResult);
    }
    // setHikesShown();
    // return;
    // console.log("FILTER AFTER: ", filters);
  };
  useEffect(() => {
    // console.log("-------->", Object.keys(filters));
    // setFiltersKeys(Object.keys(filters));
    // let keys = [];
    // console.log("FFFFFFFFFFF: ", filters);
    // for (let key in filters) {
    //   console.log("KEY: ", key);
    //   keys.push(key);
    // }
    // setFiltersKeys(["Pets"]);
  }, [filters]);

  //////////////////////////////////////////////////////////////////////////
  // TEST //
  //   useEffect(() => {
  //     localStorage.setItem("filters", JSON.stringify(filters));
  //   }, [filters]);

  //   // gets what is in localStorage
  //   useEffect(() => {
  //     const data = JSON.parse(localStorage.getItem("filters"));
  //     if (data) {
  //       setFilters(data);
  //     }
  //   }, []);
  //////////////////////////////////////////////////////////////////////////
  // const showFilters = (filters) => {
  //   for (let oneFilter in filters) {
  //     return (
  //       <button onClick={removeFilter(oneFilter)} value={oneFilter}>
  //         x {oneFilter}
  //       </button>
  //     );
  //   }
  // };
  console.log("FILTER: ", filters);
  // console.log("FILTER KEYS: ", filtersKeys);

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
          <button onClick={handleFilterBy} value="No Fees">
            No Fees
          </button>
          <button onClick={handleFilterBy} value="Pets">
            Pets
          </button>
          <button onClick={closeModal}>Apply</button>
        </Modal>
      ) : null}
      <div>
        {filters.length > 0 ? (
          // Object.keys(filters).length > 0 ?
          <div>
            <div>
              {/* Filetrs applied: {showFilters(filters)} */}
              {filters.map((oneFilter, index) => {
                return (
                  <button onClick={removeFilter} key={index} value={oneFilter}>
                    x {oneFilter}
                  </button>
                );
              })}
            </div>
            <button onClick={removeAllFilters}>Clear all</button>
          </div>
        ) : null}
      </div>
      {/* <select onChange={handleFilterBy} multiple={true}>
        <option value="noFees">No Fees</option>
        <option value="pets"> Pets</option>
      </select> */}
    </div>
  );
}

export default Filter;
