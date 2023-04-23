import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helper/axios";
import { requests } from "../../helper/requests";
const initialState = {
  popularMovies: {
    status: "idle",
    error: null,
    data: null,
  },
  topRatedMovies: {
    status: "idle",
    error: null,
    data: null,
  },
};

export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopularMovies",
  async (type) => {
    const response = await axios.get(requests.getPopular(type));
    return response.data;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movie/fetchTopRatedMovies",
  async (type) => {
    const response = await axios.get(requests.getTopRated(type));
    return response.data;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popularMovies.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies.status = "success";
        state.popularMovies.data = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popularMovies.status = "failed";
        state.popularMovies.error = action.error.message;
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRatedMovies.status = "loading";
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies.status = "success";
        state.topRatedMovies.data = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRatedMovies.status = "failed";
        state.topRatedMovies.error = action.error.message;
      });
  },
});

export const selectPopularMovies = (state) => state.movie.popularMovies;
export const selectTopRatedMovies = (state) => state.movie.topRatedMovies;

export default movieSlice.reducer;
