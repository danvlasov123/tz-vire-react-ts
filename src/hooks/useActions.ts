import { bindActionCreators } from "@reduxjs/toolkit";

import { jokesActions } from "src/store/slices/jokes";
import { useAppDispatch } from "./useStore";

import {
  getJokesThunk,
  refreshJokeThunk,
} from "src/store/slices/jokes/extra.reducers";

const allActions = {
  ...jokesActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();

  const getJokes = (quantity: number) => dispatch(getJokesThunk(quantity));

  const refreshJoke = (id: number) => dispatch(refreshJokeThunk(id));

  const extraReducers = {
    getJokes,
    refreshJoke,
  };

  return { ...bindActionCreators(allActions, dispatch), ...extraReducers };
};
