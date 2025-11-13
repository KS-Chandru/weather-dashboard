"use client";

import { useEffect, useRef } from "react";

export default function WeatherChart({ weekly }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let progress = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      weekly.forEach((d, i) => {
        const x = (i / (weekly.length - 1)) * 300 + 20;
        const y = 200 - d.temp * 2;

        const drawX = x * progress;
        const drawY = y * progress;

        if (i === 0) ctx.moveTo(drawX, drawY);
        else ctx.lineTo(drawX, drawY);
      });

      ctx.stroke();

      if (progress < 1) {
        progress += 0.02;
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [weekly]);

  return <canvas ref={canvasRef} width={350} height={220}></canvas>;
}
