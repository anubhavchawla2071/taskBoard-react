import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context, server } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated ,loading,setLoading} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }

  };


  if (isAuthenticated) navigate("/");

  return (
    <div>
      <form
        style={{ width: "40%", position: "absolute", top: "20%", left: "30%" }}
        onSubmit={submitHandler}
      >
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
        <button disabled={loading} type="submit" className="btn btn-primary">
          Login
        </button>
        <h4 style={{ marginTop: "1rem" }}>Or</h4>
        <Link to="/register">Sign Up</Link>
      </form>
    </div>
  );
}
