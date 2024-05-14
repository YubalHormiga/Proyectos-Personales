// En api/DogApi.js
import api from "../lib/axios.js";

const fetchData = async () => {
  const key = import.meta.env.VITE_API_KEY;
  try {
    const { data } = await api.get("/breeds", {
      headers: {
        "x-api-key": key,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
