import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPath: null,
  recommendations: [],
  completedQuests: [],
  activeQuests: [],
  resources: [],
  progress: {},
  mentors: [],
  studyGroups: [],
  arModules: []
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    updateRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    completeQuest: (state, action) => {
      const questId = action.payload;
      const activeIndex = state.activeQuests.findIndex(q => q.id === questId);
      if (activeIndex !== -1) {
        const completedQuest = state.activeQuests[activeIndex];
        state.completedQuests.push(completedQuest);
        state.activeQuests.splice(activeIndex, 1);
      }
    },
    addActiveQuest: (state, action) => {
      state.activeQuests.push(action.payload);
    },
    updateProgress: (state, action) => {
      const { questId, progress } = action.payload;
      state.progress[questId] = progress;
    },
    addResource: (state, action) => {
      state.resources.push(action.payload);
    },
    addMentor: (state, action) => {
      state.mentors.push(action.payload);
    },
    joinStudyGroup: (state, action) => {
      state.studyGroups.push(action.payload);
    },
    addArModule: (state, action) => {
      state.arModules.push(action.payload);
    }
  }
});

export const { 
  setCurrentPath, 
  updateRecommendations, 
  completeQuest, 
  addActiveQuest, 
  updateProgress, 
  addResource,
  addMentor,
  joinStudyGroup,
  addArModule
} = learningSlice.actions;

export default learningSlice.reducer;
