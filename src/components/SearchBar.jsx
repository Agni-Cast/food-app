// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function SearchBar() {
//   const [searchInput, setSearchInput] = useState("");

//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     // event.preventDefault();
//     setSearchInput(event.target.value.toUpperCase());
//   };

//   const handleKeyDown = (event) => {
//     if (event.keyCode === 13) {
//       // handleSubmit();
//       navigate("/searchResult");
//     }
//   };
//   //   useEffect(() => {}, [searchInput]);
//   return (
//     <div>
//       <input
//         onChange={handleInputChange}
//         placeholder="Search for a trail, National Park, or State ..."
//         value={searchInput}
//         onKeyDown={handleKeyDown}
//       ></input>
//       {/* <Link to="/searchResult">Go!</Link> */}
//       <button
//         // onClick={navigate('/searchResult')}
//         action="submit"
//       >
//         Go!
//       </button>
//     </div>
//   );
// }

// export default SearchBar;
