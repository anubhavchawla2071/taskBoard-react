import axios from "axios";
import React, {useContext, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { Context, server } from "../index";
import toast from "react-hot-toast";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );      
      toast.success(data.message);
      setIsAuthenticated(true);
    setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
      setIsAuthenticated(false);
    setLoading(false);

    }

  };
  // console.log(isAuthenticated)
  if(isAuthenticated) navigate("/")
  return (
    <div>
      <h3>Register</h3>
      <form
        style={{ width: "40%", position: "absolute", top: "20%", left: "30%" }}
        onSubmit={submitHandler}
      >
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={loading}type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <h4 style={{ marginTop: "1rem" }}>Or</h4>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}
