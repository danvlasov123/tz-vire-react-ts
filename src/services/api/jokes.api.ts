import { axiosInstance } from "src/helpers/http/httpInstance";

import { IJokes } from "src/interfaces/jokes.interface";

const getJokesApi = async () => {
  return await axiosInstance.get<IJokes[]>("/jokes/ten");
};

const getJokeRandomApi = async () => {
  return await axiosInstance.get<IJokes>("/jokes/random");
};

export { getJokesApi, getJokeRandomApi };
