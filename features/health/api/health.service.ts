import axios from "@/libs/request";

export const health = async () => {
  const response = await axios.get("/health");
  return response;
};
