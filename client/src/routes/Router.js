import { lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import About from "../views/About";
import Alerts from "../views/ui/Alerts";
import Badges from "../views/ui/Badges";
import Buttons from "../views/ui/Buttons";
import Cards from "../views/ui/Cards";
import Chat from "../views/ui/chat/Chat";
import Forms from "../views/ui/CreateRoom";
import Grid from "../views/ui/Grid";
import Rooms from "../views/ui/Rooms";
import Tables from "../views/ui/Tables";
import Starter from "../views/Starter";
import FullLayout from "../layouts/FullLayout";
import Login from "../views/auth/login";
import SignUp from "../views/auth/sign-up";
import PublicRooms from "../views/ui/publicRooms";

const Routing = () => {
  const { user } = useContext(AuthContext);
  const [rerender, setrerender] = useState(false);

  // const [contextUser, setcontextUser] = useState("initial");
  // // if (localStorage.getItem("user") !== "null" === null)
  // useEffect(() => {
  //     setcontextUser("user");  
  //     console.log(contextUser) ;
  // }, []);

  // save user to localstorage
  useEffect(() => {
    if (user === null) return;
    localStorage.setItem("user", JSON.stringify(user));
    setrerender(!rerender);
    console.log(localStorage.getItem("user") !== "null");
    console.log(user);
  }, [user]);



  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.getItem("user") !== "null" ? <FullLayout /> : <Navigate to="/login" />}
      >
        <Route
          exact
          path="/"
          element={localStorage.getItem("user") !== "null" ? <Starter /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/starter"
          element={localStorage.getItem("user") !== "null" ? <Starter /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/about"
          element={localStorage.getItem("user") !== "null" ? <About /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/alerts"
          element={localStorage.getItem("user") !== "null" ? <Alerts /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/badges"
          element={localStorage.getItem("user") !== "null" ? <Badges /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/buttons"
          element={localStorage.getItem("user") !== "null" ? <Buttons /> : <Navigate to="/login" />}
        />
        <Route exact path="/cards" element={<Cards />} />
        <Route exact path="/grid" element={<Grid />} />
        <Route exact path="/createroom" element={<Forms />} />
        <Route
          exact
          path="/rooms"
          element={localStorage.getItem("user") !== "null" ? <Rooms /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/discover"
          element={localStorage.getItem("user") !== "null" ? <PublicRooms /> : <Navigate to="/login" />}
        />
        <Route exact path="/tables" element={<Tables />} />
        <Route
          path="/chat"
          element={localStorage.getItem("user") !== "null" ? <Chat /> : <Navigate to="/" />}
        />
      </Route>
      <Route
        exact
        path="/login"
        element={localStorage.getItem("user") !== "null" ? <Navigate to="/" /> : <Login />}
      />
      <Route
        exact
        path="/signup"
        element={localStorage.getItem("user") !== "null" ? <Navigate to="/" /> : <SignUp />}
      />
    </Routes>
  );
};

/*****Routes******/

export default Routing;

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
// const AuthLayout = lazy(() => import("../layouts/AuthLayout.js"));

// /***** Pages ****/

// const Starter = lazy(() => import("../views/Starter.js"));
// const About = lazy(() => import("../views/About.js"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
// const Rooms = lazy(() => import("../views/ui/Rooms"));
// const SignUp = lazy(() => import("../views/auth/sign-up"));
// const Chat = lazy(() => import("../views/ui/chat/Chat"));
// const Login = lazy(() => import("../views/auth/login"));
// const ThemeRoutes = [
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/starter" />},
//       { path: "/starter", exact: true, element: <Starter /> },
//       { path: "/about", exact: true, element: <About /> },
//       { path: "/alerts", exact: true, element: <Alerts /> },
//       { path: "/badges", exact: true, element: <Badges /> },
//       { path: "/buttons", exact: true, element: <Buttons /> },
//       { path: "/cards", exact: true, element: <Cards /> },
//       { path: "/grid", exact: true, element: <Grid /> },
//       { path: "/table", exact: true, element: <Tables /> },
//       { path: "/forms", exact: true, element: <Forms /> },
//       { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
//       { path: "/rooms", exact: true, element: <Rooms /> },
//       { path: "/chat", exact: true, element: <Chat />}
//     ],
//   },
//   {
//     path: "/",
//     element: <AuthLayout />,
//     children: [
//       { path: "/signup", exact: true, element: <SignUp /> },
//       { path: "/login", exact: true, element: <Login /> },
//     ],
//   },
