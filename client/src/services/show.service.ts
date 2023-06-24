import axios from "axios";

const fetchShows = async () => {
  const { status, data } = await axios.get("/shows");
  if (status === 200) return data;
};

const fetchShowById = async (id: string) => {
  const { status, data } = await axios.get(`/shows/${id}`);
  if (status === 200) return data;
};

export { fetchShows, fetchShowById };
