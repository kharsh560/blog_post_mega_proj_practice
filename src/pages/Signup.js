import React from "react";
// import Signup  from "./components"
import { Signup as SignupComponent } from "../components/index";


function Signup() {
  return (
    <div className="bg-animated  py-8">
      {" "}
      <SignupComponent />{" "}
    </div>
  );
  // Note: "S" in SignUpComponent should be capital, as its a component to be rendered. 
}

export default Signup;


