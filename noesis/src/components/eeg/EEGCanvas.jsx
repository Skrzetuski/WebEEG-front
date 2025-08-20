import { Application, extend } from "@pixi/react";
import { Container, Graphics as PixiGraphics } from "pixi.js";
import EEGWaveRow from "./EEGWaveRow";

extend({ Container, Graphics: PixiGraphics });

export default function EEGCanvas({
  width,
  totalHeight,
  buffers,
  sampleRate,
  secondsVisible,
  channelHeight,
  channelGap,
  voltsPerDiv,
  gain = 60,
}) {
  return (
    <Application
      width={width}
      height={totalHeight}
      autoDensity={false}
      resolution={1}
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
          height={channelHeight}
          voltsPerDiv={voltsPerDiv}
          yOffset={i * (channelHeight + channelGap)}
          clip
          gain={gain}
        />
      ))}
    </Application>
  );
}
