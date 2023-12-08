import axios from "../utils/axiosInstance";

export const CheckUser = async ({ data }) => {
  try {
    const response = await axios.post("/users/authenticate", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const CreateUser = async ({ finalData }) => {
  try {
    const response = await axios.post(`/users`, finalData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetLoggedInUser = async (userEmail) => {
  try {
    const response = await axios.get(`/users?userEmail=${userEmail}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
