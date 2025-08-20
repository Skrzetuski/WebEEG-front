import { useEffect, useMemo } from "react";
import { createChannelBuffer, pushSamples } from "./eegUtils";


export function useSimulatedEEG(
  channels,
  sampleRate,
  secondsVisible = 10,
  marginSeconds = 0.5
) {
  const capacity = Math.max(
    1,
    Math.ceil(sampleRate * (secondsVisible + marginSeconds))
  );

  const buffers = useMemo(
    () => Array.from({ length: channels }, () => createChannelBuffer(capacity)),
    [channels, capacity]
  );

  useEffect(() => {
    let raf = 0;
    const TARGET_FPS = 30;
    const frameInterval = 1000 / TARGET_FPS;

    const batch = Math.max(1, Math.floor(sampleRate / TARGET_FPS));
    const temp = new Float32Array(batch);
    let t = 0; 
    const dt = 1 / sampleRate;
    let last = performance.now();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      if (now - last < frameInterval) return;
      last = now;

      for (let ch = 0; ch < channels; ch++) {
        const freq = 8 + ch * 0.25;
        for (let i = 0; i < batch; i++) {
          const time = t + i * dt;
          temp[i] = 40 * Math.sin(2 * Math.PI * freq * time);
        }
        pushSamples(buffers[ch], temp);
      }

      t += batch * dt;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [buffers, channels, sampleRate, secondsVisible, marginSeconds]);

  return buffers;
}
