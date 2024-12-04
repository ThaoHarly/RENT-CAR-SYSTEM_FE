import axios from "axios";

export const apiCall = async (method, url, data = null) => {
  const option = {
    method,
    url,
    data,
  };
  const response = await axios(option);
  return response.data;
};
