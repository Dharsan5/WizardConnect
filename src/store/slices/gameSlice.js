import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDuel: null,
  duelHistory: [],
  leaderboard: [],
  activeChallenge: null,
  tournaments: [],
  houses: {
    gryffindor: { points: 0, members: [] },
    hufflepuff: { points: 0, members: [] },
    ravenclaw: { points: 0, members: [] },
    slytherin: { points: 0, members: [] }
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startDuel: (state, action) => {
      state.currentDuel = action.payload;
    },
    endDuel: (state, action) => {
      state.duelHistory.push(action.payload);
      state.currentDuel = null;
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
    setActiveChallenge: (state, action) => {
      state.activeChallenge = action.payload;
    },
    updateHousePoints: (state, action) => {
      const { house, points } = action.payload;
      state.houses[house].points += points;
    },
    addTournament: (state, action) => {
      state.tournaments.push(action.payload);
    },
    addPoints: (state, action) => {
      const { userId, points } = action.payload;
      // This would normally update user points in the user slice
      // For now, just track the action
      console.log(`Adding ${points} points to user ${userId}`);
    }
  }
});

export const { 
  startDuel, 
  endDuel, 
  updateLeaderboard, 
  setActiveChallenge, 
  updateHousePoints,
  addTournament,
  addPoints 
} = gameSlice.actions;

export default gameSlice.reducer;
