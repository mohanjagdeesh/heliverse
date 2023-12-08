import Login from "./components/loginAndSignUp/Login";
import SignUp from "./components/loginAndSignUp/SignUp";
import Home from "./components/home/Home";

import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/protectedRoutes";
import Teams from "./components/teams/Teams";
import SingleUserDetails from "./components/home/SingleUserDetails";

const App = () => {
  return (
    <div className=" font-serif">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/teams" element={<Teams />} />
          <Route exact path="/:userId" element={<SingleUserDetails />} />
        </Route>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
