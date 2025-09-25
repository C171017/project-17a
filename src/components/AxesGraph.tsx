import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../../css/axes-graph.css";

export default function AxesGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentPrice, setCurrentPrice] = useState(50); // Initial price value

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales for better data management
    const xScale = d3.scaleLinear()
      .domain([0, 120]) // Shorter quantity domain (0 to 120)
      .range([50, 300]); // Shorter SVG pixel range

    const yScale = d3.scaleLinear()
      .domain([0, 100]) // Price domain (0 to 100)
      .range([270, 20]); // Extended SVG pixel range (inverted for SVG coordinates)

    // Create demand curve data points
    const demandData = d3.range(0, 121, 1).map(quantity => ({
      x: quantity,
      y: Math.max(0, 100 - quantity * 1.2) // Even steeper downward sloping demand curve: P = 100 - 1.2Q
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

    // Create connecting line from y-axis to curve
    const connectingLine = svg.append("line")
      .attr("x1", 50)
      .attr("y1", yScale(currentPrice))
      .attr("x2", xScale((100 - currentPrice) / 1.2))
      .attr("y2", yScale(currentPrice))
      .attr("stroke", "#ff4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Create dot on the demand curve
    const curveDot = svg.append("circle")
      .attr("cx", xScale((100 - currentPrice) / 1.2))
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
        // Convert mouse position to price value (inverted for y-axis)
        const price = Math.max(0, Math.min(100, yScale.invert(event.y)));
        const quantity = Math.max(0, (100 - price) / 1.2);
        
        // Update state
        setCurrentPrice(price);
        
        // Update dot position on y-axis
        d3.select(this)
          .attr("cy", yScale(price));

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
    <div className="axes-container">
      <svg 
        ref={svgRef}
        width="100%" 
        height="300" 
        className="axes-svg" 
        viewBox="0 0 350 300"
      />
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
        Baby: {((100 - currentPrice) / 1.2).toFixed(1)} | Sperm: {currentPrice.toFixed(1)}
      </div>
    </div>
  );
}
