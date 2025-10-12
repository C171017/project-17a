import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  babyCount: number;
  fuckerCount: number;
  consumerSperm: number;
  producerSperm: number;
}

const initialState: CounterState = {
  babyCount: (() => {
    try {
      const savedCount = localStorage.getItem('babyCount');
      return savedCount ? parseInt(savedCount, 10) : 0;
    } catch (error) {
      console.log('Error loading count from localStorage:', error);
      return 0;
    }
  })(),
  fuckerCount: (() => {
    try {
      const savedCount = localStorage.getItem('fuckerCount');
      return savedCount ? parseInt(savedCount, 10) : 0;
    } catch (error) {
      console.log('Error loading fucker count from localStorage:', error);
      return 0;
    }
  })(),
  consumerSperm: (() => {
    try {
      const savedValue = localStorage.getItem('consumerSperm');
      return savedValue ? parseInt(savedValue, 10) : 10;
    } catch (error) {
      console.log('Error loading consumer sperm from localStorage:', error);
      return 10;
    }
  })(),
  producerSperm: (() => {
    try {
      const savedValue = localStorage.getItem('producerSperm');
      return savedValue ? parseInt(savedValue, 10) : 15;
    } catch (error) {
      console.log('Error loading producer sperm from localStorage:', error);
      return 15;
    }
  })(),
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementBabyCount: (state) => {
      state.babyCount += 1;
      // Save to localStorage whenever the count changes
      try {
        localStorage.setItem('babyCount', state.babyCount.toString());
      } catch (error) {
        console.log('Error saving count to localStorage:', error);
      }
    },
    setBabyCount: (state, action: PayloadAction<number>) => {
      state.babyCount = Math.floor(Math.max(0, action.payload));
      try {
        localStorage.setItem('babyCount', state.babyCount.toString());
      } catch (error) {
        console.log('Error saving count to localStorage:', error);
      }
    },
    addFucker: (state) => {
      state.fuckerCount += 1;
      try {
        localStorage.setItem('fuckerCount', state.fuckerCount.toString());
      } catch (error) {
        console.log('Error saving fucker count to localStorage:', error);
      }
    },
    removeFucker: (state) => {
      state.fuckerCount = Math.max(0, state.fuckerCount - 1);
      try {
        localStorage.setItem('fuckerCount', state.fuckerCount.toString());
      } catch (error) {
        console.log('Error saving fucker count to localStorage:', error);
      }
    },
    setFuckerCount: (state, action: PayloadAction<number>) => {
      state.fuckerCount = Math.floor(Math.max(0, action.payload));
      try {
        localStorage.setItem('fuckerCount', state.fuckerCount.toString());
      } catch (error) {
        console.log('Error saving fucker count to localStorage:', error);
      }
    },
    incrementConsumerSperm: (state) => {
      state.consumerSperm += 1;
      try {
        localStorage.setItem('consumerSperm', state.consumerSperm.toString());
      } catch (error) {
        console.log('Error saving consumer sperm to localStorage:', error);
      }
    },
    setConsumerSperm: (state, action: PayloadAction<number>) => {
      state.consumerSperm = Math.floor(Math.max(0, action.payload));
      try {
        localStorage.setItem('consumerSperm', state.consumerSperm.toString());
      } catch (error) {
        console.log('Error saving consumer sperm to localStorage:', error);
      }
    },
    incrementProducerSperm: (state) => {
      state.producerSperm += 1;
      try {
        localStorage.setItem('producerSperm', state.producerSperm.toString());
      } catch (error) {
        console.log('Error saving producer sperm to localStorage:', error);
      }
    },
    setProducerSperm: (state, action: PayloadAction<number>) => {
      state.producerSperm = Math.floor(Math.max(0, action.payload));
      try {
        localStorage.setItem('producerSperm', state.producerSperm.toString());
      } catch (error) {
        console.log('Error saving producer sperm to localStorage:', error);
      }
    },
    resetAllValues: (state) => {
      state.babyCount = 0;
      state.fuckerCount = 0;
      state.consumerSperm = 10;
      state.producerSperm = 15;
      try {
        localStorage.setItem('babyCount', '0');
        localStorage.setItem('fuckerCount', '0');
        localStorage.setItem('consumerSperm', '10');
        localStorage.setItem('producerSperm', '15');
      } catch (error) {
        console.log('Error saving reset values to localStorage:', error);
      }
    },
  },
});

export const { 
  incrementBabyCount, 
  setBabyCount, 
  addFucker,
  removeFucker,
  setFuckerCount,
  incrementConsumerSperm,
  setConsumerSperm,
  incrementProducerSperm,
  setProducerSperm,
  resetAllValues
} = counterSlice.actions;
export default counterSlice.reducer;