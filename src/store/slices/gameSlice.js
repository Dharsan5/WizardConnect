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
    }
  }
});

export const { 
  startDuel, 
  endDuel, 
  updateLeaderboard, 
  setActiveChallenge, 
  updateHousePoints,
  addTournament 
} = gameSlice.actions;

export default gameSlice.reducer;
