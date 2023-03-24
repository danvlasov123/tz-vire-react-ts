import axios from "axios";

import { API_URL } from "src/config";

const createRequestHandler = () => {
  const instance = axios.create({ baseURL: API_URL });

  return instance;
};

export const axiosInstance = createRequestHandler();
