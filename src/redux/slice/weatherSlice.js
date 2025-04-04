import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWeather } from '../../utils/api'

export const getWeather = createAsyncThunk('weather/getWeather', async (city) => {
  return await fetchWeather(city)
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: {}, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.data[action.meta.arg] = action.payload
        state.loading = false
      })
      .addCase(getWeather.rejected, (state) => {
        state.loading = false
      })
  }
})

export default weatherSlice.reducer