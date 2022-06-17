import {createSlice} from '@reduxjs/toolkit';

export const coordSlice = createSlice({
  name: 'Coords',
  initialState: {
    positions: [],
  },
  reducers: {
    addPositions: (state, action) => {
      state.positions.push(action.payload);
      return state;
    },
  },
});

export const {addPositions} = coordSlice.actions;
export default coordSlice.reducer;
