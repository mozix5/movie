import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../../../utils/api";

const InitialState = {
  data: {},
  loading: false,
  error: {},
};

export const fetchMovieById = createAsyncThunk(
  "movieById/fetch",
  async ({ id}, { rejectWithValue }) => {
    try {
      const response = await GET({id});
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchMovieByIdSlice = createSlice({
  name: "movieById",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown Error";
      });
  },
});

export default fetchMovieByIdSlice.reducer;
