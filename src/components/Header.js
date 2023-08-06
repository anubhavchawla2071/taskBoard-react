import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated ,loading,setLoading} = useContext(Context);
  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      setIsAuthenticated(false);
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
      setIsAuthenticated(true);
      setLoading(false)
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Task Board
          </a>
        </div>
        <article style={{ display: "flex" }}>
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"} style={{ marginLeft: "1rem" }}>
            Profile
          </Link>
          {isAuthenticated ? (
            <button disabled ={loading} onClick={logoutHandler} className="btn">
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            >
              Login
            </Link>
          )}
        </article>
      </nav>
    </div>
  );
}
