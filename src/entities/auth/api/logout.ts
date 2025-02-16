import api from "@/shared/api/apiMiddleware";

const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export default logout;
