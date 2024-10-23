import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // For navigation bar (See; 17:39) :-
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-yellow-800 via-blue-700 to-red-700 p-4">
      <Container>
        <nav className="flex text-lg font-semibold">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* Other buttons */}
          <ul className="flex ml-auto">
            {/* Looping through the array "navItems" */}
            {navItems.map(
              (item) =>
                item.active ? ( // If its "true" => Means the user is logged in, then, show this object's name as a button.
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null // Else if the user is not logged in, then show nothing.
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        <div
          className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent to-transparent"
          style={{ filter: "blur(8px)", transform: "scaleY(0.5)" }}
        />
      </Container>
    </header>
  );
}

export default Header;
