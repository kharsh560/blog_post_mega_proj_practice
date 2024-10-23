import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-2 bg-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-red-800">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center w-fit">
                <Logo/>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024 | All Rights Reserved by the developer:
                  <div className=" text-lg font-bold bg-gradient-to-r from-red-500 via-blue-800 bg-clip-text text-transparent">
                    Kumar Harsh
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-green-300">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-green-300">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-green-300">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium bg-gradient-to-r from-blue-500 via-yellow-300 to-red-700 bg-clip-text text-transparent"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
