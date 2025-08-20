import { extend, useTick } from "@pixi/react";
import { Container, Graphics as PixiGraphics } from "pixi.js";
import { useEffect, useRef } from "react";
import { minMaxDecimate, readLatest } from "./eegUtils";

extend({ Container, Graphics: PixiGraphics });

export default function EEGWaveRow({
  buffer,
  sampleRate,
  secondsVisible,
  width,
  height,
  voltsPerDiv,
  yOffset,
  clip = true,
  color = 0xffffff,
  gain = 1,
}) {
  const gRef = useRef(null);
  const maskRef = useRef(null);
  const containerRef = useRef(null);

  const workRef = useRef({
    latest: new Float32Array(1),
    decimated: new Float32Array(2),
    need: 0,
    wpx: 0,
  });



  useEffect(() => {
    const m = maskRef.current;
    const c = containerRef.current;
    if (!clip) {
      if (c) c.mask = null;
      return;
    }
    if (!m || !c || width <= 0 || height <= 0) return;

    m.clear();
    m.rect(0, yOffset, width, height);
    m.fill(0xffffff);

    c.mask = m;

  }, [width, height, yOffset, clip]);

  const lastRef = useRef(0);


 useTick(() => {
    const now = performance.now();
    if (now - lastRef.current < 33) return; // ~30 fps
    lastRef.current = now;

    const g = gRef.current;
    if (!g || width <= 0 || height <= 0) return;

    const samplesNeeded = Math.max(1, Math.floor(sampleRate * secondsVisible));
    const widthPx = Math.max(1, Math.floor(width));

    if (workRef.current.latest.length < samplesNeeded) {
      workRef.current.latest = new Float32Array(samplesNeeded);
    }
    if (workRef.current.decimated.length < widthPx * 2) {
      workRef.current.decimated = new Float32Array(widthPx * 2);
    }
    workRef.current.need = samplesNeeded;
    workRef.current.wpx = widthPx;

    const latest = workRef.current.latest;
    const decim = workRef.current.decimated;

    readLatest(buffer, samplesNeeded, latest);
    minMaxDecimate(latest, samplesNeeded, widthPx, decim);

    g.clear();
    g.position.set(0, yOffset);

    g.setStrokeStyle({ width: 1.5, color, alpha: 1 });
    g.beginPath();

    const midY = height / 2;
    const scaleY = (height / 8) / Math.max(1e-9, voltsPerDiv);
    const kY = scaleY * gain;

    for (let x = 0, dx = 0; x < widthPx; x++, dx += 2) {
      const y1 = midY - decim[dx] * kY;
      const y2 = midY - decim[dx + 1] * kY;
      const yy1 = Math.max(0, Math.min(height, y1));
      const yy2 = Math.max(0, Math.min(height, y2));
      g.moveTo(x + 0.5, yy1);
      g.lineTo(x + 0.5, yy2);
    }

    g.stroke();
  });


  return (
    <pixiContainer ref={containerRef}>
      {clip && <pixiGraphics ref={maskRef} />}
      <pixiGraphics ref={gRef} />
    </pixiContainer>
  );
}
