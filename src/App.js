import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // return (
  //   <div>
  //     <h1>A blog app using appwrite.</h1>
  //   </div>
  // );

  // We will do conditional rendering :-

  // return !loading ? <div></div> : null
  // Else, we are doing this :-

  return loading ? null : (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
        {/* <h1> Hello there </h1> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
