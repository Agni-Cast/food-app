import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("USERNAME: ", username);
      if (
        username !== "" &&
        password !== "" &&
        username !== undefined &&
        password !== undefined
      ) {
        const res = await axios.post(`/login`, {
          username: username,
          password: password,
        });
        if (res.data === "NO USER" || res.data === "INCORRECT PASSWORD") {
          setInputError(true);
          // setErrorMessage("Incorrect Username or Password");
        } else {
          setInputError(false);
          // setErrorMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user.id) {
      navigate("/");
    }
  }, [user]);
  // console.log("ERROR MESSAGE: ", errorMessage);
  // console.log("Login: ", username, password);

  return (
    <div className="loginContainer">
      <div className="loginWord">Login to your Account</div>
      <div className="login">
        <form className="loginForm">
          {/* <div className="loginInput"> */}
          <div>Email</div>
          <input
            className="loginInput"
            onChange={handleUsernameChange}
            placeholder="Username"
            value={username}
          ></input>
          {/* </div> */}
          {/* <div> */}
          <div>Password</div>

          <input
            className="loginInput"
            onChange={handlePasswordChange}
            placeholder="Password"
            value={password}
            type="password"
          ></input>
          {/* </div> */}
          <button className="loginButton" type="submit" onClick={handleSubmit}>
            Login
          </button>
          <div>{inputError ? <div>{errorMessage}</div> : null}</div>
        </form>
        {/* <div>{errorMessage}</div> */}
      </div>
      <div className="signupLink">
        <div>Don't have an account?</div>
        <span
          style={{
            margin: "4px",
            textDecoration: "none",
            cursor: "pointer",
            color: "rgb(212, 229, 202)",
          }}
        >
          <Link to="/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
