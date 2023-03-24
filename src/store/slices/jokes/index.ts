import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import {
  getJokesDataLocal,
  addJokeDataLocal,
  removeJokeInDataLocal,
} from "src/utils/localstorage";
import { IJokes } from "src/interfaces/jokes.interface";
import { getJokesThunk, refreshJokeThunk } from "./extra.reducers";

export type JokesState = {
  isLoading: boolean;
  error: string | null;
  data: IJokes[];
  quantity: number;
};

export const localData = getJokesDataLocal();

const initialState: JokesState = {
  isLoading: false,
  error: null,
  data: localData,
  quantity: 0,
};

const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    addJokes: (state, action: PayloadAction<IJokes>) => {
      const alreadyExists = state.data.some(
        (joke) => joke.id === action.payload.id
      );

      if (alreadyExists) {
        return alert("Joke already exists");
      }

      state.data = [action.payload, ...state.data];
      addJokeDataLocal(action.payload);
    },
    removeJokes: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((j) => j.id !== action.payload);

      removeJokeInDataLocal(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJokesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getJokesThunk.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = action.payload.data;
        }

        if (action.payload.quantity) {
          state.quantity = action.payload.quantity;
        }

        state.isLoading = false;
      })
      .addCase(refreshJokeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshJokeThunk.fulfilled, (state, action) => {
        state.data = state.data.map((j) => {
          if (j.id === action.payload.id) {
            return action.payload.data;
          } else return j;
        });

        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const jokesReducer = jokesSlice.reducer;
export const jokesActions = jokesSlice.actions;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
