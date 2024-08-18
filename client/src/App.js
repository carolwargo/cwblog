import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
/*
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
*/
import {UserContextProvider} from "./UserContext";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div>
      <BrowserRouter>
    <ErrorBoundary>
    <UserContextProvider>
      <Routes>
        {/*}
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
        */}
           {/* Add a catch-all route for handling errors */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
    </div>
  );
}

// Create a component for handling not found routes
function NotFound() {
  console.error("Page not found!"); // Log error to console
  return <h1>404 - Not Found</h1>;
}

export default App;
