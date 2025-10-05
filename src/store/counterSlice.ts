import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  fuckCount: number;
  currencyCount: number;
  consumerSperm: number;
  producerSperm: number;
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
      state.fuckCount = Math.floor(Math.max(0, action.payload));
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
      state.currencyCount = Math.floor(Math.max(0, action.payload));
      try {
        localStorage.setItem('currencyCount', state.currencyCount.toString());
      } catch (error) {
        console.log('Error saving currency count to localStorage:', error);
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
  },
});

export const { 
  incrementFuckCount, 
  setFuckCount, 
  incrementCurrencyCount, 
  setCurrencyCount,
  incrementConsumerSperm,
  setConsumerSperm,
  incrementProducerSperm,
  setProducerSperm
} = counterSlice.actions;
export default counterSlice.reducer;