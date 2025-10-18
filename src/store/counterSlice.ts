import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Default demand curve parameters: y = DEFAULT_DEMAND_SLOPE * x + DEFAULT_DEMAND_INTERCEPT
const DEFAULT_DEMAND_SLOPE = -1;
const DEFAULT_DEMAND_INTERCEPT = 10;

interface CounterState {
  babyCount: number;
  fuckerCount: number;
  consumerSperm: number;
  producerSperm: number;
  universalTimerInterval: number;
  isPaused: boolean;
  tradeYChoice: number;
  productionXChoice: number;
  // Demand curve parameters: y = demandSlope * x + demandIntercept
  demandSlope: number;
  demandIntercept: number;
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
  tradeYChoice: (() => {
    try {
      const savedValue = localStorage.getItem('tradeYChoice');
      return savedValue ? parseInt(savedValue, 10) : DEFAULT_DEMAND_INTERCEPT; // Default to demand curve y-intercept
    } catch (error) {
      console.log('Error loading tradeYChoice from localStorage:', error);
      return DEFAULT_DEMAND_INTERCEPT; // Default to demand curve y-intercept
    }
  })(),
  productionXChoice: (() => {
    try {
      const savedValue = localStorage.getItem('productionXChoice');
      return savedValue ? parseInt(savedValue, 10) : 0; // Default to 0
    } catch (error) {
      console.log('Error loading productionXChoice from localStorage:', error);
      return 0; // Default to 0
    }
  })(),
  demandSlope: (() => {
    try {
      const savedValue = localStorage.getItem('demandSlope');
      return savedValue ? parseFloat(savedValue) : DEFAULT_DEMAND_SLOPE;
    } catch (error) {
      console.log('Error loading demandSlope from localStorage:', error);
      return DEFAULT_DEMAND_SLOPE;
    }
  })(),
  demandIntercept: (() => {
    try {
      const savedValue = localStorage.getItem('demandIntercept');
      return savedValue ? parseFloat(savedValue) : DEFAULT_DEMAND_INTERCEPT;
    } catch (error) {
      console.log('Error loading demandIntercept from localStorage:', error);
      return DEFAULT_DEMAND_INTERCEPT;
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
    setTradeYChoice: (state, action: PayloadAction<number>) => {
      // Clamp to [0, demandIntercept] and floor to integer
      const maxY = Math.max(0, state.demandIntercept);
      state.tradeYChoice = Math.floor(Math.max(0, Math.min(maxY, action.payload)));
      try {
        localStorage.setItem('tradeYChoice', state.tradeYChoice.toString());
      } catch (error) {
        console.log('Error saving tradeYChoice to localStorage:', error);
      }
    },
    setProductionXChoice: (state, action: PayloadAction<number>) => {
      // Calculate demand curve x-intercept: solve 0 = demandSlope * x + demandIntercept
      const xIntercept = state.demandSlope !== 0 ? -state.demandIntercept / state.demandSlope : Number.POSITIVE_INFINITY;
      const maxX = Number.isFinite(xIntercept) && xIntercept > 0 ? xIntercept : 1;
      
      // Clamp to [0, xIntercept] and floor to integer
      state.productionXChoice = Math.floor(Math.max(0, Math.min(maxX, action.payload)));
      try {
        localStorage.setItem('productionXChoice', state.productionXChoice.toString());
      } catch (error) {
        console.log('Error saving productionXChoice to localStorage:', error);
      }
    },
    setDemandSlope: (state, action: PayloadAction<number>) => {
      state.demandSlope = action.payload;
      try {
        localStorage.setItem('demandSlope', state.demandSlope.toString());
      } catch (error) {
        console.log('Error saving demandSlope to localStorage:', error);
      }
    },
    setDemandIntercept: (state, action: PayloadAction<number>) => {
      state.demandIntercept = action.payload;
      try {
        localStorage.setItem('demandIntercept', state.demandIntercept.toString());
      } catch (error) {
        console.log('Error saving demandIntercept to localStorage:', error);
      }
    },
    executeTrade: (state) => {
      const yStar = state.tradeYChoice;
      
      if (yStar <= 0) {
        return; // No trade if y* is 0 or negative
      }
      
      // Solve demand curve y = demandSlope * x + demandIntercept for x
      // x = (y - demandIntercept) / demandSlope
      // x@ = number of babies required for trade
      const xAt = state.demandSlope !== 0 ? (yStar - state.demandIntercept) / state.demandSlope : 0;
      // rectArea = transaction amount (baby price × number of babies)
      // Round to nearest integer to handle potential non-integer results from future function changes
      const rectArea = Math.round(yStar * xAt);
      
      // Validate: babyCount >= xAt AND consumerSperm >= rectArea
      if (state.babyCount >= xAt && state.consumerSperm >= rectArea) {
        state.babyCount -= xAt;  // Consume babies
        state.consumerSperm -= rectArea;  // Consume consumer sperm (transaction amount)
        state.producerSperm += rectArea;  // Gain producer sperm (transaction amount)
        
        // Save updated values to localStorage
        try {
          localStorage.setItem('babyCount', state.babyCount.toString());
          localStorage.setItem('consumerSperm', state.consumerSperm.toString());
          localStorage.setItem('producerSperm', state.producerSperm.toString());
        } catch (error) {
          console.log('Error saving trade values to localStorage:', error);
        }
      }
      // If validation fails, skip trade (no state change)
    },
    executeProduction: (state) => {
      const xProd = state.productionXChoice;
      
      if (xProd <= 0) {
        return; // No production if x is 0 or negative
      }
      
      // Calculate triangle area: (base × height) / 2 = (x_prod × x_prod) / 2
      // Triangle vertices: Origin (0,0), control dot (x_prod, 0), supply intersection (x_prod, x_prod)
      const triangleArea = (xProd * xProd) / 2;
      const spermTransfer = Math.round(triangleArea);
      
      // Validate: producerSperm >= spermTransfer
      if (state.producerSperm >= spermTransfer) {
        state.babyCount += xProd;  // Add babies (1 baby per fucker)
        state.producerSperm -= spermTransfer;  // Consume producer sperm
        state.consumerSperm += spermTransfer;  // Gain consumer sperm
        
        // Save updated values to localStorage
        try {
          localStorage.setItem('babyCount', state.babyCount.toString());
          localStorage.setItem('producerSperm', state.producerSperm.toString());
          localStorage.setItem('consumerSperm', state.consumerSperm.toString());
        } catch (error) {
          console.log('Error saving production values to localStorage:', error);
        }
      }
      // If validation fails, skip production (no state change)
    },
    resetAllValues: (state) => {
      state.babyCount = 0;
      state.fuckerCount = 0;
      state.consumerSperm = 1000;
      state.producerSperm = 0;
      state.universalTimerInterval = 1000;
      state.isPaused = false;
      state.tradeYChoice = state.demandIntercept; // Reset to demand curve y-intercept
      state.productionXChoice = 0; // Reset to 0
      try {
        localStorage.setItem('babyCount', '0');
        localStorage.setItem('fuckerCount', '0');
        localStorage.setItem('consumerSperm', '1000');
        localStorage.setItem('producerSperm', '0');
        localStorage.setItem('universalTimerInterval', '1000');
        localStorage.setItem('isPaused', 'false');
        localStorage.setItem('tradeYChoice', state.demandIntercept.toString());
        localStorage.setItem('productionXChoice', '0');
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
  setTradeYChoice,
  setProductionXChoice,
  setDemandSlope,
  setDemandIntercept,
  executeTrade,
  executeProduction,
  resetAllValues
} = counterSlice.actions;
export default counterSlice.reducer;