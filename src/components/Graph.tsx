import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setConsumerSperm, setProducerSperm } from "../store/counterSlice";
import "../../css/graph.css";

export default function Graph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentPrice, setCurrentPrice] = useState(5); // Initial price value (integer)
  const dispatch = useAppDispatch();
  const consumerSperm = useAppSelector((state) => state.counter.consumerSperm);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);

  // Calculate the area value (baby * sperm) - using integer values
  const quantity = Math.floor((10 - currentPrice) / 1.2);
  const areaValue = quantity * currentPrice;
  const tradeAmount = areaValue;
  
  // Check if there's enough consumer sperm for the trade
  const canTrade = consumerSperm >= tradeAmount;

  // Trade function
  const handleTrade = () => {
    if (canTrade) {
      dispatch(setConsumerSperm(consumerSperm - tradeAmount));
      dispatch(setProducerSperm(producerSperm + tradeAmount));
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales for better data management
    const xScale = d3.scaleLinear()
      .domain([0, 8]) // Integer quantity domain (0 to 8)
      .range([50, 300]); // Same SVG pixel range

    const yScale = d3.scaleLinear()
      .domain([0, 10]) // Integer price domain (0 to 10)
      .range([270, 20]); // Extended SVG pixel range (inverted for SVG coordinates)

    // Create demand curve data points - using integer steps
    const demandData = d3.range(0, 9, 1).map(quantity => ({
      x: quantity,
      y: Math.max(0, 10 - quantity * 1.2) // P = 10 - 1.2Q
    }));

    // Draw Y-axis (Price axis)
    svg.append("line")
      .attr("x1", 50)
      .attr("y1", 20)
      .attr("x2", 50)
      .attr("y2", 270)
      .attr("stroke", "#333")
      .attr("stroke-width", 3);

    // Draw X-axis (Quantity axis)
    svg.append("line")
      .attr("x1", 50)
      .attr("y1", 270)
      .attr("x2", 300)
      .attr("y2", 270)
      .attr("stroke", "#333")
      .attr("stroke-width", 3);

    // Draw demand curve using D3's line generator
    const line = d3.line<{x: number, y: number}>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveLinear);

    svg.append("path")
      .datum(demandData)
      .attr("d", line)
      .attr("stroke", "#0066cc")
      .attr("stroke-width", 3)
      .attr("fill", "none");

    // Add arrow heads
    svg.append("polygon")
      .attr("points", "50,20 45,30 55,30")
      .attr("fill", "#333");

    svg.append("polygon")
      .attr("points", "300,270 290,265 290,275")
      .attr("fill", "#333");

    // Create draggable dot on y-axis
    const dot = svg.append("circle")
      .attr("cx", 50)
      .attr("cy", yScale(currentPrice))
      .attr("r", 8)
      .attr("fill", "#ff4444")
      .attr("stroke", "#cc0000")
      .attr("stroke-width", 2)
      .style("cursor", "grab")
      .classed("controllable-dot", true);

    // Create semi-transparent grey rectangle under the orange line
    const areaRectangle = svg.append("rect")
      .attr("x", 50)
      .attr("y", yScale(currentPrice))
      .attr("width", xScale(quantity) - 50)
      .attr("height", yScale(0) - yScale(currentPrice))
      .attr("fill", "rgba(128, 128, 128, 0.3)")
      .attr("stroke", "none");

    // Create connecting line from y-axis to curve
    const connectingLine = svg.append("line")
      .attr("x1", 50)
      .attr("y1", yScale(currentPrice))
      .attr("x2", xScale(quantity))
      .attr("y2", yScale(currentPrice))
      .attr("stroke", "#ff4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Create dot on the demand curve
    const curveDot = svg.append("circle")
      .attr("cx", xScale(quantity))
      .attr("cy", yScale(currentPrice))
      .attr("r", 6)
      .attr("fill", "#ff4444")
      .attr("stroke", "#cc0000")
      .attr("stroke-width", 2);

    // Add labels
    svg.append("text")
      .attr("x", 25)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "14")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Sperm");

    svg.append("text")
      .attr("x", 325)
      .attr("y", 285)
      .attr("text-anchor", "middle")
      .attr("font-size", "14")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Baby");

    // Create D3 drag behavior
    const drag = d3.drag<SVGCircleElement, unknown, unknown>()
      .on("start", function() {
        d3.select(this)
          .style("cursor", "grabbing")
          .classed("dragging", true);
      })
      .on("drag", function(event) {
        // Convert mouse position to price value (inverted for y-axis) and snap to integer
        const rawPrice = yScale.invert(event.y);
        const price = Math.max(0, Math.min(10, Math.round(rawPrice)));
        const quantity = Math.floor((10 - price) / 1.2);
        
        // Update state
        setCurrentPrice(price);
        
        // Update dot position on y-axis
        d3.select(this)
          .attr("cy", yScale(price));

        // Update area rectangle
        areaRectangle
          .attr("y", yScale(price))
          .attr("width", xScale(quantity) - 50)
          .attr("height", yScale(0) - yScale(price));

        // Update connecting line
        connectingLine
          .attr("y1", yScale(price))
          .attr("x2", xScale(quantity))
          .attr("y2", yScale(price));

        // Update curve dot with smooth transition
        curveDot
          .transition()
          .duration(50)
          .attr("cx", xScale(quantity))
          .attr("cy", yScale(price));
      })
      .on("end", function() {
        d3.select(this)
          .style("cursor", "grab")
          .classed("dragging", false);
      });

    // Apply drag behavior to the dot
    dot.call(drag);

    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };

  }, [currentPrice]);

  return (
    <div className="graph-container">
      <svg 
        ref={svgRef}
        width="100%" 
        height="300" 
        className="graph-svg" 
        viewBox="0 0 350 300"
      />
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
        Baby: {quantity} | Sperm: {currentPrice} | Area: {areaValue}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button 
          onClick={handleTrade}
          disabled={!canTrade}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: canTrade ? '#4CAF50' : '#cccccc',
            color: canTrade ? 'white' : '#666666',
            border: 'none',
            borderRadius: '4px',
            cursor: canTrade ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s'
          }}
        >
          Trade ({tradeAmount})
        </button>
      </div>
    </div>
  );
}
