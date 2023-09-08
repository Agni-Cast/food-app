import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Saved from "./Saved.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import HikeDetails from "./HikeDetails.jsx";
import axios from "axios";
import SearchResult from "./SearchResult.jsx";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [savedHikes, setSavedHikes] = useState([]);

  const handleLogOut = () => {
    axios.get("/logout").then((res) => {
      setUser({});
      navigate("/login");
      localStorage.clear();
    });
  };

  useEffect(() => {
    axios.get("/session").then((res) => {
      // console.log("SESSION res: ", res);
      if (res.data.user_id) {
        // console.log("SESSION -client res.data.user_id: ", res.data.user_id);
        setUser({ username: res.data.username, id: res.data.user_id });
      } else {
        localStorage.clear();
      }
    });
  }, [user.id]);
  // console.log("USER; ", user);

  ///////////////////////////////////////////////////
  // console.log("SAVED Hikes: ", savedHikes);
  useEffect(() => {
    if (user.id) {
      axios.get(`/saved-hikes?user_id=${user.id}`).then((res) => {
        // console.log(res.data);
        setSavedHikes(res.data);
      });
    }
  }, [user.id]);
  console.log("SAVED HIKES: ", savedHikes);
  ////////////////////////////////////////////////////
  return (
    // <BrowserRouter>
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          NPTrails
        </Link>
        <span> | </span>
        {user.id && (
          <Link to="/saved" style={{ padding: 5 }}>
            Saved
          </Link>
        )}
        {!user.id && (
          <Link to="/signup" style={{ padding: 5 }}>
            Sign up
          </Link>
        )}
        {!user.id && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {user.id && (
          <span
            onClick={handleLogOut}
            style={{ padding: 5, cursor: "pointer" }}
          >
            Logout
          </span>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              savedHikes={savedHikes}
              setSavedHikes={setSavedHikes}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <Saved
              user={user}
              savedHikes={savedHikes}
              setSavedHikes={setSavedHikes}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/details" element={<HikeDetails />}></Route>
        {/* <Route
          path="/searchResult"
          element={<SearchResult user={user} />}
        ></Route> */}
      </Routes>
    </>
    // </BrowserRouter>
  );
};

export default App;
