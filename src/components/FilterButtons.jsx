import { useState, useEffect } from "react";

function FilterButtons({
  handleSetFilters,
  // handleFilterBy,
  filter,
  removeFilter,
  clickedFilters,
  setClickedFilters,
  index,
  handleClickeFilter,
}) {
  const [buttonColor, setButtonColor] = useState(() => {
    if (clickedFilters[index] === false) {
      return "white";
    } else {
      return "red";
    }
  });
  // const [buttonClick, setButtonClick] = useState(true);
  //   const handleColor = () => {
  //     if (filters.includes(filter)) {
  //       setButtonColor("red");
  //     } else {
  //       setButtonColor("white");
  //     }
  //   };
  // const handleClickeFilter = (index) => {
  //   const newArr = clickedFilters.map((bool, i) => {
  //     console.log("BOOL: ", bool);
  //     console.log("INDEX: ", index);
  //     console.log("I : ", i);

  //     if (i === index) {
  //       console.log("inverse BOOL: ", !bool);
  //       return !bool;
  //     } else {
  //       return bool;
  //     }
  //   });
  //   console.log("newArr: ", newArr);
  //   setClickedFilters(newArr);
  // };

  return (
    <div>
      <button
        onClick={() => {
          // setButtonClick(!buttonClick);
          handleClickeFilter(index);
          clickedFilters[index] === false
            ? handleSetFilters(event.target.value)
            : removeFilter(event.target.value);
          clickedFilters[index] === false
            ? setButtonColor("red")
            : setButtonColor("white");
        }}
        value={filter}
        style={{ backgroundColor: buttonColor }}
      >
        {filter}
      </button>
    </div>
  );
}

export default FilterButtons;
