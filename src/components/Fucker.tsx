import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setFuckerCount } from "../store/counterSlice";

export default function Fucker() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dispatch = useAppDispatch();
  const fuckerCount = useAppSelector((state) => state.counter.fuckerCount);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);

  // Helper function to calculate total cost
  const calculateTotalCost = (count: number) => {
    return (count * (count + 1)) / 2;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(event.target.value, 10);
    dispatch(setFuckerCount(newCount));
  };

  // D3 bar chart effect
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = 300;
    const height = 150;
    const margin = { top: 15, right: 15, bottom: 30, left: 30 };
    
    // Data: array of fucker costs [1, 2, 3, ..., 10]
    const data = Array.from({ length: 10 }, (_, i) => i + 1);
    
    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.toString()))
      .range([margin.left, width - margin.right])
      .padding(0.1);
    
    const yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([height - margin.bottom, margin.top]);
    
    // Color scale (green to red gradient)
    const colorScale = d3.scaleLinear<string>()
      .domain([1, 10])
      .range(["#4CAF50", "#f44336"]);
    
    // Draw bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.toString()) || 0)
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d))
      .attr("fill", d => d <= fuckerCount ? colorScale(d) : "#e0e0e0")
      .attr("opacity", d => d <= fuckerCount ? 1 : 0.3);
      
  }, [fuckerCount]);

  const totalCost = calculateTotalCost(fuckerCount);

  return (
    <div className="fucker-container">
      <div className="fucker-info">
        <span className="fucker-title">Fuckers: {fuckerCount}</span>
        <span className="fucker-status">
          Status: {producerSperm >= totalCost ? 'Active' : 'Insufficient Sperm'}
        </span>
        <span className="fucker-cost">Total Cost: {totalCost} sperm/sec</span>
      </div>
      
      <div className="fucker-chart">
        <svg ref={svgRef} width="100%" height="150" />
      </div>
      
      <div className="fucker-controls">
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="1" 
          value={fuckerCount} 
          onChange={handleSliderChange}
          className="fucker-slider"
        />
        <div className="slider-labels">
          <span>0</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}