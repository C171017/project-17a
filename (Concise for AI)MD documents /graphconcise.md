⸻

Dynamic Supply/Demand Graph – Implementation Summary

Purpose:
Responsive React + D3.js graph rendering supply (y = x) and demand (y = -x + 10) curves in the first quadrant with dynamic scaling and layout.

⚠️ Note: These functions are temporary placeholders — both will be dynamically adjustable in future updates.

⸻

Core Behavior
	•	Curves (Temporary Example):
	•	Supply → y = x
	•	Demand → y = -x + 10
	•	Rendered only for x ≥ 0, y ≥ 0
	•	Placement Rules:
	•	Demand y-intercept → 10% from top
	•	Demand x-intercept → 10% from right
	•	Fallback logic → If intercept outside domain, use rightmost visible point
	•	Scales: Shared linear x/y scales; auto-adjust to container size
	•	Ticks: ~70 px per major tick, between 3–10 ticks; D3’s nice tick values
	•	Responsive: Uses ResizeObserver for auto re-render
	•	Clipping: SVG restricted to the first quadrant

⸻

Visual Design

Element	Style
Demand Curve	Red #e5484d
Supply Curve	Green #30a46c
Gridlines	Light gray #d0d0d0
Axes	3 px width
Curves	2 px width
Tick Labels	,.0f (thousands format)


⸻

Implementation Highlights
	•	File: src/components/Graph.tsx
	•	Libraries: D3.js (select, scaleLinear, axisBottom, axisLeft, format)
	•	Features:
	•	Unique clipPath IDs per instance
	•	Clean resize/update cycle
	•	CSS styling for ticks and gridlines

// Key logic
const xTickCount = Math.round(innerW / 70);
const yTickCount = Math.round(innerH / 70);


⸻

Extensibility & Performance
	•	Redux-Ready:
Function parameters (demandM, demandB) modular and easily updatable.
	•	Future Features:
	•	Interactive updates
	•	Tooltips
	•	Animation transitions
	•	Multi-curve scenarios
	•	Export options
	•	Performance:
Efficient redraws and proper cleanup on resize.

⸻

Validation
	•	Verified responsive resizing
	•	Accurate curve intersections and math
	•	Cross-browser compatibility
	•	Graceful handling of zero-size or invalid domains

⸻

Summary

A clean, responsive D3-powered supply/demand visualization focused on the first quadrant, with adaptive tick scaling, consistent coordinate logic, and temporary function placeholders (y = x, y = -x + 10) designed for future dynamic updates via Redux or user interaction.