import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as authSliceLogout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  function logoutHandler() {
    authService.logout().then(() => {
      dispatch(authSliceLogout());
    });
  }
  // I renamed the "logout" fro, authSlice as "authSliceLogout"
  // logout().then(() => {
  //     dispatch(logout());

  //   function logoutHandler() {
  //     authService.logout();
  //     dispatch(logout());
  //   } Wrong snippet

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
