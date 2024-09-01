import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <main className="min-h-screen flex flex-wrap content-between bg-slate-400">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </main>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-400">
      Loading...
    </div>
  );
}

export default App;
