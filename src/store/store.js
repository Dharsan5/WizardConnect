import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import gameReducer from './slices/gameSlice';
import learningReducer from './slices/learningSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    learning: learningReducer,
  },
});
