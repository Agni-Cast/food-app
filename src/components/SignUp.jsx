import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (user.id) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = (event) => {
    if (username !== "" && password !== "") {
      axios
        .post(`/signup`, { username: username, password: password })
        .catch((err) => console.log("SIGNUP err: ", err));
    }
  };

  // console.log("Signup: ", username, password);
  return (
    <div className="signupContainer">
      <div className="signupWord">Create an Account</div>
      <div className="signup">
        <form className="signupForm" onSubmit={handleSubmit}>
          <div>Email</div>

          <input
            className="signupInput"
            onChange={handleChangeUsername}
            placeholder="Username"
            value={username}
          ></input>
          <div>Password</div>

          <input
            className="signupInput"
            onChange={handleChangePassword}
            placeholder="Password"
            value={password}
          ></input>
          {/* <div> */}
          <button className="signupButton" type="submit">
            Sign up
          </button>
          {/* </div> */}
        </form>
      </div>

      <div className="loginLink">
        <div>Already have an account?</div>
        <span
          style={{
            margin: "4px",
            textDecoration: "none",
            cursor: "pointer",
            color: "rgb(212, 229, 202)",
          }}
        >
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}
export default SignUp;
