import axiosClient from "../API/axiosClient";

// Use the existing axios client
// axiosClient

export const fetchVehicles = async (pageNumber, pageSize) => {
  try {
    const response = await axiosClient.get(
      `/system/vehicles/`
    );
    return response; // Response will be structured with totalVehicleCount, pageNumber, etc.
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};
