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
import Completed from "./Completed.jsx";

const App = () => {
  const navigate = useNavigate();
  const [activeComp, setActiveComp] = useState();
  const [user, setUser] = useState({});
  const [savedHikes, setSavedHikes] = useState([]);
  const [stateSource, setStateSource] = useState(
    JSON.parse(localStorage.getItem("stateSource")) || ""
  );
  const [stateSourceFull, setStateSourceFull] = useState(
    JSON.parse(localStorage.getItem("stateSourceFull")) || ""
  );
  const [completedHikes, setCompletedHikes] = useState([]);
  // const [hikesResult, setHikeResult] = useState(
  //   // JSON.parse(localStorage.getItem("hikesResult")) ||
  //   []
  // );
  // const [hikesShown, setHikesShown] = useState(hikesResult);
  const [shownHikesSaved, setShownHikesSaved] = useState(savedHikes);
  const [shownHikesComp, setShownHikesComp] = useState(completedHikes);

  const hikesArraysSaved = () => {
    if (savedHikes.length > 0) {
      let res = [];
      let sameArr = [];
      let sameArr2 = [savedHikes[0]];
      if (savedHikes.length > 0) {
        for (let i = 1; i < savedHikes.length; i++) {
          if (savedHikes[i].state === savedHikes[i - 1].state) {
            if (savedHikes[i].parkSource === savedHikes[i - 1].parkSource) {
              // sameArr.push(savedHikes[i]);
              sameArr2.push(savedHikes[i]);
            } else {
              sameArr.push(sameArr2);
              sameArr2 = [];
              // sameArr.push(savedHikes[i]);
              sameArr2.push(savedHikes[i]);
            }
          } else {
            sameArr.push(sameArr2);
            res.push(sameArr);
            sameArr = [];
            sameArr2 = [];
            sameArr2.push(savedHikes[i]);
          }
        }
        sameArr.push(sameArr2);
        res.push(sameArr);
      }
      // setHikesShown(res);
      setShownHikesSaved(res);
      // console.log("SAVED RES: ", res);
    } else {
      setShownHikesSaved([]);
    }
  };

  const hikesArraysComp = () => {
    if (completedHikes.length > 0) {
      let res = [];
      let sameArr = [];
      let sameArr2 = [completedHikes[0]];
      if (completedHikes.length > 0) {
        for (let i = 1; i < completedHikes.length; i++) {
          if (completedHikes[i].state === completedHikes[i - 1].state) {
            if (
              completedHikes[i].parkSource === completedHikes[i - 1].parkSource
            ) {
              // sameArr.push(completedHikes[i]);
              sameArr2.push(completedHikes[i]);
            } else {
              sameArr.push(sameArr2);
              sameArr2 = [];
              // sameArr.push(completedHikes[i]);
              sameArr2.push(completedHikes[i]);
            }
          } else {
            sameArr.push(sameArr2);
            res.push(sameArr);
            sameArr = [];
            sameArr2 = [];
            sameArr2.push(completedHikes[i]);
          }
        }
        sameArr.push(sameArr2);
        res.push(sameArr);
      }
      // setHikesShown(res);
      setShownHikesComp(res);
      // console.log("COMP RES: ", res);
    } else {
      setShownHikesComp([]);
    }
  };

  useEffect(() => {
    hikesArraysComp();
  }, [completedHikes]);

  const handleLogOut = () => {
    axios.get("/logout").then((res) => {
      setUser({});
      navigate("/login");
      localStorage.clear();
    });
  };

  useEffect(() => {
    axios.get("/session").then((res) => {
      if (res.data.user_id) {
        setUser({ username: res.data.username, id: res.data.user_id });
      } else {
        localStorage.clear();
      }
    });
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      axios.get(`/saved-hikes?user_id=${user.id}`).then((res) => {
        setSavedHikes(res.data);
      });
      axios.get(`/completed-hikes?user_id=${user.id}`).then((res) => {
        setCompletedHikes(res.data);
      });
    }
  }, [user.id]);

  // console.log("USER; ", user);
  // console.log("COMPLETED HIKES: ", completedHikes);
  // console.log("SHOWN completed: ", shownHikesComp);
  // useEffect(() => {}, [savedHikes]);
  // console.log("Saved Hikes 1: ", savedHikes);

  useEffect(() => {
    // shownHikesSaved(savedHikes);
    hikesArraysSaved();
  }, [savedHikes]);

  // console.log("Saved Hikes 2: ", savedHikes);
  // console.log("SHOWN Saved Hikes: ", shownHikesSaved);
  return (
    <>
      <nav className="navigation">
        <div className="leftNav">
          <Link
            to="/"
            className="navHome"
            style={{
              textDecoration: "none",
              padding: 5,
              cursor: "pointer",
              color: "rgb(212, 229, 202)",
            }}
          >
            Home
          </Link>
          <span style={{ padding: 5, color: "rgb(212, 229, 202)" }}> | </span>
          {user.id && (
            <>
              <Link
                className="navSaved"
                to="/saved"
                style={{
                  textDecoration: "none",
                  padding: 5,
                  cursor: "pointer",
                  color: "rgb(212, 229, 202)",
                }}
              >
                Saved
              </Link>
              <span style={{ padding: 5, color: "rgb(212, 229, 202)" }}>
                {" "}
                |{" "}
              </span>
            </>
          )}
          {user.id && (
            <>
              <Link
                to="/completed"
                className="navCompleted"
                style={{
                  textDecoration: "none",
                  padding: 5,
                  cursor: "pointer",
                  color: "rgb(212, 229, 202)",
                }}
              >
                Completed
              </Link>
              <span style={{ padding: 5, color: "rgb(212, 229, 202)" }}>
                {" "}
                |{" "}
              </span>
            </>
          )}
        </div>
        <div className="rightNav">
          {!user.id && (
            <>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  padding: 5,
                  cursor: "pointer",
                  color: "rgb(212, 229, 202)",
                }}
              >
                Sign up
              </Link>
              <span style={{ padding: 5, color: "rgb(212, 229, 202)" }}>
                {" "}
                |{" "}
              </span>
            </>
          )}
          {!user.id && (
            <>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  padding: 5,
                  cursor: "pointer",
                  color: "rgb(212, 229, 202)",
                }}
              >
                Login
              </Link>
              <span style={{ padding: 5, color: "rgb(212, 229, 202)" }}>
                {" "}
                |{" "}
              </span>
            </>
          )}

          {user.id && (
            <span
              onClick={handleLogOut}
              style={{
                padding: 5,
                cursor: "pointer",
                color: "rgb(212, 229, 202)",
              }}
            >
              Logout
            </span>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              savedHikes={savedHikes}
              setSavedHikes={setSavedHikes}
              stateSource={stateSource}
              setStateSource={setStateSource}
              stateSourceFull={stateSourceFull}
              setStateSourceFull={setStateSourceFull}
              completedHikes={completedHikes}
              setCompletedHikes={setCompletedHikes}
              activeComp={activeComp}
              setActiveComp={setActiveComp}
              // hikesShown={hikesShown}
              // setHikesShown={setHikesShown}
              // hikesResult={hikesResult}
              // setHikeResult={setHikeResult}
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
              stateSource={stateSource}
              stateSourceFull={stateSourceFull}
              // hikesShown={hikesShown}
              // setHikesShown={setHikesShown}
              shownHikesSaved={shownHikesSaved}
              setShownHikesSaved={setShownHikesSaved}
              activeComp={activeComp}
              setActiveComp={setActiveComp}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <Completed
              user={user}
              completedHikes={completedHikes}
              setCompletedHikes={setCompletedHikes}
              // hikesShown={hikesShown}
              // setHikesShown={setHikesShown}
              shownHikesComp={shownHikesComp}
              setShownHikesComp={setShownHikesComp}
              activeComp={activeComp}
              setActiveComp={setActiveComp}
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
      </Routes>
    </>
  );
};

export default App;
