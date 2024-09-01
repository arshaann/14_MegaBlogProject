import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as signOut } from "../../store/authSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService
      .logout()
      .then((response) => {
        console.log("LogoutBtn -> response : ", response);
        dispatch(signOut());
        console.log("Logged out");
      })
      .catch((error) => {
        console.log("LogoutBtn -> error : ", error);
      });
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-slate-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
