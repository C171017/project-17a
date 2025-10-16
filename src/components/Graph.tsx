// src/components/Graph.tsx
import { useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, format as d3Format } from 'd3';
import '../../css/graph.css';

function Graph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const clipIdRef = useRef<string>(`graph-clip-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const stage = stageRef.current;
    const svgSel = select(svgRef.current);
    if (!stage) return;

    const root = svgSel.append('g').attr('class', 'graph-root');

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(0, Math.floor(rect.width));
      const height = Math.max(0, Math.floor(rect.height));
      if (!width || !height) return;

      const margin = { top: 12, right: 12, bottom: 28, left: 36 };
      const innerW = Math.max(1, width - margin.left - margin.right);
      const innerH = Math.max(1, height - margin.top - margin.bottom);

      svgSel.attr('viewBox', `0 0 ${width} ${height}`);
      root.attr('transform', `translate(${margin.left},${margin.top})`);

      root.selectAll('*').remove();

      // Clip path to ensure we only draw within inner plot area
      const defs = root.append('defs');
      defs.append('clipPath')
        .attr('id', clipIdRef.current)
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', innerW)
        .attr('height', innerH);

      const plot = root.append('g')
        .attr('class', 'plot')
        .attr('clip-path', `url(#${clipIdRef.current})`);

      // Placement constraints (10% top, 10% right)
      const topPadRatio = 0.1;
      const rightPadRatio = 0.1;

      // Demand function y = m*x + b
      const demandM: number = -1; // slope
      const demandB: number = 10; // intercept

      const yIntercept = demandB; // y at x=0
      const xIntercept = demandM !== 0 ? -demandB / demandM : Number.POSITIVE_INFINITY; // x where y=0

      // Determine domains according to rules
      const yMax = Math.max(0.0001, yIntercept);
      const xHasPositiveIntercept = Number.isFinite(xIntercept) && xIntercept > 0;
      // Fallback: if no positive x-intercept, use intersection with top (y=yMax) when positive; else minimal positive domain
      const xAtTop = demandM !== 0 ? (yMax - demandB) / demandM : Number.NEGATIVE_INFINITY;
      const hasPositiveTopIntersection = Number.isFinite(xAtTop) && xAtTop > 0;
      const xRight = xHasPositiveIntercept ? xIntercept : (hasPositiveTopIntersection ? xAtTop : 1);
      const xMax = Math.max(0.0001, xRight);

      // Scales: map intercepts to 10% from top and right
      const x = scaleLinear()
        .domain([0, xMax])
        .range([0, innerW * (1 - rightPadRatio)]);

      const y = scaleLinear()
        .domain([0, yMax])
        .range([innerH, innerH * topPadRatio]);

      // Thick axes (full-length domain lines)
      const originX = 0;
      const originY = innerH;

      root.append('line')
        .attr('class', 'axis-baseline')
        .attr('x1', originX).attr('y1', 0)
        .attr('x2', originX).attr('y2', innerH)
        .attr('stroke', '#000').attr('stroke-width', 3);

      root.append('line')
        .attr('class', 'axis-baseline')
        .attr('x1', 0).attr('y1', originY)
        .attr('x2', innerW).attr('y2', originY)
        .attr('stroke', '#000').attr('stroke-width', 3);

      // Axes with ticks and gridlines (hide domain path)
      const tickFmt = d3Format(',.0f');

      const xTickCount = Math.max(3, Math.min(10, Math.round((innerW * (1 - rightPadRatio)) / 70)));
      const yTickCount = Math.max(3, Math.min(10, Math.round((innerH * (1 - topPadRatio)) / 70)));

      const gx = root.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0,${originY})`)
        .call(
          axisBottom(x)
            .ticks(xTickCount)
            .tickFormat((d) => tickFmt(Number(d)))
            .tickSize(-innerH)
        );
      gx.select('.domain').attr('display', 'none');
      gx.selectAll('.tick line')
        .attr('class', 'gridline')
        .attr('stroke', '#d0d0d0')
        .attr('stroke-opacity', 1);

      const gy = root.append('g')
        .attr('class', 'axis axis-y')
        .call(
          axisLeft(y)
            .ticks(yTickCount)
            .tickFormat((d) => tickFmt(Number(d)))
            .tickSize(-innerW)
        );
      gy.select('.domain').attr('display', 'none');
      gy.selectAll('.tick line')
        .attr('class', 'gridline')
        .attr('stroke', '#d0d0d0')
        .attr('stroke-opacity', 1);

      // Draw curves within first quadrant, clipped to plot
      const curves = plot.append('g').attr('class', 'curves');

      // Demand segment endpoints within first quadrant and current domains
      // y = m*x + b intersects axes at (0, b) and (xIntercept, 0) if xIntercept>0
      const demandStart = { x: 0, y: Math.max(0, Math.min(yMax, yIntercept)) };
      const demandEnd = xHasPositiveIntercept
        ? { x: Math.min(xMax, xIntercept), y: 0 }
        : (hasPositiveTopIntersection
            ? { x: Math.min(xMax, xAtTop), y: yMax }
            : { x: xMax, y: Math.max(0, demandM * xMax + demandB) }
          );

      curves.append('line')
        .attr('class', 'curve demand')
        .attr('x1', x(demandStart.x))
        .attr('y1', y(demandStart.y))
        .attr('x2', x(demandEnd.x))
        .attr('y2', y(demandEnd.y))
        .attr('stroke', '#e5484d')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      // Supply segment: y = x within first quadrant and current domains
      // Endpoint at min boundary where x or y hits domain max
      const supplyMax = Math.min(xMax, yMax);
      const supplyStart = { x: 0, y: 0 };
      const supplyEnd = { x: supplyMax, y: supplyMax };

      curves.append('line')
        .attr('class', 'curve supply')
        .attr('x1', x(supplyStart.x))
        .attr('y1', y(supplyStart.y))
        .attr('x2', x(supplyEnd.x))
        .attr('y2', y(supplyEnd.y))
        .attr('stroke', '#30a46c')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    };

    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    return () => {
      ro.disconnect();
      svgSel.selectAll('*').remove();
    };
  }, []);

  return (
    <div className="graph-slot">
      <div className="graph-stage" ref={stageRef}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
}

export default Graph;

 