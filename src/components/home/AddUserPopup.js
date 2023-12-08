import { useForm } from "react-hook-form";
import {
  setAddUser,
  setLoader,
  setNewUserProfilePic,
} from "../../reduxStore/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import dummyProfilePic from "../../images/DummyProfile.png";
import { toast } from "react-toastify";
import Toasting from "../../toasting/toast";
import { useMutation, useQueryClient } from "react-query";
import { AddNewUser } from "../../api/dataUsersAPI";
import { invalidate } from "../../api/invalidationFunctions";
import Loader from "../loader/Loader";
const AddUser = () => {
  const { newUserProfilePic, loader } = useSelector((store) => store.user);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const previewFile = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      dispatch(setNewUserProfilePic(reader.result));
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

  const queryClient = useQueryClient();

  const { mutateAsync: addNewUserMutation, isLoading } = useMutation({
    mutationKey: ["addNewUser"],
    mutationFn: AddNewUser,
    onSuccess: () => {
      invalidate(queryClient, ["dataUsers"]);
    },
  });

  dispatch(setLoader(isLoading));

  const addUser = async (data) => {
    const finalData = { ...data, avatar: newUserProfilePic };
    const response = await addNewUserMutation(finalData);
    if (response?._id) {
      toast.success("User Added Successfully");
      reset();
      dispatch(setNewUserProfilePic(""));
      dispatch(setAddUser());
    } else {
      toast.error(response?.response?.data?.message);
    }
  };

  return (
    <div className=" fixed top-0 left-0 h-screen w-full bg-[#0000008d] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(addUser)}
        className="bg-[#F9E6E6] h-[90vh] w-[85%] lg:w-1/2 rounded-lg flex flex-col gap-3 items-center py-5 overflow-y-auto"
      >
        <div className="flex flex-col gap-1 w-11/12 md:w-3/5">
          <label className="font-bold text-[15px]">First Name</label>
          <input
            className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
            placeholder="Enter your first name"
            type="text"
            {...register("first_name")}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-11/12 md:w-3/5">
          <label className="font-bold text-[15px]">Last Name</label>
          <input
            className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
            placeholder="Enter your last name"
            type="text"
            {...register("last_name")}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-11/12 md:w-3/5">
          <label className="font-bold text-[15px]">Email</label>
          <input
            className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
            placeholder="Enter your email id"
            type="email"
            {...register("email")}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-11/12 md:w-3/5">
          <label htmlFor="gender" className="font-bold text-[15px]">
            Gender
          </label>
          <select
            id="gender"
            className="bg-[#FFA3BE] p-2.5 text-black outline-none rounded-md w-full"
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Agender">Agender</option>
            <option value="Bigender">Bigender</option>
            <option value="Genderfluid">Genderfluid</option>
            <option value="Genderqueer">Genderqueer</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Polygender">Polygender</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-11/12 md:w-3/5">
          <label htmlFor="available" className="font-bold text-[15px]">
            Availability
          </label>
          <select
            id="available"
            className="bg-[#FFA3BE] p-2.5 text-black outline-none rounded-md w-full"
            {...register("available")}
          >
            <option value="">Select Availability</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-11/12 md:w-3/5">
          <label htmlFor="domain" className="font-bold text-[15px]">
            Domain
          </label>
          <select
            id="domain"
            className="bg-[#FFA3BE] p-2.5 text-black outline-none rounded-md w-full"
            {...register("domain")}
          >
            <option value="">Select Domain</option>
            <option value="Business Development">Business Development</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="UI Designing">UI Designing</option>
          </select>
        </div>
        <div className=" w-11/12 md:w-2/5 lg:w-2/5 mx-auto flex justify-between items-center">
          <div className="flex flex-col gap-2 self-center">
            <label
              htmlFor="profile"
              className="font-bold text-[10px] md:text-[20px] bg-[#FFA3BE] h-[80px] w-[80px] md:h-[120px] md:w-[120px] rounded-full flex justify-center items-center"
            >
              Upload Pic
            </label>
            <input
              hidden
              id="profile"
              className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
              accept="image/jpeg, image/jpg, image/png"
              type="file"
              {...register("avatar")}
              required
              onChange={uploadImage}
            />
          </div>
          {newUserProfilePic ? (
            <img
              className="h-[80px] w-[80px] md:h-[120px] md:w-[120px] rounded-full"
              src={newUserProfilePic}
              alt="profilePic"
            />
          ) : (
            <img
              className="h-[80px] w-[80px] md:h-[120px] md:w-[120px] rounded-full"
              src={dummyProfilePic}
              alt="dummyProfilePic"
            />
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(setAddUser())}
            className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
          >
            Add
          </button>
        </div>
      </form>
      <Toasting />
      {loader && <Loader />}
    </div>
  );
};

export default AddUser;
