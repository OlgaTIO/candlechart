import { useEffect, useRef, useState } from "react";

const CandlestickChart = ({ data }) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(1000);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [hoveredCandle, setHoveredCandle] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const candleWidth = canvasWidth / data.length;
    const maxPrice = Math.max(...data.map((entry) => entry.h));
    const minPrice = Math.min(...data.map((entry) => entry.l));
    const priceRange = maxPrice - minPrice;

    // Draw y-axis
    const yAxisPadding = 40;
    ctx.beginPath();
    ctx.moveTo(yAxisPadding, 0);
    ctx.lineTo(yAxisPadding, canvasHeight - 20);
    ctx.strokeStyle = "gray";
    ctx.stroke();

    const priceInterval = priceRange / 7;
    for (let i = 0; i <= 7; i++) {
      const price = minPrice + i * priceInterval;
      const y =
        canvasHeight - ((price - minPrice) / priceRange) * (canvasHeight - 20);
      ctx.fillText(price.toFixed(4), 7, y);
    }

    // Draw y-axis title
    ctx.save();
    ctx.translate(15, canvasHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textColor = "white";
    ctx.fillText("Price", 0, 0);
    ctx.restore();

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(yAxisPadding, canvasHeight - 20);
    ctx.lineTo(canvasWidth, canvasHeight - 20);
    ctx.strokeStyle = "gray";
    ctx.stroke();

    // Draw x-axis labels
    const dateLabels = data.map((entry) => new Date(entry.t).getTime());
    const minTime = dateLabels[0];
    const maxTime = dateLabels[dateLabels.length - 1];

    const timeRange = maxTime - minTime;
    const timeInterval = timeRange / 10;
    for (let i = 0; i <= 10; i++) {
      const time = minTime + i * timeInterval;
      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const label = `${hours}:${minutes}`;
      const x = ((i + 0.2) * (canvasWidth - yAxisPadding)) / 10 + yAxisPadding;
      ctx.fillText(label, x, canvasHeight - 10);
    }

    data.forEach((entry, index) => {
      const x = index * candleWidth + yAxisPadding;
      const candleHeight = ((entry.h - entry.l) / priceRange) * canvasHeight;
      const candleY =
        canvasHeight - ((entry.h - minPrice) / priceRange) * canvasHeight;
      const bodyHeight = ((entry.o - entry.c) / priceRange) * canvasHeight;

      ctx.fillStyle = entry.o > entry.c ? "yellow" : "blue";
      ctx.fillRect(
        x + candleWidth * 0.25,
        candleY,
        candleWidth * 0.5,
        bodyHeight
      );

      ctx.strokeStyle = entry.o > entry.c ? "yellow" : "blue";
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, candleY);
      ctx.lineTo(x + candleWidth / 2, candleY - candleHeight);
      ctx.stroke();
    });

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const candleIndex = Math.floor((mouseX - yAxisPadding) / candleWidth);
      if (candleIndex >= 0 && candleIndex < data.length) {
        setHoveredCandle({
          ...data[candleIndex],
          x: mouseX,
          y: mouseY,
        });
      } else {
        setHoveredCandle(null);
      }
    };

    const handleMouseLeave = () => {
      setHoveredCandle(null);
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [data, canvasWidth, canvasHeight]);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} id="canvas"></canvas>

      {hoveredCandle && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "40px",
            padding: "10px",
            background: "white",
            borderRadius: "15px",
          }}
        >
          <p>Open: {hoveredCandle.o}</p>
          <p>High: {hoveredCandle.h}</p>
          <p>Low: {hoveredCandle.l}</p>
          <p>Close: {hoveredCandle.c}</p>
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;
