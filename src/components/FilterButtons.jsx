import { useState, useEffect } from "react";

function FilterButtons({
  handleSetFilters,
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

  return (
    <div>
      <button
        onClick={() => {
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
