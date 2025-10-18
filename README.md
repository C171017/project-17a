# Project 17A - Economic Simulation Game

A web-based economic simulation game inspired by "A Dark Room" that incorporates basic economic concepts into an interactive stats system. Built with React, TypeScript, Redux Toolkit, and D3.js.

## 🎮 Game Overview

This is an economic simulation where players manage resources and production through an interactive interface. The game features automated systems, manual controls, and real-time economic modeling with supply and demand curves.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **State Management**: Redux Toolkit with React-Redux
- **Data Visualization**: D3.js v7.9.0
- **Build Tool**: Vite 7.0.4
- **Styling**: CSS Grid with custom CSS modules
- **Development**: ESLint, TypeScript ESLint

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Button.tsx       # Manual baby production button
│   ├── Environment.tsx  # Game environment display
│   ├── Graph.tsx        # Interactive supply/demand visualization
│   ├── Library.tsx      # Resource display panel
│   ├── ResetButton.tsx  # Game reset functionality
│   ├── Square.tsx       # Visual sperm resource representation
│   ├── Text.tsx         # Event/status text display
│   └── UniversalTimerControls.tsx # Timer and pause controls
├── store/               # Redux store configuration
│   ├── counterSlice.ts  # Main game state and actions
│   ├── hooks.ts         # Typed Redux hooks
│   └── index.ts         # Store configuration
├── assets/              # Static assets
└── main.tsx            # Application entry point

css/                    # Styling files
├── app.css            # Main layout and grid system
├── button.css         # Button component styles
├── environment.css    # Environment section styles
├── graph.css          # Graph visualization styles
├── library.css        # Library panel styles
├── square.css         # Square component styles
└── text.css           # Text display styles
```

## 🎯 Core Game Mechanics

### Resource System
- **Consumer Sperm**: Starting resource (1000 units)
- **Producer Sperm**: Generated through trading
- **Babies**: Produced through manual clicking or automated systems
- **Fuckers**: Automated production units (0-10 max)

### Economic Model
- **Demand Curve**: y = -x + 10 (Price vs Quantity)
- **Supply Curve**: y = x (Linear relationship)
- **Interactive Trading**: Y-axis slider for baby price selection
- **Trade Mechanics**: Exchange babies for producer sperm based on economic principles
- **Production Mechanism**: X-axis slider for worker hiring with triangle-area calculations
- **Production Cost**: Triangle area = (x_prod × x_prod) / 2 sperm transfer
- **Graph Visualization**: Dynamic supply/demand curves with interactive trade and production controls

### Interactive Features
- **Manual Production**: Click button to create babies (with cooldown)
- **Automated Production**: X-axis slider controls worker hiring with triangle-area calculations
- **Interactive Trading**: Drag y-axis slider to set baby prices and execute trades
- **Production Control**: Drag x-axis slider to hire workers and execute production
- **Smart Default Position**: Trade slider starts at demand curve's y-intercept (maximum price)
- **Resource Management**: Visual representation of sperm distribution
- **Timer Controls**: Adjustable speed and pause functionality

## 🎮 Game Controls

### Manual Controls
- **Fuck Button**: Manual baby production (1-second cooldown)
- **Reset Button**: Reset all game values to initial state
- **Pause/Resume**: Control automated systems
- **Timer Slider**: Adjust game speed (100ms - 5000ms)

### Graph Visualization
- **Dynamic Supply/Demand Curves**: Real-time rendering of economic relationships
- **Interactive Trade Controls**: Draggable y-axis slider for baby price selection
- **Interactive Production Controls**: Draggable x-axis slider for worker hiring
- **Smart Default Position**: Trade slider starts at demand curve's y-intercept (maximum price)
- **Visual Trade Guides**: Real-time horizontal and vertical guides showing trade geometry
- **Visual Production Guides**: Real-time vertical guides showing triangle area calculations
- **First Quadrant Focus**: All curves displayed for positive economic values only
- **Responsive Scaling**: Automatically adjusts to container size with dynamic tick generation
- **Positioning Rules**: Demand intercepts positioned at 10% from top/right edges
- **Shared Scales**: Consistent units across both curves for accurate comparison
- **Interactive Design**: Built with D3.js for Redux-driven parameter updates

## 🔧 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 💾 Data Persistence

The game automatically saves progress to localStorage:
- Baby count
- Fucker count
- Consumer/Producer sperm
- Timer settings
- Pause state
- Trade price choice
- Production worker count

## 🎨 UI Layout

The interface uses a CSS Grid layout with 5 columns and 2 rows:

```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│  Text   │Environment│Library │ Square │  Graph  │
├─────────┼─────────┼─────────┼─────────┼─────────┤
│ Reset   │Controls │         │         │         │
│ Timer   │ Button  │         │         │         │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

## 🔄 Game Loop

1. **Manual Production**: Player clicks "Fuck" button to create babies
2. **Interactive Trading**: Player sets baby prices via y-axis slider
3. **Trade Execution**: Automatic exchange of babies for producer sperm based on economic principles
4. **Interactive Production**: Player sets worker hiring via x-axis slider
5. **Production Execution**: Automatic worker hiring with triangle-area sperm transfer calculations
6. **Economic Modeling**: Supply/demand curves determine optimal production and trading levels
7. **Resource Visualization**: Square component shows sperm distribution
8. **Real-time Updates**: All systems update based on timer interval

## 🎯 Current Development Status

The game features a complete economic simulation with:
- **Dynamic Graph Visualization**: Fully implemented supply/demand curves with responsive scaling
- **Interactive Trade Mechanism**: Y-axis slider for baby price selection with automatic execution
- **Interactive Production Mechanism**: X-axis slider for worker hiring with triangle-area calculations
- **Economic Modeling**: Real-time curve rendering with mathematical accuracy
- **Automated Production Systems**: Worker hiring with triangle-area sperm transfer mechanics
- **Resource Management**: Visual sperm distribution and trading mechanics
- **Interactive Controls**: Manual production, timer controls, and reset functionality

## 🚧 Known Issues & Future Work

- **Enhanced Economic Concepts**: Integrate more complex economic models and market dynamics
- **UI/UX Improvements**: Enhanced visual feedback and user interaction patterns
- **Advanced Trading Mechanics**: More sophisticated resource conversion and market simulation
- **Performance Optimizations**: Further improvements to rendering and state management
- **Production Efficiency**: Variable productivity per worker or advanced production curves

## 📚 Documentation

### Trade Mechanism
- **Full Documentation**: `MD documents/trade-mechanism.md`
- **Concise Reference**: `(Concise for AI)MD documents/trade-mechanism-concise.md`

### Production Mechanism
- **Full Documentation**: `MD documents/production-mechanism.md`
- **Concise Reference**: `(Concise for AI)MD documents/production-mechanism-concise.md`

### Graph Implementation
- **Concise Reference**: `(Concise for AI)MD documents/graphconcise.md`

## 📝 License

This project is private and for educational purposes.

---

*Inspired by "A Dark Room" - A text-based adventure game with resource management elements.*