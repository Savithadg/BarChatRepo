import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as d3 from "d3";

export default function ChatExample() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/value`).then((result) => {
      setData(result.data);
    });
  });

  const height = 300,
    width = 400,
    top = 20,
    bottom = 30,
    left = 30,
    right = 0;

  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  function XAxis({ top, bottom, left, right, height, scale }) {
    const axis = useRef(null);

    useEffect(() => {
      d3.select(axis.current).call(d3.axisBottom(scale));
    });

    return (
      <g
        className="axis x"
        ref={axis}
        transform={`translate(${left}, ${height - bottom})`}
      />
    );
  }

  function YAxis({ top, bottom, left, right, scale }) {
    const axis = useRef(null);

    useEffect(() => {
      d3.select(axis.current).call(d3.axisLeft(scale));
    });

    return (
      <g
        className="axis y"
        ref={axis}
        transform={`translate(${left}, ${top})`}
      />
    );
  }

  const x = d3
    .scaleBand()
    .range([0, width - left - right])
    .domain(data.map((d) => d.name))
    .padding(0.4);

  const y = d3
    .scaleLinear()
    .range([height - top - bottom, 0])
    .domain([0, d3.max(data, (d) => d.value)]);

  function Rect({ data, x, y, height, top, bottom }) {
    return (
      <g transform={`translate(${x(data.name)}, ${y(data.value)})`}>
        <rect
          width={x.bandwidth()}
          height={height - bottom - top - y(data.value)}
          fill={colors(data.index)}
        />
        <text
          transform={`translate(${x.bandwidth() / 2}, ${-2})`}
          textAnchor="middle"
          alignmentBaseline="ideographic"
          fill="black"
          fontSize="12"
        >
          {format(data.value)}
        </text>
      </g>
    );
  }

  return (
    <div class="container">
      <svg width={width} height={height}>
        <XAxis
          scale={x}
          top={top}
          bottom={bottom}
          left={left}
          right={right}
          height={height}
        />
        <YAxis scale={y} top={top} bottom={bottom} left={left} right={right} />
        <g transform={`translate(${left}, ${top})`}>
          {data.map((val, i) => (
            <Rect
              data={val}
              x={x}
              y={y}
              top={top}
              bottom={bottom}
              height={height}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
