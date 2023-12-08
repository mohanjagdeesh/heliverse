import { FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { DeleteUser, GetAllDataUsers } from "../../api/dataUsersAPI";
import {
  setSearchValue,
  increasePaginationCount,
  decreasePaginationCount,
  setUserAvailable,
  setUserDomain,
  setUserGender,
  setIsLoading,
  setUpdateUser,
  setUpdateUserDetails,
} from "../../reduxStore/users/usersSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Toasting from "../../toasting/toast";
import { useQueryClient } from "react-query";
import { invalidate } from "../../api/invalidationFunctions";
import { Link } from "react-router-dom";
import { CreateTeam } from "../../api/teamsAPI";
import UpdateUser from "./UpdateUserPopup";
import AddUser from "./AddUserPopup";

const UsersDashboard = () => {
  const {
    searchValue,
    paginationCount,
    userGender,
    userAvailable,
    userDomain,
    isLoading,
    updateUser,
    addUser,
  } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const queryObj = {
    gender: userGender,
    domain: userDomain,
    available: userAvailable,
    paginationCount,
    searchValue,
  };

  const { data: dataUsersArray, refetch } = useQuery({
    queryKey: ["dataUsers"],
    queryFn: async () => {
      const result = GetAllDataUsers(queryObj);
      return result;
    },
  });

  // Showing Documents Range
  const totalUsers = dataUsersArray?.totalUsers;
  const totalPages = Math.floor(totalUsers / 20);
  const startIdx = paginationCount * 20;
  const endIdx = Math.min(startIdx + 20, totalUsers);
  const currentRange = `${startIdx + 1}-${endIdx} / ${totalUsers}`;

  const queryClient = useQueryClient();

  const { mutateAsync: addToTeamMutation } = useMutation({
    mutationKey: ["addToTeam"],
    mutationFn: CreateTeam,
    onSuccess: () => {
      invalidate(queryClient, ["userTeams"]);
    },
  });

  const { mutateAsync: deleteUserMutation } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: DeleteUser,
    onSuccess: () => {
      invalidate(queryClient, ["dataUsers"]);
    },
  });

  useEffect(() => {
    refetch();
  }, [isLoading, refetch]);

  const userEmail = Cookies.get("userEmail");
  return (
    <div className="flex flex-col gap-2 md:mt-5">
      <div className="md:flex md:justify-between md:flex-row flex flex-col">
        <div className=" flex flex-col w-full md:w-1/3 lg:w-1/4 items-center justify-between h-fit gap-3 md:gap-5 sticky top-0 md:static  bg-[#263865] py-3 rounded-md">
          <h1 className="text-[20px] font-bold text-white md:text-blue-600">
            Filters
          </h1>
          <div className="flex flex-col gap-1  w-11/12">
            <label
              htmlFor="search"
              className="font-bold text-[12px] md:text-[17px] md:text-black text-white"
            >
              Search User
            </label>
            <div className=" bg-[#FFA3BE] w-full p-2 rounded-md flex justify-between items-center">
              <input
                autoComplete="off"
                id="search"
                className=" bg-transparent w-11/12 outline-none text-black"
                placeholder="Search User"
                type="search"
                onChange={(e) => {
                  dispatch(setSearchValue(e.target.value));
                  dispatch(setIsLoading());
                }}
              />
              <FcSearch />
            </div>
          </div>
          <div className="flex flex-col gap-1  w-11/12">
            <label
              htmlFor="gender"
              className="font-bold text-[12px] md:text-[17px] md:text-black text-white"
            >
              Gender
            </label>
            <select
              id="gender"
              className="bg-[#FFA3BE] p-2.5 text-black outline-none rounded-md w-full"
              onChange={(e) => {
                dispatch(setUserGender(e.target.value));
                dispatch(setIsLoading());
              }}
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
            <label
              htmlFor="available"
              className="font-bold text-[12px] md:text-[17px] md:text-black text-white"
            >
              Availability
            </label>
            <select
              id="available"
              className="bg-[#FFA3BE] p-2.5 text-black outline-none rounded-md w-full"
              onChange={(e) => {
                dispatch(setUserAvailable(e.target.value));
                dispatch(setIsLoading());
              }}
            >
              <option value="">Select Availability</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="flex flex-col gap-1  w-11/12">
            <label
              htmlFor="domain"
              className="font-bold text-[12px] md:text-[17px] md:text-black text-white"
            >
              Domain
            </label>
            <select
              id="domain"
              className="bg-[#FFA3BE] p-2.5 text-black outline-none rounded-md w-full"
              onChange={(e) => {
                dispatch(setUserDomain(e.target.value));
                dispatch(setIsLoading());
              }}
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
        </div>
        <div className="w-full md:w-[70%] flex flex-col md:h-[70vh] lg:flex lg:flex-row lg:flex-wrap justify-start gap-2 overflow-y-scroll mt-5 md:mt-0">
          {Array.isArray(dataUsersArray?.paginatedUsers) &&
            dataUsersArray?.paginatedUsers?.map((each) => {
              const addToTeam = async () => {
                const combinedName = each.first_name + " " + each.last_name;
                const finalData = {
                  name: combinedName,
                  email: each.email,
                  avatar: each.avatar,
                  gender: each.gender,
                  domain: each.domain,
                  available: each.available,
                  id: each.id,
                  userEmail,
                };

                if (each.available) {
                  const response = await addToTeamMutation(finalData);
                  if (response?._id) {
                    toast.success("User Added To The Team Successfully");
                  } else {
                    toast.error(response?.response?.data?.message);
                  }
                } else {
                  toast.error(
                    "User Is Not Available So You Cannot Add User To Team"
                  );
                }
              };

              const deleteUser = async () => {
                const userId = each?._id;
                const response = await deleteUserMutation(userId);
                if (response?.acknowledged) {
                  toast.success("User Deleted Successfully");
                }
              };

              return (
                <div
                  key={each?._id}
                  className=" bg-[#FFA3BE] rounded-md h-[250px] w-full md:w-4/5 md:mx-auto lg:w-[300px] flex flex-col justify-between gap-1 p-2"
                >
                  <img
                    className="bg-white rounded-full h-[50px] w-[50px] self-center"
                    src={`${each?.avatar}`}
                    alt="userPic"
                  />
                  <h1>
                    Name:-{each?.first_name} {each?.last_name}
                  </h1>
                  <h1>Gender:-{each?.gender}</h1>
                  <h1>Email:-{each?.email}</h1>
                  <h1>Domain:-{each?.domain}</h1>
                  <div className="flex justify-between">
                    <Link to={`/${each?._id}`}>
                      <button className="bg-[#474BCA] text-white rounded-md p-1">
                        Details
                      </button>
                    </Link>
                    <button
                      onClick={deleteUser}
                      className="bg-[#474BCA] text-white rounded-md p-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        dispatch(setUpdateUserDetails(each));
                        dispatch(setUpdateUser());
                      }}
                      className="bg-[#474BCA] text-white rounded-md p-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={addToTeam}
                      className="bg-[#474BCA] text-white rounded-md p-1"
                    >
                      Add to Team
                    </button>
                  </div>
                </div>
              );
            })}
          <h1 className="text-center text-[15px] font-bold">
            {dataUsersArray?.paginatedUsers?.length === 0
              ? "No Filtered Matches Here"
              : ""}
          </h1>
        </div>
      </div>

      <div className=" self-end flex gap-3 items-center">
        <h1 className="text-[12px] font-bold">{currentRange}</h1>
        <button
          disabled={paginationCount <= 0}
          onClick={() => {
            dispatch(decreasePaginationCount());
            dispatch(setIsLoading());
          }}
          className={` ${
            paginationCount <= 0 ? "bg-[#8d90e3]" : "bg-[#474BCA]"
          } md:w-[150px] w-[100px]  rounded-md text-white font-bold p-1.5`}
        >
          Previous
        </button>
        <button
          disabled={paginationCount >= totalPages}
          onClick={() => {
            dispatch(increasePaginationCount());
            dispatch(setIsLoading());
          }}
          className={` ${
            paginationCount >= totalPages ? "bg-[#8d90e3]" : "bg-[#474BCA]"
          } md:w-[150px] w-[100px] rounded-md text-white font-bold p-1.5`}
        >
          Next
        </button>
      </div>
      <Toasting />
      {updateUser ? <UpdateUser /> : ""}
      {addUser ? <AddUser /> : ""}
    </div>
  );
};

export default UsersDashboard;
