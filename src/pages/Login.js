import React from "react";
import { Login as LoginComponent } from "../components/index";

function Login() {
  return (
    <div className="bg-animated h-[65vh] py-4">
      {" "}
      <LoginComponent />{" "}
    </div>
  );
}

export default Login;


/* Credentials:- 
kh1234@gmail.com | 12345678
choti1234@gmail.com | 12345678 -> choti
guest1234@gmail.com | 12345678 -> Guest
guest2@gmail.com | same -> Guest2
*/