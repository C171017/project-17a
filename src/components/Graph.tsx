import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setFuckerCount, setCurrentPrice } from "../store/counterSlice";
import "../../css/graph.css";

export default function Graph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dispatch = useAppDispatch();
  const currentPrice = useAppSelector((state) => state.counter.currentPrice);
  const fuckerCount = useAppSelector((state) => state.counter.fuckerCount);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);

  // Calculate the area value (baby * sperm) - using integer values
  const quantity = Math.floor((10 - currentPrice) / 1.2);
  const areaValue = quantity * currentPrice;

  // Calculate fucker-related values
  const wage = fuckerCount; // Wage = Q (linear relationship)
  const totalCost = (fuckerCount * (fuckerCount + 1)) / 2; // Sum of 1+2+3+...+n
  const status = producerSperm >= totalCost ? 'Active' : 'Insufficient Sperm';


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

    // Create supply curve data points - Wage = Q (linear)
    const supplyData = d3.range(0, 11, 1).map(quantity => ({
      x: quantity,
      y: quantity // Wage = Q
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

    // Draw supply curve using the same line generator
    svg.append("path")
      .datum(supplyData)
      .attr("d", line)
      .attr("stroke", "#ff8800")
      .attr("stroke-width", 3)
      .attr("fill", "none");

    // Add arrow heads
    svg.append("polygon")
      .attr("points", "50,20 45,30 55,30")
      .attr("fill", "#333");

    svg.append("polygon")
      .attr("points", "300,270 290,265 290,275")
      .attr("fill", "#333");

    // Create draggable dot on y-axis (price control)
    const priceDot = svg.append("circle")
      .attr("cx", 50)
      .attr("cy", yScale(currentPrice))
      .attr("r", 8)
      .attr("fill", "#ff4444")
      .attr("stroke", "#cc0000")
      .attr("stroke-width", 2)
      .style("cursor", "grab")
      .classed("controllable-dot", true);

    // Create draggable dot on x-axis (fucker count control)
    const fuckerDot = svg.append("circle")
      .attr("cx", xScale(fuckerCount))
      .attr("cy", 270)
      .attr("r", 8)
      .attr("fill", "#00aa44")
      .attr("stroke", "#008833")
      .attr("stroke-width", 2)
      .style("cursor", "grab")
      .classed("controllable-dot", true);


    // Create connecting line from y-axis to demand curve
    const demandConnectingLine = svg.append("line")
      .attr("x1", 50)
      .attr("y1", yScale(currentPrice))
      .attr("x2", xScale(quantity))
      .attr("y2", yScale(currentPrice))
      .attr("stroke", "#ff4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Create dot on the demand curve
    const demandCurveDot = svg.append("circle")
      .attr("cx", xScale(quantity))
      .attr("cy", yScale(currentPrice))
      .attr("r", 6)
      .attr("fill", "#ff4444")
      .attr("stroke", "#cc0000")
      .attr("stroke-width", 2);

    // Create horizontal connecting line from x-axis to supply curve
    const supplyConnectingLine = svg.append("line")
      .attr("x1", xScale(fuckerCount))
      .attr("y1", 270)
      .attr("x2", xScale(fuckerCount))
      .attr("y2", yScale(wage))
      .attr("stroke", "#00aa44")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Create dot on the supply curve
    const supplyCurveDot = svg.append("circle")
      .attr("cx", xScale(fuckerCount))
      .attr("cy", yScale(wage))
      .attr("r", 6)
      .attr("fill", "#00aa44")
      .attr("stroke", "#008833")
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

    // Create D3 drag behavior for price control (y-axis)
    const priceDrag = d3.drag<SVGCircleElement, unknown, unknown>()
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
        dispatch(setCurrentPrice(price));
        
        // Update dot position on y-axis
        d3.select(this)
          .attr("cy", yScale(price));

        // Update connecting line
        demandConnectingLine
          .attr("y1", yScale(price))
          .attr("x2", xScale(quantity))
          .attr("y2", yScale(price));

        // Update curve dot with smooth transition
        demandCurveDot
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

    // Create D3 drag behavior for fucker count control (x-axis)
    const fuckerDrag = d3.drag<SVGCircleElement, unknown, unknown>()
      .on("start", function() {
        d3.select(this)
          .style("cursor", "grabbing")
          .classed("dragging", true);
      })
      .on("drag", function(event) {
        // Convert mouse position to fucker count and snap to integer
        const rawCount = xScale.invert(event.x);
        const count = Math.max(0, Math.min(10, Math.round(rawCount)));
        const wage = count;
        
        // Update Redux state
        dispatch(setFuckerCount(count));
        
        // Update dot position on x-axis
        d3.select(this)
          .attr("cx", xScale(count));

        // Update horizontal connecting line
        supplyConnectingLine
          .attr("x1", xScale(count))
          .attr("x2", xScale(count))
          .attr("y2", yScale(wage));

        // Update supply curve dot with smooth transition
        supplyCurveDot
          .transition()
          .duration(50)
          .attr("cx", xScale(count))
          .attr("cy", yScale(wage));
      })
      .on("end", function() {
        d3.select(this)
          .style("cursor", "grab")
          .classed("dragging", false);
      });

    // Apply drag behaviors to the dots
    priceDot.call(priceDrag);
    fuckerDot.call(fuckerDrag);

    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };

  }, [currentPrice, fuckerCount, producerSperm]);

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
      <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '14px' }}>
        Fuckers: {fuckerCount} | Wage: {wage} | Total Cost: {totalCost} | Status: {status}
      </div>
    </div>
  );
}
