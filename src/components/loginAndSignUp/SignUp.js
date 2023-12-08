import loginImage from "../../images/LoginImage.png";
import dummyProfilePic from "../../images/DummyProfile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  signupVisibility,
  setProfilePic,
  setLoader,
} from "../../reduxStore/users/usersSlice";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../../api/usersApi";
import Toasting from "../../toasting/toast";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../home/Header";
import Loader from "../loader/Loader";

const SignUp = () => {
  const { signupPasswordVisibility, profilePic, loader } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  const { register, reset, handleSubmit } = useForm();

  const { mutateAsync: createUserMutation, isLoading } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: CreateUser,
  });

  dispatch(setLoader(isLoading));

  const navigate = useNavigate();

  const previewFile = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      dispatch(setProfilePic(reader.result));
    };
  };

  const uploadImage = (e) => {
    const image = e.target.files[0];
    const maxSize = 1024 * 1024;
    if (image.size > maxSize) {
      toast.error("Image Size Should be Lessthan 1MB");
    } else {
      previewFile(image);
    }
  };

  const userSignUp = async (data) => {
    const finalData = { ...data, profilePic };
    const response = await createUserMutation({ finalData });
    if (response?._id) {
      dispatch(setProfilePic(""));
      toast.success("User Created Successfully");
      reset();
      navigate("/");
    } else {
      const errorMessage = response?.response?.data?.message;
      toast.error(errorMessage);
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
          <div className="md:w-2/5  md:flex md:flex-col gap-3 md:gap-10 w-full">
            <h1 className="font-bold text-[25px] md:text-[35px]">
              SignUp here
            </h1>
            <form
              onSubmit={handleSubmit(userSignUp)}
              className="flex flex-col gap-3 md:gap-4"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="font-bold text-[15px] md:text-[20px]"
                >
                  Name
                </label>
                <input
                  id="name"
                  className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
                  placeholder="Enter your name"
                  type="text"
                  {...register("name")}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-bold text-[15px] md:text-[20px]"
                >
                  Email
                </label>
                <input
                  id="email"
                  className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
                  placeholder="Enter your email id"
                  type="email"
                  {...register("email")}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="font-bold text-[15px] md:text-[20px]"
                >
                  Password
                </label>
                <div className=" bg-[#FFA3BE] w-full p-2 rounded-md flex justify-between items-center">
                  <input
                    id="password"
                    className=" bg-transparent w-11/12 outline-none text-black"
                    placeholder="Enter your password"
                    type={signupPasswordVisibility ? "text" : "password"}
                    {...register("password")}
                    required
                  />
                  <button>
                    {signupPasswordVisibility ? (
                      <BsEyeSlashFill
                        className=" h-[25px] w-[25px]"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(signupVisibility());
                        }}
                      />
                    ) : (
                      <BsEyeFill
                        className=" h-[25px] w-[25px]"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(signupVisibility());
                        }}
                      />
                    )}
                  </button>
                </div>
                <div className=" w-3/4 mx-auto flex justify-between items-center">
                  <div className="flex flex-col gap-2 self-center">
                    <label
                      htmlFor="profile"
                      className="font-bold text-[12px] md:text-[20px] bg-[#FFA3BE] h-[80px] w-[80px] md:h-[120px] md:w-[120px] rounded-full flex justify-center items-center"
                    >
                      Upload Pic
                    </label>
                    <input
                      hidden
                      id="profile"
                      className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
                      accept="image/jpeg, image/jpg, image/png"
                      type="file"
                      {...register("profilePic")}
                      required
                      onChange={uploadImage}
                    />
                  </div>
                  {profilePic ? (
                    <img
                      className=" h-[80px] w-[80px] md:h-[120px] md:w-[120px] rounded-full"
                      src={profilePic}
                      alt="profilePic"
                    />
                  ) : (
                    <img
                      className=" h-[80px] w-[80px] md:h-[120px] md:w-[120px] rounded-full"
                      src={dummyProfilePic}
                      alt="dummyProfilePic"
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
              >
                SignUp
              </button>
            </form>
            <h1 className="text-center">
              Already registered?{" "}
              <Link to="/">
                <span className="text-[#FFA3BE] underline cursor-pointer">
                  Login
                </span>
              </Link>
            </h1>
          </div>
          <div className="w-2/5  justify-center items-center hidden md:inline-flex">
            <img src={loginImage} alt="loginImage" />
          </div>
        </div>
      </div>
      <Toasting />
      {loader && <Loader />}
    </div>
  );
};

export default SignUp;
