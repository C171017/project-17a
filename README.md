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
- **Demand Curve**: P = 10 - 1.2Q (Price vs Quantity)
- **Supply Curve**: Wage = Q (Linear relationship)
- **Trading System**: Automatic conversion between resources
- **Cost Structure**: Linear cost progression for Fuckers (1+2+3+...+n)

### Interactive Features
- **Manual Production**: Click button to create babies (with cooldown)
- **Automated Production**: Fuckers automatically produce babies
- **Resource Management**: Visual representation of sperm distribution
- **Timer Controls**: Adjustable speed and pause functionality
- **Graph Visualization**: Basic coordinate system for future supply/demand curves

## 🎮 Game Controls

### Manual Controls
- **Fuck Button**: Manual baby production (1-second cooldown)
- **Reset Button**: Reset all game values to initial state
- **Pause/Resume**: Control automated systems
- **Timer Slider**: Adjust game speed (100ms - 5000ms)

### Graph Visualization
- **Coordinate System**: X and Y axes intersecting at bottom-left corner
- **Responsive Design**: Scales proportionally with grid cell size
- **SVG Rendering**: Built with D3.js for future interactive features

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
- Current price

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
2. **Automated Production**: Fuckers consume Producer Sperm to create babies
3. **Trading System**: Automatic conversion of Consumer Sperm + Babies → Producer Sperm
4. **Economic Modeling**: Supply/demand curves determine optimal production levels
5. **Resource Visualization**: Square component shows sperm distribution
6. **Real-time Updates**: All systems update based on timer interval

## 🎯 Current Development Status

The game is in active development with focus on:
- Economic concept integration
- Basic graph visualization foundation (axes implemented)
- Automated production systems
- Resource management mechanics

## 🚧 Known Issues & Future Work

- Interactive supply/demand curves not yet implemented
- Price and quantity controls need to be added to graph
- Additional economic concepts to be integrated
- Enhanced UI/UX improvements
- More complex trading mechanics

## 📝 License

This project is private and for educational purposes.

---

*Inspired by "A Dark Room" - A text-based adventure game with resource management elements.*