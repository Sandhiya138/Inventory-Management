const BASE_URL = "http://localhost:5000";

export const fetchData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  return response.json();
};