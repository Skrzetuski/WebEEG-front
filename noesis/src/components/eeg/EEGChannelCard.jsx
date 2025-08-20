import { Application, extend, useTick, useApplication } from '@pixi/react';
import { Container, Graphics as PixiGraphics } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { useSimulatedEEG } from './eegSimulator';
import { minMaxDecimate, readLatest } from './eegUtils';

extend({ Container, Graphics: PixiGraphics });

function useParentWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    setWidth(el.clientWidth || 0);

    const ro = new ResizeObserver(() => {
      setWidth(el.clientWidth || 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}

function EEGWave({ buffers, sampleRate, secondsVisible, channelHeight, voltsPerDiv, width }) {
  const gRef = useRef(null);
  const workRef = useRef({
    latest: new Float32Array(1),
    decimated: new Float32Array(2),
    widthPx: 0,
    samplesNeeded: 0,
  });

  useTick(() => {
    const g = gRef.current;
    if (!g || !width) return;

    const samplesNeeded = Math.floor(sampleRate * secondsVisible);
    const widthPx = Math.max(1, Math.floor(width));
    const height = channelHeight;

    if (
      workRef.current.samplesNeeded !== samplesNeeded ||
      workRef.current.widthPx !== widthPx
    ) {
      workRef.current.samplesNeeded = samplesNeeded;
      workRef.current.widthPx = widthPx;
      workRef.current.latest = new Float32Array(samplesNeeded);
      workRef.current.decimated = new Float32Array(widthPx * 2);
    }

    const latest = workRef.current.latest;
    const decim = workRef.current.decimated;

    g.clear();
    g.setStrokeStyle({ width: 1.5, color: 0xffffff, alpha: 1 });
    g.beginPath();

    const buf = buffers[0];
    const midY = height / 2;
    const scaleY = (channelHeight / 8) / voltsPerDiv;

    readLatest(buf, latest.length, latest);
    minMaxDecimate(latest, latest.length, widthPx, decim);

    for (let x = 0, dx = 0; x < widthPx; x++, dx += 2) {
      const y1 = midY - decim[dx] * scaleY;
      const y2 = midY - decim[dx + 1] * scaleY;
      g.moveTo(x + 0.5, y1);
      g.lineTo(x + 0.5, y2);
    }

    g.stroke();
  });

  return (
    <pixiContainer>
      <pixiGraphics ref={gRef} />
    </pixiContainer>
  );
}

export function EEGChannelCard({
  sampleRate = 500,
  secondsVisible = 10,
  channelHeight = 120,          
  voltsPerDiv = 10,
  title = 'Kanał EEG',
}) {
  const [wrapRef, width] = useParentWidth();
  const buffers = useSimulatedEEG(1, sampleRate);

  return (
    <div className="w-full max-w-3xl px-4">
        <div className="bg-gray-900 p-4 rounded-xl shadow-md w-full max-w-3xl mx-auto">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <div ref={wrapRef} className="w-full block" style={{ height: channelHeight }}>
            {width > 0 && (
            <Application
                width={width}
                height={channelHeight}
                autoDensity={false}
                resolution={1}
                antialias
                backgroundAlpha={0}
            >
                <EEGWave
                buffers={buffers}
                sampleRate={sampleRate}
                secondsVisible={secondsVisible}
                channelHeight={channelHeight}
                voltsPerDiv={voltsPerDiv}
                width={width}
                />

            </Application>
            )}
        </div>
        </div>
    </div>
  );
}
