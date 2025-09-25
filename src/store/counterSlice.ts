import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  fuckCount: number;
  currencyCount: number;
  squareValue: number;
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
  currencyCount: (() => {
    try {
      const savedCount = localStorage.getItem('currencyCount');
      return savedCount ? parseInt(savedCount, 10) : 0;
    } catch (error) {
      console.log('Error loading currency count from localStorage:', error);
      return 0;
    }
  })(),
  squareValue: (() => {
    try {
      const savedValue = localStorage.getItem('squareValue');
      return savedValue ? parseInt(savedValue, 10) : 25;
    } catch (error) {
      console.log('Error loading square value from localStorage:', error);
      return 25;
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
    incrementCurrencyCount: (state) => {
      state.currencyCount += 1;
      try {
        localStorage.setItem('currencyCount', state.currencyCount.toString());
      } catch (error) {
        console.log('Error saving currency count to localStorage:', error);
      }
    },
    setCurrencyCount: (state, action: PayloadAction<number>) => {
      state.currencyCount = action.payload;
      try {
        localStorage.setItem('currencyCount', state.currencyCount.toString());
      } catch (error) {
        console.log('Error saving currency count to localStorage:', error);
      }
    },
    incrementSquareValue: (state) => {
      state.squareValue += 1;
      try {
        localStorage.setItem('squareValue', state.squareValue.toString());
      } catch (error) {
        console.log('Error saving square value to localStorage:', error);
      }
    },
    setSquareValue: (state, action: PayloadAction<number>) => {
      state.squareValue = action.payload;
      try {
        localStorage.setItem('squareValue', state.squareValue.toString());
      } catch (error) {
        console.log('Error saving square value to localStorage:', error);
      }
    },
  },
});

export const { 
  incrementFuckCount, 
  setFuckCount, 
  incrementCurrencyCount, 
  setCurrencyCount,
  incrementSquareValue,
  setSquareValue
} = counterSlice.actions;
export default counterSlice.reducer;