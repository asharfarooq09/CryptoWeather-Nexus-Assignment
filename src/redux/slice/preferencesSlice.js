import { createSlice } from "@reduxjs/toolkit";

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    favoriteCities: [],
    favoriteCryptos: [],
    favorites: [],
  },
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter((c) => c !== city);
        state.favorites = state.favorites.filter(
          (f) => !(f.id === city && f.type === "weather")
        );
      } else {
        state.favoriteCities.push(city);
        state.favorites.push({
          id: city,
          type: "weather",
          timestamp: Date.now(),
        });
      }
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      if (state.favoriteCryptos.includes(crypto)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(
          (c) => c !== crypto
        );
        state.favorites = state.favorites.filter(
          (f) => !(f.id === crypto && f.type === "crypto")
        );
      } else {
        state.favoriteCryptos.push(crypto);
        state.favorites.push({
          id: crypto,
          type: "crypto",
          timestamp: Date.now(),
        });
      }
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
