import { createSlice } from '@reduxjs/toolkit';

const structureSlice = createSlice({
  name: 'structure',
  initialState: {
    structureData: [] as any[],
    cloneStructure: [] as any[],
    status: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: null
  },
  reducers: {
    updateStructureData(state,action){
      state.structureData = action.payload
    },
    setStructureData(state, action){
      
      state.structureData.push(action.payload) 
      state.cloneStructure.push(action.payload)
    },
  },
});

export default structureSlice.reducer;
export const {setStructureData,updateStructureData } = structureSlice.actions;
