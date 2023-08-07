import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    if (user.id) {
      navigate("/");
    }
  });
  const handleSubmit = async () => {
    try {
      console.log("USERNAME: ", username);
      if (
        username !== "" &&
        password !== "" &&
        username !== undefined &&
        password !== undefined
      ) {
        const res = await axios.post(
          `/login?username=${username}&password=${password}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Login: ", username, password);

  return (
    <div>
      <form>
        <input
          onChange={handleUsernameChange}
          placeholder="Username"
          value={username}
        ></input>
        <input
          onChange={handlePasswordChange}
          placeholder="Password"
          value={password}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <div>
        <div>Don't have an account?</div>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
