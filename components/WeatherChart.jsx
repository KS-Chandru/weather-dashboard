"use client";

import { useEffect, useRef } from "react";

export default function WeatherChart({ weekly }) {
  const canvasRef = useRef();

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    // Chart area size
    const width = c.width;
    const height = c.height;
    const padding = 40;

    // Extract temperatures
    const temps = weekly.map((d) => d.temp);

    const min = Math.min(...temps) - 2;
    const max = Math.max(...temps) + 2;

    // Helper to map temps → Y position
    const yScale = (t) =>
      height - padding - ((t - min) / (max - min)) * (height - padding * 2);

    // X spacing
    const xStep = (width - padding * 2) / (weekly.length - 1);

    let progress = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // GRADIENT BG
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(255,255,255,0.8)");
      gradient.addColorStop(1, "rgba(255,255,255,0.1)");

      // Smooth Bezier curve
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";

      weekly.forEach((d, i) => {
        const x = padding + i * xStep;
        const y = yScale(d.temp);

        const px = padding + i * xStep * progress;
        const py = yScale(d.temp) * progress;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.bezierCurveTo(px - 15, py, px - 5, py, px, py);
      });

      ctx.stroke();

      // Fill under curve
      ctx.lineTo(width - padding, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw points
      weekly.forEach((d, i) => {
        const x = padding + i * xStep * progress;
        const y = yScale(d.temp) * progress;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.font = "14px Inter";
        ctx.fillText(`${d.temp}°`, x - 10, y - 12);
      });

      if (progress < 1) {
        progress += 0.015;
        requestAnimationFrame(draw);
      }
    }

    draw();
  }, [weekly]);

  return (
    <div
      style={{
        marginTop: 30,
        padding: 20,
        borderRadius: 20,
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(15px)",
      }}
    >
      <canvas ref={canvasRef} width={400} height={250}></canvas>
    </div>
  );
}
