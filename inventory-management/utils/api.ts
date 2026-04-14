const BASE_URL = "http://localhost:5000";

/**
 * Generic fetcher for JSON Server
 * @param endpoint - e.g., 'users', 'inventory', or 'orders'
 */
export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

/**
 * Generic POST for JSON Server
 * @param endpoint - e.g., 'users' or 'inventory'
 * @param data - The object to save
 */
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    return null;
  }
};

/**
 * Generic DELETE for JSON Server
 */
export const deleteData = async (endpoint: string, id: string | number) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error(`Error deleting from ${endpoint}:`, error);
    return false;
  }
};