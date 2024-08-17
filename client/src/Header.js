import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css'
import { UserContext } from "./UserContext";

export default function PostsHeader() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    console.log("Fetching profile...");
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((userInfo) => {
        console.log("Fetched user info:", userInfo);
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [setUserInfo]);

  function logout() {
    console.log("Logging out...");
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((response) => {
        console.log("Logout response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Logout response data:", data);
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }

  const username = userInfo?.username;

  console.log("Rendering header with username:", username);

  return (
    <div className="w3-container w3-content">
      <header className="posts-header">
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          {username ? (
            <>
              <Link to="/create">Create new post</Link>
              <button onClick={logout} className="logout-button">
                Logout ({username})
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
