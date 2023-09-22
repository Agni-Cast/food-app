import { useState, useEffect } from "react";

function FilterButtons({ handleFilterBy, filters, filter, removeFilter }) {
  const [buttonColor, setButtonColor] = useState();
  const [buttonClick, setButtonClick] = useState(true);
  //   const handleColor = () => {
  //     if (filters.includes(filter)) {
  //       setButtonColor("red");
  //     } else {
  //       setButtonColor("white");
  //     }
  //   };
  //   useEffect(() => {
  //     handleColor();
  //   }, [filters]);
  return (
    <div>
      <button
        onClick={() => {
          setButtonClick(!buttonClick);
          buttonClick === true ? handleFilterBy(event) : removeFilter(event);
          buttonColor === "white"
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
