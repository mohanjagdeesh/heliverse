import logo from "../../images/HeliverseLogo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { GetSpecificUser } from "../../api/dataUsersAPI";
import { setInitialState } from "../../reduxStore/users/usersSlice";
import { useDispatch } from "react-redux";

const SingleUserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("userEmail");
    dispatch(setInitialState());
    navigate("/");
  };

  const { data: specificUser } = useQuery({
    queryKey: ["specificUser"],
    queryFn: async () => {
      const result = await GetSpecificUser(userId);
      return result;
    },
  });

  return (
    <div className=" bg-[#F9E6E6] h-screen w-full">
      <div className=" w-11/12 mx-auto flex flex-col">
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
        <div className=" bg-[#FFA3BE] rounded-md h-fit w-full md:w-1/2 lg:2/5 flex flex-col justify-between self-center gap-2 py-3 px-3">
          <img
            className="bg-white rounded-full h-[100px] w-[100px] self-center"
            src={`${specificUser?.avatar}`}
            alt="userPic"
          />
          <h1 className="font-bold text-[15px] md:text-[16px] lg:text-[20px] ">
            Name:-{" "}
            <span className="text-blue-600">
              {specificUser?.first_name} {specificUser?.last_name}
            </span>
          </h1>
          <h1 className="font-bold text-[15px] md:text-[16px] lg:text-[20px]">
            Gender:-{" "}
            <span className="text-blue-600">{specificUser?.gender}</span>
          </h1>
          <h1 className="font-bold text-[15px] md:text-[16px] lg:text-[20px]">
            Email:- <span className="text-blue-600">{specificUser?.email}</span>
          </h1>
          <h1 className="font-bold text-[15px] md:text-[16px] lg:text-[20px]">
            Domain:-{" "}
            <span className="text-blue-600">{specificUser?.domain}</span>
          </h1>
          <button
            onClick={() => navigate("/home")}
            className=" bg-[#474BCA] font-bold text-[15px] w-[140px] p-1 text-white rounded-md self-center"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleUserDetails;
