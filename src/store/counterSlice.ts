import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  fuckCount: number;
}

const initialState: CounterState = {
  fuckCount: (() => {
    try {
      const savedCount = localStorage.getItem('fuckCount');
      return savedCount ? parseInt(savedCount, 10) : 0;
    } catch (error) {
      console.log('Error loading count from localStorage:', error);
      return 0;
    }
  })(),
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementFuckCount: (state) => {
      state.fuckCount += 1;
      // Save to localStorage whenever the count changes
      try {
        localStorage.setItem('fuckCount', state.fuckCount.toString());
      } catch (error) {
        console.log('Error saving count to localStorage:', error);
      }
    },
    setFuckCount: (state, action: PayloadAction<number>) => {
      state.fuckCount = action.payload;
      try {
        localStorage.setItem('fuckCount', state.fuckCount.toString());
      } catch (error) {
        console.log('Error saving count to localStorage:', error);
      }
    },
  },
});

export const { incrementFuckCount, setFuckCount } = counterSlice.actions;
export default counterSlice.reducer;
