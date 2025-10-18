# Trade Mechanism Implementation

## Overview

The trade mechanism allows players to exchange babies for producer sperm through an interactive y-axis slider on the supply/demand graph. Players can set a baby price and automatically execute trades based on economic principles.

## Core Concepts

### Economic Model
- **Y-axis**: Baby price (consumer sperm per baby)
- **X-axis**: Number of babies
- **Demand Curve**: `y = -x + 10` (price decreases as quantity increases)
- **Supply Curve**: `y = x` (price equals quantity)

### Trade Mechanics
- **yStar**: Baby price selected by player (0-10 consumer sperm per baby)
- **xAt**: Number of babies required for trade (`xAt = 10 - yStar`)
- **Transaction Amount**: `rectArea = yStar × xAt` (total consumer sperm needed)

## User Interface

### Interactive Controls
- **Draggable Dot**: Blue dot on y-axis that players can drag up/down
- **Click to Set**: Click anywhere on y-axis to instantly set baby price
- **Smart Default**: Starts at demand curve's y-intercept (maximum price = 10)
- **Visual Feedback**: Dot grows larger when hovering or dragging
- **Preview Mode**: Dot moves during drag without affecting game state until release

### Visual Guides
When baby price > 0, two guide lines appear:
- **Horizontal Guide**: Shows the selected baby price level
- **Vertical Guide**: Shows the number of babies required for trade
- **Rectangle Area**: Represents the total transaction amount

## Trade Execution

### Validation Requirements
Trades only execute when both conditions are met:
1. `babyCount >= xAt` (sufficient babies for trade)
2. `consumerSperm >= rectArea` (sufficient consumer sperm for transaction)

### Resource Changes
When trade executes:
- **Babies**: `babyCount -= xAt` (consume babies)
- **Consumer Sperm**: `consumerSperm -= rectArea` (consume transaction amount)
- **Producer Sperm**: `producerSperm += rectArea` (gain transaction amount)

### Automatic Execution
- Trades execute automatically on each universal timer tick
- Respects pause state (no trades when paused)
- Detailed console logging for debugging

## Technical Implementation

### Redux State
- `tradeYChoice`: Current baby price (0-10, integer, default 10)
- Persisted to localStorage
- Clamped and validated on updates
- Resets to demand curve y-intercept (10) on game reset

### Graph Component
- D3.js drag behavior for smooth interaction
- SVG rendering for scalable graphics
- Real-time guide line updates
- Outside clip path for full visibility

### Timer Integration
- Integrated with existing universal timer
- Executes before other automated systems
- Comprehensive logging for debugging

## Examples

### Example 1: Maximum Price (Default)
- **Baby Price**: 10 consumer sperm per baby (demand curve y-intercept)
- **Babies Required**: 0 babies (`xAt = 10 - 10 = 0`)
- **Transaction Amount**: 0 consumer sperm (`rectArea = 10 × 0 = 0`)
- **Validation**: No trade occurs (economically correct - maximum price = no demand)

### Example 2: Low Price Trade
- **Baby Price**: 2 consumer sperm per baby
- **Babies Required**: 8 babies (`xAt = 10 - 2 = 8`)
- **Transaction Amount**: 16 consumer sperm (`rectArea = 2 × 8 = 16`)
- **Validation**: Need ≥8 babies AND ≥16 consumer sperm

### Example 3: High Price Trade
- **Baby Price**: 8 consumer sperm per baby
- **Babies Required**: 2 babies (`xAt = 10 - 8 = 2`)
- **Transaction Amount**: 16 consumer sperm (`rectArea = 8 × 2 = 16`)
- **Validation**: Need ≥2 babies AND ≥16 consumer sperm

## Economic Insights

### Price-Quantity Relationship
- Higher baby prices → fewer babies required
- Lower baby prices → more babies required
- Same transaction amount can be achieved with different price/quantity combinations

### Strategic Considerations
- Players start at maximum price (no trades initially)
- Drag down to lower prices to begin trading
- Higher prices are more efficient for small baby counts
- Lower prices are better for large baby inventories
- Default position teaches economic principles (high price = no demand)

## Future Enhancements

### Planned Features
- Production mechanism (x-axis slider)
- Dynamic curve parameters
- Market equilibrium visualization
- Advanced economic models

### Technical Improvements
- Performance optimizations
- Enhanced visual feedback
- Mobile responsiveness
- Accessibility features

## Debugging

### Console Logging
The system provides detailed logging:
- Trade execution attempts
- Resource validation results
- Calculation details
- Error conditions

### Common Issues
- **No trades executing**: Check baby count and consumer sperm availability
- **Missing guide lines**: Ensure baby price > 0
- **Dot not visible**: Check browser console for errors

## Integration Notes

### Existing Systems
- Compatible with current baby production (fuckers)
- Works alongside manual baby creation
- Integrates with resource management
- Respects pause/resume functionality

### State Management
- All changes persist to localStorage
- Redux state updates trigger UI re-renders
- Clean separation of concerns
- Type-safe implementation
