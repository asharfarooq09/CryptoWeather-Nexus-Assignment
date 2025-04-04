import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slice/weatherSlice';
import cryptoReducer from './slice/cryptoSlice';
import newsReducer from './slice/newsSlice';
import preferencesReducer from './slice/preferencesSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    preferences:preferencesReducer,
  },
});
