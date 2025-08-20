import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useParentSize from "../../hooks/useParentSize";
import EEGCanvas from "./EEGCanvas";
import EEGLegend from "./EEGLegend";
import { useEEGWebSocket } from "../../hooks/useEEGWebSocket";

export default function EEGMultiViewerFull({
  numChannels,
  sampleRate = 500,
  secondsVisible = 10,
  channelGap = 8,
  voltsPerDiv = 10,
  title = "EEG",
  labels,
  minRowHeight = 64,
  reserveLegendPx = 56,
  reserveHeaderPx = 48,
  paddingPx = 16,
}) {
  const [wrapRef, { width, height }] = useParentSize();

  const canvasAvailH = Math.max(
    1,
    height - reserveHeaderPx - reserveLegendPx - paddingPx * 2
  );

  const rawRowH = (canvasAvailH - (numChannels - 1) * channelGap) / numChannels;
  const channelHeight = Math.max(minRowHeight, Math.floor(rawRowH));
  const totalHeight = numChannels * channelHeight + Math.max(0, numChannels - 1) * channelGap;
  const location = useLocation();
  const onEEGPage = location.pathname.startsWith("/dashboard/session"); 
  const wsUrl = `ws://localhost:8000/ws/eeg?fmt=int16-interleaved&channels=${numChannels}&sr=${sampleRate}&spf=20`;


 const buffers = useEEGWebSocket(wsUrl, {
    channels: numChannels,
    sampleRate,
    secondsVisible,
    marginSeconds: 0.5,
    autoReconnectMs: 2000,
    enabled: onEEGPage,
    onStatus: console.log,
  });

  const safeLabels = useMemo(() => {
    if (Array.isArray(labels) && labels.length === numChannels) return labels;
    return Array.from({ length: numChannels }, (_, i) => `Kanał ${i + 1}`);
  }, [labels, numChannels]);

  return (
    <div className="w-full h-screen"> 
      <div className="bg-gray-900 h-full flex flex-col">
        <div className="flex items-baseline justify-between px-4 pt-4" style={{ height: reserveHeaderPx }}>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <div className="text-xs text-zinc-400">
            {numChannels} ch · {sampleRate} Hz · {secondsVisible}s
          </div>
        </div>

        <div ref={wrapRef} className="flex-1 overflow-auto px-4 pb-2">
          {width > 0 && (
            <div style={{ height: Math.max(totalHeight, canvasAvailH) }}>
              <EEGCanvas
                width={width}
                totalHeight={totalHeight}
                buffers={buffers}
                sampleRate={sampleRate}
                secondsVisible={secondsVisible}
                channelHeight={channelHeight}
                channelGap={channelGap}
                voltsPerDiv={voltsPerDiv}
                gain={120}
              />
            </div>
          )}
        </div>

        <div className="px-4 pb-3" style={{ height: reserveLegendPx }}>
          <EEGLegend labels={safeLabels} />
        </div>
      </div>
    </div>
  );
}
