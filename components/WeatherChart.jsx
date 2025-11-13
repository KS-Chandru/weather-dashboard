// components/WeatherChart.jsx
"use client";

import { useEffect, useRef } from "react";

export default function WeatherChart({ weekly = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const W = (canvas.width = 720);
    const H = (canvas.height = 240);
    const padding = 40;

    if (!weekly.length) {
      ctx.clearRect(0, 0, W, H);
      return;
    }

    const temps = weekly.map((w) => w.temp);
    const min = Math.min(...temps) - 2;
    const max = Math.max(...temps) + 2;
    const xStep = (W - padding * 2) / (weekly.length - 1);

    const y = (t) =>
      H - padding - ((t - min) / (max - min)) * (H - padding * 2);

    let progress = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // gradient fill
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(255,255,255,0.28)");
      grad.addColorStop(1, "rgba(255,255,255,0.02)");

      ctx.beginPath();
      weekly.forEach((d, i) => {
        const px = padding + i * xStep * progress;
        const py = y(d.temp) * progress + (1 - progress) * (H - padding);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });

      ctx.lineTo(W - padding, H - padding);
      ctx.lineTo(padding, H - padding);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // stroke line
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      weekly.forEach((d, i) => {
        const px = padding + i * xStep * progress;
        const py = y(d.temp) * progress + (1 - progress) * (H - padding);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // points and labels
      ctx.fillStyle = "white";
      ctx.font = "14px Inter";
      weekly.forEach((d, i) => {
        const px = padding + i * xStep * progress;
        const py = y(d.temp) * progress + (1 - progress) * (H - padding);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`${d.temp}°`, px - 12, py - 12);
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
        borderRadius: 12,
        overflow: "hidden",
        background: "rgba(255,255,255,0.03)",
        padding: 12,
      }}
    >
      <canvas ref={ref} style={{ width: "100%", height: 220 }} />
    </div>
  );
}
