import axios from "../utils/axiosInstance";

export const CreateTeam = async (finalData) => {
  try {
    const response = await axios.post(`/teams`, finalData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetTeamMembers = async (userEmail) => {
  try {
    const response = await axios.get(`/teams/${userEmail}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
