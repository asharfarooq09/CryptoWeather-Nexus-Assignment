import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCryptos } from '../../utils/api'

export const getCryptos = createAsyncThunk('crypto/getCryptos', async () => {
  return await fetchCryptos()
})

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    loading: false,
    prices: {},
    hasFetched: false,
  },
  reducers: {
    updateLivePrice: (state, action) => {
      state.prices = { ...state.prices, ...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptos.pending, (state) => {
        state.loading = true
      })
      .addCase(getCryptos.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.hasFetched = true;
      })
      .addCase(getCryptos.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { updateLivePrice } = cryptoSlice.actions
export default cryptoSlice.reducer