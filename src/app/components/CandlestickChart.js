import { useEffect, useRef, useState } from "react";

const CandlestickChart = ({ data }) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(1000);
  const [canvasHeight, setCanvasHeight] = useState(600);

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

    const priceInterval = priceRange / 5;
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + i * priceInterval;
      const y =
        canvasHeight - ((price - minPrice) / priceRange) * (canvasHeight - 20);
      ctx.fillText(price.toFixed(2), 5, y);
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
    const dateLabels = data.map((entry) => new Date(entry.t));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.color = "white";
    for (let i = 0; i < dateLabels.length; i++) {
      const x = (i + 0.5) * candleWidth + yAxisPadding;
      ctx.fillText(dateLabels[i], x, canvasHeight - 10);
    }

    // Draw x-axis title
    ctx.textAlign = "center";
    ctx.fillText("Date", canvasWidth / 2, canvasHeight - 5);

    data.forEach((entry, index) => {
      const x = index * candleWidth + yAxisPadding;
      const candleHeight = ((entry.h - entry.l) / priceRange) * canvasHeight;
      const candleY =
        canvasHeight - ((entry.h - minPrice) / priceRange) * canvasHeight;
      const bodyHeight = ((entry.o - entry.c) / priceRange) * canvasHeight;

      ctx.fillStyle = entry.o > entry.c ? "red" : "green";
      ctx.fillRect(
        x + candleWidth * 0.25,
        candleY,
        candleWidth * 0.5,
        bodyHeight
      );

      ctx.strokeStyle = entry.o > entry.c ? "red" : "green";
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, candleY);
      ctx.lineTo(x + candleWidth / 2, candleY - candleHeight);
      ctx.stroke();
    });
  }, [data, canvasWidth, canvasHeight]);

  return <canvas ref={canvasRef} id="canvas"></canvas>;
};

export default CandlestickChart;
