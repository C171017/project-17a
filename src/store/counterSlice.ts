import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  babyCount: number;
  fuckerCount: number;
  consumerSperm: number;
  producerSperm: number;
  universalTimerInterval: number;
  isPaused: boolean;
  currentPrice: number;
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
      return savedValue ? parseInt(savedValue, 10) : 1000;
    } catch (error) {
      console.log('Error loading consumer sperm from localStorage:', error);
      return 1000;
    }
  })(),
  producerSperm: (() => {
    try {
      const savedValue = localStorage.getItem('producerSperm');
      return savedValue ? parseInt(savedValue, 10) : 0;
    } catch (error) {
      console.log('Error loading producer sperm from localStorage:', error);
      return 0;
    }
  })(),
  universalTimerInterval: (() => {
    try {
      const savedValue = localStorage.getItem('universalTimerInterval');
      return savedValue ? parseInt(savedValue, 10) : 1000;
    } catch (error) {
      console.log('Error loading universal timer interval from localStorage:', error);
      return 1000;
    }
  })(),
  isPaused: (() => {
    try {
      const savedValue = localStorage.getItem('isPaused');
      return savedValue ? JSON.parse(savedValue) : false;
    } catch (error) {
      console.log('Error loading isPaused from localStorage:', error);
      return false;
    }
  })(),
  currentPrice: (() => {
    try {
      const savedValue = localStorage.getItem('currentPrice');
      return savedValue ? parseInt(savedValue, 10) : 5;
    } catch (error) {
      console.log('Error loading currentPrice from localStorage:', error);
      return 5;
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
    setFuckerCount: (state, action: PayloadAction<number>) => {
      state.fuckerCount = Math.floor(Math.max(0, Math.min(10, action.payload)));
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
    setUniversalTimerInterval: (state, action: PayloadAction<number>) => {
      state.universalTimerInterval = Math.max(100, Math.min(5000, action.payload));
      try {
        localStorage.setItem('universalTimerInterval', state.universalTimerInterval.toString());
      } catch (error) {
        console.log('Error saving universal timer interval to localStorage:', error);
      }
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
      try {
        localStorage.setItem('isPaused', JSON.stringify(state.isPaused));
      } catch (error) {
        console.log('Error saving isPaused to localStorage:', error);
      }
    },
    setCurrentPrice: (state, action: PayloadAction<number>) => {
      state.currentPrice = Math.max(0, Math.min(10, Math.round(action.payload)));
      try {
        localStorage.setItem('currentPrice', state.currentPrice.toString());
      } catch (error) {
        console.log('Error saving currentPrice to localStorage:', error);
      }
    },
    resetAllValues: (state) => {
      state.babyCount = 0;
      state.fuckerCount = 0;
      state.consumerSperm = 1000;
      state.producerSperm = 0;
      state.universalTimerInterval = 1000;
      state.isPaused = false;
      state.currentPrice = 5;
      try {
        localStorage.setItem('babyCount', '0');
        localStorage.setItem('fuckerCount', '0');
        localStorage.setItem('consumerSperm', '1000');
        localStorage.setItem('producerSperm', '0');
        localStorage.setItem('universalTimerInterval', '1000');
        localStorage.setItem('isPaused', 'false');
        localStorage.setItem('currentPrice', '5');
      } catch (error) {
        console.log('Error saving reset values to localStorage:', error);
      }
    },
  },
});

export const { 
  incrementBabyCount, 
  setBabyCount, 
  setFuckerCount,
  incrementConsumerSperm,
  setConsumerSperm,
  incrementProducerSperm,
  setProducerSperm,
  setUniversalTimerInterval,
  setIsPaused,
  setCurrentPrice,
  resetAllValues
} = counterSlice.actions;
export default counterSlice.reducer;