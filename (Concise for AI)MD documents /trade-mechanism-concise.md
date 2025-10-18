⸻

Trade Mechanism – Implementation Summary

Purpose:
Interactive y-axis slider for baby price selection with automatic trade execution based on supply/demand economics.

⸻

Core Behavior
	•	Y-axis slider: Draggable blue dot (0-10 range, integers only)
	•	Default position: Demand curve y-intercept (y=10, maximum price)
	•	Baby price: yStar = selected price (consumer sperm per baby)
	•	Babies required: xAt = 10 - yStar (demand curve intersection)
	•	Transaction amount: rectArea = yStar × xAt (total consumer sperm)
	•	Validation: babyCount >= xAt AND consumerSperm >= rectArea
	•	Execution: babyCount -= xAt, consumerSperm -= rectArea, producerSperm += rectArea

⸻

Visual Design

Element	Style
Slider Dot	Blue #0090ff, 6px radius, white stroke
Guide Lines	Blue #0090ff, 1.5px width, dashed (5,5)
Hover State	Dot expands to 8px radius
Drag State	Dot expands, semi-transparent, thicker stroke

⸻

Implementation Highlights
	•	File: src/components/Graph.tsx
	•	Libraries: D3.js (drag behavior, SVG manipulation)
	•	State: Redux (tradeYChoice, executeTrade action)
	•	Features:
	•	Default position: Demand curve y-intercept (y=10)
	•	Preview mode during drag (no state updates)
	•	Click-to-set on y-axis
	•	Real-time guide line updates
	•	Outside clip path for full visibility

// Key logic
const xAt = 10 - yStar; // Babies required
const rectArea = yStar * xAt; // Transaction amount
if (babyCount >= xAt && consumerSperm >= rectArea) {
  // Execute trade
}

⸻

Trade Examples
	•	yStar=10: Need 0 babies, 0 consumer sperm (default, no trade)
	•	yStar=2: Need 8 babies, 16 consumer sperm
	•	yStar=5: Need 5 babies, 25 consumer sperm  
	•	yStar=8: Need 2 babies, 16 consumer sperm

⸻

Integration & Performance
	•	Timer Integration:
	•	Executes on each universal timer tick
	•	Respects pause state
	•	Comprehensive console logging
	•	Performance:
	•	Smooth drag interactions
	•	Efficient SVG updates
	•	Minimal re-renders

⸻

Validation
	•	Verified drag behavior
	•	Accurate economic calculations
	•	Proper resource validation
	•	State persistence to localStorage
	•	Cross-browser compatibility

⸻

Summary

Interactive trade mechanism with draggable y-axis slider starting at demand curve y-intercept (maximum price), real-time visual guides, and automatic execution based on supply/demand economics. Players begin at maximum price (no trades) and drag down to lower prices to start trading.
