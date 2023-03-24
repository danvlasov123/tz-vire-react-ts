import { createAsyncThunk } from "@reduxjs/toolkit";
import { getJokesApi, getJokeRandomApi } from "src/services/api/jokes.api";
import { IJokes } from "src/interfaces/jokes.interface";
import { AxiosError } from "axios";

import { JokesState } from "./index";

import { checkForSameValue } from "src/utils/checkingForSameValue";

export type returnType = {
  quantity?: number;
  data?: IJokes[];
};

export const getJokesThunk = createAsyncThunk<
  returnType,
  number,
  { rejectValue: string; state: { jokes: JokesState } }
>(
  "jokes/getJokesThunk",
  async (quantity: number, { rejectWithValue, getState }) => {
    try {
      const {
        jokes: { data: stateData },
      } = getState();

      const response = await getJokesApi();

      const { data: responseData } = response;

      let result = [...responseData];

      const recursionGetJokes = async (
        resData: IJokes[]
      ): Promise<IJokes[] | undefined> => {
        const checkForUniqueness = checkForSameValue(resData, stateData, "id");

        if (checkForUniqueness.length) {
          const response = await getJokesApi();

          result = [...response.data];

          console.log("отримані дані не унікальні");

          return await recursionGetJokes(response.data);
        }
      };

      if (quantity === 0 && stateData.length) {
        result = responseData.slice(stateData.length, responseData.length);
      } else await recursionGetJokes(responseData);

      return { data: [...stateData, ...result], quantity };
    } catch (error) {
      const err = error as AxiosError<{ message: string; type: string }>;

      return rejectWithValue(
        err?.response?.data?.message || err?.message || String(err)
      );
    }
  }
);

export const refreshJokeThunk = createAsyncThunk<
  { id: number; data: IJokes },
  number,
  { rejectValue: string; state: { jokes: JokesState } }
>("jokes/refreshJokeThunk", async (id, { rejectWithValue, getState }) => {
  try {
    const {
      jokes: { data: stateData },
    } = getState();

    const response = await getJokeRandomApi();

    const { data: responseData } = response;

    let result = { ...responseData };

    const recursionRefreshJokes = async (
      resData: IJokes
    ): Promise<IJokes | undefined> => {
      const checkForUniqueness = checkForSameValue(stateData, [resData], "id");

      if (checkForUniqueness.length) {
        const response = await getJokeRandomApi();

        result = { ...response.data };

        console.log("жарт не оновлений, отримані дані не унікальні");

        return await recursionRefreshJokes(response.data);
      }
    };

    await recursionRefreshJokes(responseData);

    return { id, data: result };
  } catch (error) {
    const err = error as AxiosError<{ message: string; type: string }>;

    return rejectWithValue(
      err?.response?.data?.message || err?.message || String(err)
    );
  }
});
