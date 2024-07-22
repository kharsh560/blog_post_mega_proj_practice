import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice"; // See 22:49 for why we names "login" as storeLogin // Sir called it "authLogin"
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); // From react hook form.
  const [error, setError] = useState("");

  const login = async (data) => {
    // Note: The data inside login fxn is coming from register and handleSubmit of useForm!
    setError(""); // Cleaning the error state!
    try {
      await authService.login(data).then(async (session) => {
        if (session) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            dispatch(storeLogin(userData));
            navigate("/");
          }
        }
      });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <Logo width="100%" />
          {/* <span className="inline-block w-full max-w-[100px]">
            [Bai matlab ka de diya tha ye!!]
          </span> */}
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* Showing error if any:- */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* 26:28 Making the form now!! */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* 28:23 ab aage */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                //29:20 min se:-
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            {/* <Button type="submit" className="w-full">
              Sign in
            </Button> */}
            <Button children="Sign in" type="submit" className=" w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
