import { Application, extend } from "@pixi/react";
import { Container, Graphics as PixiGraphics } from "pixi.js";
import EEGWaveRow from "./EEGWaveRow";

extend({ Container, Graphics: PixiGraphics });

export default function EEGCanvasFit({
  width,
  availHeight,
  buffers,
  sampleRate,
  secondsVisible,
  voltsPerDiv,
  desiredGap = 8,
  colors = DEFAULT_EEG_COLORS,
}) {
  const numChannels = buffers.length;
  const gapsCount = Math.max(0, numChannels - 1);
  const rowHeight = Math.max(1, Math.floor(availHeight / Math.max(1, numChannels)));
  const spaceUsedByRows = rowHeight * numChannels;
  let spaceForGaps = Math.max(0, availHeight - spaceUsedByRows);
  let baseGap = gapsCount > 0 ? Math.min(desiredGap, Math.floor(spaceForGaps / gapsCount)) : 0;
  spaceForGaps = Math.max(0, availHeight - spaceUsedByRows);
  baseGap = gapsCount > 0 ? Math.floor(spaceForGaps / gapsCount) : 0;
  const gapRemainder = gapsCount > 0 ? spaceForGaps - baseGap * gapsCount : 0;
  const gaps = Array.from({ length: gapsCount }, (_, i) => baseGap + (i < gapRemainder ? 1 : 0));
  const yOffsets = new Array(numChannels);
  let acc = 0;
  
  for (let i = 0; i < numChannels; i++) {
    yOffsets[i] = acc;
    acc += rowHeight + (i < gapsCount ? gaps[i] : 0);
  }

  const totalHeight = availHeight;

  return (
    <Application
      width={width}
      height={totalHeight}
      autoDensity
      resolution={typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1}
      antialias={false}
      backgroundAlpha={0}
      powerPreference="low-power"
    >
      {buffers.map((buf, i) => (
        <EEGWaveRow
          key={i}
          buffer={buf}
          sampleRate={sampleRate}
          secondsVisible={secondsVisible}
          width={width}
          height={rowHeight} 
          scaleHeight={rowHeight}
          voltsPerDiv={voltsPerDiv}
          yOffset={yOffsets[i]}
          color={colors[i % colors.length]}
          clip
          gain={0.5}
        />
      ))}
    </Application>
  );
}

const DEFAULT_EEG_COLORS = [
  0xff5555, 0x55ff55, 0x5555ff, 0xffff55, 0xff55ff, 0x55ffff, 0xff9966, 0xbb55ff,
  0x66ff99, 0x99ff66, 0x6699ff, 0xff6699, 0x66ffff, 0xffff99, 0x99ffff, 0xff99ff,
  0xff7f50, 0x7fff50, 0x507fff, 0xffd700, 0xadff2f, 0x00ced1, 0xff69b4, 0xba55d3,
  0x1e90ff, 0x32cd32, 0xff8c00, 0x8a2be2, 0x20b2aa, 0xdb7093, 0xdaa520, 0x7b68ee,
];
