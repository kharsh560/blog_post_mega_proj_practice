import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const createAccountOnSignup = async (data) => {
    setError("");
    try {
      await authService
        .createAccount(data)
        .then(async (createdAndLoggedInUser) => {
          if (createdAndLoggedInUser) {
            await authService.getCurrentUser().then((currentUser) => {
              if (currentUser) {
                dispatch(login(currentUser));
                navigate("/");
              }
            });
          }
        });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl p-10 bg-gray-100 bg-opacity-50  backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.8)]`}
      >
        <div className="mb-2 flex justify-center items-center">
          <Logo width="100%" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(createAccountOnSignup)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
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
              Create Account
            </Button> */}
            <Button
              children="Create Account"
              type="submit"
              className=" w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
