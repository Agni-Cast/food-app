// import { useState, useEffect } from "react";
// import axios from "axios";
// import SingleHike from "./SingleHike.jsx";
// import SearchBar from "./SearchBar.jsx";
// import { useLocation } from "react-router-dom";

// function SearchResult({ user }) {
//   const location = useLocation();
//   //   const hikesResult = location.state;

//   const [hikesResult, setHikeResult] = useState(
//     JSON.parse(localStorage.getItem("hikesResult")) || location.state
//   );

//   console.log("searchInput: ", hikesResult);
//   console.log("USER in SearchResult: ", user);
//   //   const handleSubmit = async () => {
//   //     if (searchInput !== "" && searchInput !== undefined) {
//   //       const res = await axios.get(`/thingstodo?stateCode=${searchInput}`);
//   //       setHikeResult(res.data.data);
//   //     }
//   //   };
//   //   console.log("HIKE RESULTS: ", hikesResult) || {};
//   //   const handleKeyDown = (event) => {
//   //     if (event.keyCode === 13) {
//   //       handleSubmit();
//   //     }
//   //   };
//   useEffect(() => {
//     localStorage.setItem("hikesResult", JSON.stringify(hikesResult));
//   }, [hikesResult]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("hikesResult"));
//     if (data) {
//       setHikeResult(data);
//     }
//   }, []);

//   return (
//     <div>
//       <div>{/* <SearchBar /> */}</div>
//       {/* {" "} */}
//       {hikesResult.length > 0
//         ? hikesResult.map((singleHike, index) => {
//             return (
//               <div key={singleHike.id}>
//                 <SingleHike
//                   hike={singleHike}
//                   index={index}
//                   hikesResult={hikesResult}
//                   user={user}
//                 />
//               </div>
//             );
//           })
//         : null}
//     </div>
//   );
// }
// export default SearchResult;
