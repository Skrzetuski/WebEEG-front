import { useMemo } from "react";
import useParentSize from "../../hooks/useParentSize";
import EEGCanvasFit from "./EEGCanvasFit";
import EEGLegend from "./EEGLegend";
import { useSimulatedEEG } from "./eegSimulator";

export default function EEGMultiViewerFit({
  numChannels,
  sampleRate = 500,
  secondsVisible = 10,
  desiredGap = 8,
  voltsPerDiv = 10,
  title = "EEG",
  labels,
  showLegend = false,
  reserveHeaderPx = 0,
  reserveLegendPx = 0,
  paddingPx = 0,
}) {
  const [wrapRef, { width, height }] = useParentSize();
  const buffers = useSimulatedEEG(numChannels, sampleRate);

  const availHeight = Math.max(
    1,
    height - reserveHeaderPx - (showLegend ? reserveLegendPx : 0) - paddingPx * 2
  );

  const safeLabels = useMemo(() => {
    if (Array.isArray(labels) && labels.length === numChannels) return labels;
    return Array.from({ length: numChannels }, (_, i) => `Kanał ${i + 1}`);
  }, [labels, numChannels]);

  return (
    <div ref={wrapRef} className="w-full h-full overflow-hidden">
      {reserveHeaderPx > 0 && (
        <div className="flex items-center justify-between px-2"
             style={{ height: reserveHeaderPx }}>
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <div className="text-[10px] text-zinc-400">
            {numChannels} ch · {sampleRate} Hz · {secondsVisible}s
          </div>
        </div>
      )}

      {width > 0 && availHeight > 0 && (
        <div
          className="px-0"
          style={{ height: availHeight, paddingLeft: paddingPx, paddingRight: paddingPx }}
        >
          <EEGCanvasFit
            width={width - paddingPx * 2}
            availHeight={availHeight}
            buffers={buffers}
            sampleRate={sampleRate}
            secondsVisible={secondsVisible}
            desiredGap={desiredGap}
            voltsPerDiv={voltsPerDiv}
          />
        </div>
      )}

      {showLegend && reserveLegendPx > 0 && (
        <div className="px-2" style={{ height: reserveLegendPx }}>
          <EEGLegend labels={safeLabels} />
        </div>
      )}
    </div>
  );
}
