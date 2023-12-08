import axios from "../utils/axiosInstance";

export const GetAllDataUsers = async (queryObj) => {
  try {
    let queries = "";
    if (queryObj.searchValue) queries += `&searchValue=${queryObj.searchValue}`;
    if (queryObj.gender) queries += `&gender=${queryObj.gender}`;
    if (queryObj.domain) queries += `&domain=${queryObj.domain}`;
    if (queryObj.available) queries += `&available=${queryObj.available}`;
    if (queryObj.paginationCount >= 0)
      queries += `&paginationCount=${queryObj.paginationCount}`;

    const response = await axios.get(`/dataUsers?name=jagan${queries}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetAllUsersData = async () => {
  try {
    const response = await axios.get(`/dataUsers/all`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const DeleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/dataUsers/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AddNewUser = async (finalData) => {
  try {
    const response = await axios.post(`/dataUsers`, finalData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetSpecificUser = async (userId) => {
  try {
    const response = await axios.get(`/dataUsers/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const UserDetailsUpdation = async (finalData) => {
  try {
    const response = await axios.put(`/dataUsers`, finalData);
    return response.data;
  } catch (error) {
    return error;
  }
};
