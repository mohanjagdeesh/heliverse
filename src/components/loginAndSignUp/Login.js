import loginImage from "../../images/LoginImage.png";
import { useDispatch, useSelector } from "react-redux";
import { loginVisibility } from "../../reduxStore/users/usersSlice";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CheckUser } from "../../api/usersApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Toasting from "../../toasting/toast";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Header from "../home/Header";

const Login = () => {
  const { loginPasswordVisibility } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, reset, handleSubmit } = useForm();

  const { mutateAsync: userLoginMutation } = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: CheckUser,
  });

  const captureUserDetails = async (data) => {
    const response = await userLoginMutation({ data });
    if (response?.status) {
      Cookies.set("jwtToken", response?.jwtToken);
      Cookies.set("userEmail", response?.userDetails?.email);
      toast.success("User LoggedIn Successfully");
      reset();
      navigate("/");
    } else {
      toast.error(`${response?.statusText}`);
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      navigate("/");
    }
  });

  return (
    <div className=" bg-[#F9E6E6] h-screen w-full">
      <div className=" w-4/5 mx-auto">
        <Header />
        <div className="w-full  md:flex md:justify-between h-[70vh]">
          <div className="md:w-2/5  md:flex md:flex-col gap-5 md:gap-10 w-full">
            <h1 className="font-bold text-[25px] text-center md:text-[40px]">
              Login now
            </h1>
            <form
              onSubmit={handleSubmit(captureUserDetails)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1 md:gap-2">
                <label className="font-bold text-[15px] md:text-[20px]">
                  Email
                </label>
                <input
                  className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
                  placeholder="Enter your email id"
                  type="email"
                  {...register("email")}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <label className="font-bold text-[15px] md:text-[20px]">
                  Password
                </label>
                <div className=" bg-[#FFA3BE] w-full p-2 rounded-md flex justify-between items-center">
                  <input
                    className=" bg-transparent w-11/12 outline-none text-black"
                    placeholder="Enter your password"
                    type={loginPasswordVisibility ? "text" : "password"}
                    {...register("password")}
                    required
                  />
                  <button>
                    {loginPasswordVisibility ? (
                      <BsEyeSlashFill
                        className=" h-[25px] w-[25px]"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(loginVisibility());
                        }}
                      />
                    ) : (
                      <BsEyeFill
                        className=" h-[25px] w-[25px]"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(loginVisibility());
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
              >
                Login
              </button>
            </form>
            <h1 className="text-center mt-5 md:mt-0">
              Not registered yet?{" "}
              <span className="text-[#474BCA]">Create an account</span>{" "}
              <Link to="/signup">
                <span className="text-[#FFA3BE] underline cursor-pointer">
                  SingUp
                </span>
              </Link>
            </h1>
          </div>
          <div className="w-2/5 hidden md:inline-flex justify-center items-center">
            <img src={loginImage} alt="loginImage" />
          </div>
        </div>
      </div>
      <Toasting />
    </div>
  );
};

export default Login;
