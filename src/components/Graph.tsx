// src/components/Graph.tsx
import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
// import { scaleLinear } from 'd3-scale';
import '../../css/graph.css';

function Graph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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

      const margin = { top: 12, right: 12, bottom: 24, left: 24 };
      const innerW = Math.max(1, width - margin.left - margin.right);
      const innerH = Math.max(1, height - margin.top - margin.bottom);

      svgSel.attr('viewBox', `0 0 ${width} ${height}`);
      root.attr('transform', `translate(${margin.left},${margin.top})`);

      root.selectAll('*').remove();

      // Prepare scales for future use (supply/demand curves)
      // const x = scaleLinear().domain([0, 1]).range([0, innerW]);
      // const y = scaleLinear().domain([0, 1]).range([innerH, 0]);

      const originX = 0;
      const originY = innerH;

      // Y axis
      root.append('line')
        .attr('x1', originX).attr('y1', originY)
        .attr('x2', originX).attr('y2', 0)
        .attr('stroke', '#000').attr('stroke-width', 3);

      // X axis
      root.append('line')
        .attr('x1', originX).attr('y1', originY)
        .attr('x2', innerW).attr('y2', originY)
        .attr('stroke', '#000').attr('stroke-width', 3);
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

 