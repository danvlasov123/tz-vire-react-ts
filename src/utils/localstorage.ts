import { IJokes } from "src/interfaces/jokes.interface";

const keyJokesData = "jokes-data";

const getJokesDataLocal = (): IJokes[] => {
  const data = localStorage.getItem(keyJokesData);

  return data ? JSON.parse(data) : [];
};

const setJokesDataLocal = (data: IJokes[]): void => {
  localStorage.setItem(keyJokesData, JSON.stringify(data));
};

const addJokeDataLocal = (data: IJokes): void => {
  const jokes = getJokesDataLocal();

  setJokesDataLocal([data, ...jokes]);
};

const removeJokeInDataLocal = (id: number): void => {
  const jokes = getJokesDataLocal();

  const result = jokes.filter((j) => j.id !== id);

  setJokesDataLocal(result);
};

export {
  getJokesDataLocal,
  setJokesDataLocal,
  addJokeDataLocal,
  removeJokeInDataLocal,
};
