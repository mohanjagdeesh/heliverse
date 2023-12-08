import { useForm } from "react-hook-form";
import {
  setUpdateUser,
  setUpdateUserDetails,
} from "../../reduxStore/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { UserDetailsUpdation } from "../../api/dataUsersAPI";
import { toast } from "react-toastify";
import { invalidate } from "../../api/invalidationFunctions";
import { useQueryClient } from "react-query";

const UpdateUser = () => {
  const { updateUserDetails } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: updateUserDetails.first_name,
      last_name: updateUserDetails.last_name,
      email: updateUserDetails.email,
      gender: updateUserDetails.gender,
      domain: updateUserDetails.domain,
      available: updateUserDetails.available,
    },
  });

  const { mutateAsync: updateUserMutation } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: UserDetailsUpdation,
    onSuccess: () => {
      invalidate(queryClient, ["dataUsers"]);
    },
  });

  const updateUser = async (data) => {
    const finalData = { ...data, userId: updateUserDetails._id };
    const response = await updateUserMutation(finalData);
    if (response?.acknowledged) {
      toast.success("User Updated Successfully");
      dispatch(setUpdateUser());
      dispatch(setUpdateUserDetails({}));
    }
  };
  return (
    <div className=" fixed top-0 left-0 h-screen w-full bg-[#0000008d] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(updateUser)}
        className="bg-[#F9E6E6] h-fit w-[85%] lg:w-1/2 rounded-lg flex flex-col gap-3 items-center py-5"
      >
        <div className="flex flex-col gap-1 w-11/12">
          <label className="font-bold text-[15px]">First Name</label>
          <input
            className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
            placeholder="Enter your first name"
            type="text"
            {...register("first_name")}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-11/12">
          <label className="font-bold text-[15px]">Last Name</label>
          <input
            className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
            placeholder="Enter your last name"
            type="text"
            {...register("last_name")}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-11/12">
          <label className="font-bold text-[15px]">Email</label>
          <input
            className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
            placeholder="Enter your email id"
            type="email"
            {...register("email")}
            required
          />
        </div>
        <div className="flex flex-col gap-1  w-11/12">
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
        <div className="flex flex-col gap-1  w-11/12">
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
        <div className="flex flex-col gap-1  w-11/12">
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
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(setUpdateUser())}
            className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
