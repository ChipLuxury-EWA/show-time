import axios from "axios";

const apiVersion = "/api/v1";

const fetchShows = async () => {
  const { status, data } = await axios.get(`${apiVersion}/shows`);
  if (status === 200) return data;
};

const fetchShowById = async (id: string) => {
  const { status, data } = await axios.get(`${apiVersion}/shows/${id}`);
  if (status === 200) return data;
};

export { fetchShows, fetchShowById };
