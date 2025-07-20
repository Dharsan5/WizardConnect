import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  house: null,
  points: 0,
  level: 1,
  experience: 0,
  achievements: [],
  isAuthenticated: false,
  preferences: {
    learningStyle: null,
    interests: [],
    difficulty: 'intermediate'
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
    setHouse: (state, action) => {
      state.house = action.payload;
    },
    addPoints: (state, action) => {
      state.points += action.payload;
      // Level up logic
      if (state.points >= state.level * 100) {
        state.level += 1;
        state.experience = 0;
      }
    },
    addExperience: (state, action) => {
      state.experience += action.payload;
    },
    addAchievement: (state, action) => {
      state.achievements.push(action.payload);
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    logout: (state) => {
      return initialState;
    }
  }
});

export const { 
  setUser, 
  setHouse, 
  addPoints, 
  addExperience, 
  addAchievement, 
  updatePreferences, 
  logout 
} = userSlice.actions;

export default userSlice.reducer;
