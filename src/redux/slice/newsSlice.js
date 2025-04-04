import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../../utils/api';

export const getNews = createAsyncThunk('news/getNews', async () => {
  return await fetchNews();
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    error: null,
    hasFetched: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.hasFetched = true;
        state.error = null;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
        state.hasFetched = true;
      });
  },
});

export default newsSlice.reducer;
