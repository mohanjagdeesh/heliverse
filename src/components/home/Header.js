import logo from "../../images/HeliverseLogo.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { GetLoggedInUser } from "../../api/usersApi";
import { setAddUser, setInitialState } from "../../reduxStore/users/usersSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const userEmail = Cookies.get("userEmail");

  const { data: loggedInUser } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: async () => {
      const result = await GetLoggedInUser(userEmail);
      return result;
    },
  });

  const logOut = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("userEmail");
    dispatch(setInitialState());
    navigate("/");
  };
  return (
    <div>
      {path === "/" && (
        <div className=" flex justify-between items-center py-10">
          <img src={logo} alt="logo" className="w-[100px] md:w-[250px]" />
          <button
            onClick={() => navigate("/signup")}
            className=" bg-[#474BCA] font-bold text-[12px] w-[100px] md:w-[150px] md:text-[15px] p-1 text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
      )}
      {path === "/signup" && (
        <div className=" flex justify-between items-center py-10">
          <img src={logo} alt="logo" className="w-[100px] md:w-[250px]" />
          <button
            onClick={() => navigate("/")}
            className=" bg-[#474BCA] font-bold text-[12px] w-[100px] md:w-[150px] md:text-[15px] p-1 text-white rounded-md"
          >
            Login
          </button>
        </div>
      )}

      {path === "/teams" && (
        <div className=" flex justify-between items-center py-10">
          <img src={logo} alt="logo" className="w-[100px] md:w-[250px]" />
          <Link to="/home">
            <h1 className="underline text-blue-800 font-bold text-[15px] md:text-[20px] cursor-pointer">
              Home
            </h1>
          </Link>
          <button
            onClick={logOut}
            className=" bg-[#474BCA] font-bold text-[12px] w-[100px] md:w-[150px] md:text-[15px] p-1 text-white rounded-md"
          >
            Log Out
          </button>
        </div>
      )}

      {path === "/home" && (
        <div className=" md:flex md:justify-between md:flex-row md:items-center py-10 flex flex-col gap-3">
          <div className="flex justify-between w-full md:w-3/5">
            <img
              src={logo}
              alt="logo"
              className="w-[100px] md:w-[150px] lg:w-[250px]"
            />
            <Link to="/teams">
              <h1 className="underline text-blue-800 font-bold text-[15px] md:text-[17px] lg:text-[20px] cursor-pointer">
                Teams
              </h1>
            </Link>
            <button
              onClick={() => dispatch(setAddUser())}
              className=" bg-[#474BCA] font-bold text-[12px] w-[100px] md:w-[150px] md:text-[15px] p-1 text-white rounded-md"
            >
              Add User
            </button>
          </div>
          <div className=" flex justify-between md:justify-normal items-center gap-3 w-full md:w-1/3">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" h-[75px] w-[75px] md:h-[100px] md:w-[100px] rounded-full"
                src={loggedInUser?.profilePic}
                alt="profilePic"
              />
              <h1 className="text-center font-bold text-[10px] lg:text-[20px] md:text-[15px]">
                Welcome <br />
                {loggedInUser?.name}
              </h1>
            </div>
            <button
              onClick={logOut}
              className=" bg-[#474BCA] font-bold text-[12px] w-[100px] md:w-[150px] md:text-[15px] p-1 text-white rounded-md"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
