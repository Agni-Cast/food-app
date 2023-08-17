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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangeUsername}
          placeholder="Username"
          value={username}
        ></input>
        <input
          onChange={handleChangePassword}
          placeholder="Password"
          value={password}
        ></input>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
      <div>
        <div>Already have an account?</div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
export default SignUp;
