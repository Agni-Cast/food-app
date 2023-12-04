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
      return {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "30px",
        fontSize: "14px",
        borderWidth: "2px",
        borderColor: "rgb(9, 68, 6)",
        height: "25px",
        marginRight: "10px",
      };
    } else {
      return {
        backgroundColor: "rgba(212, 229, 202, 0.5)",
        borderRadius: "20px",
        height: "30px",
        fontSize: "14px",
        borderWidth: "2px",
        borderColor: "rgb(9, 68, 6)",
        height: "25px",
        marginRight: "10px",
      };
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
            ? setButtonColor({
                backgroundColor: "rgba(212, 229, 202, 0.5)",
                borderRadius: "20px",
                height: "30px",
                fontSize: "14px",
                borderWidth: "2px",
                borderColor: "rgb(9, 68, 6)",
                height: "25px",
                marginRight: "10px",
              })
            : setButtonColor({
                backgroundColor: "white",
                borderRadius: "20px",
                height: "30px",
                fontSize: "14px",
                borderWidth: "2px",
                borderColor: "rgb(9, 68, 6)",
                height: "25px",
                marginRight: "10px",
              });
        }}
        value={filter}
        style={buttonColor}
      >
        {filter}
      </button>
    </div>
  );
}

export default FilterButtons;
