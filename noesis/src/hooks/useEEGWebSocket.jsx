import { useEffect, useMemo, useRef } from "react";
import { createChannelBuffer, pushSamplesProduce, clearChannelBuffer } from "../components/eeg/eegUtils";

export function useEEGWebSocket(
  url,
  {
    channels,
    sampleRate,
    secondsVisible = 10,
    marginSeconds = 0.5,
    autoReconnectMs = 2000,
    enabled = true,             
    onStatus,
  } = {}
) {
  if (!(channels > 0) || !(sampleRate > 0)) {
    throw new Error("useEEGWebSocket: wymagane channels>0 i sampleRate>0");
  }

  const capacity = Math.max(1, Math.ceil(sampleRate * (secondsVisible + marginSeconds)));
  const buffers = useMemo(
    () => Array.from({ length: channels }, () => createChannelBuffer(capacity)),
    [channels, capacity]
  );

  const wsRef = useRef(null);
  const reconnectRef = useRef(null);
  const shouldReconnectRef = useRef(false);
  const globalIndexRef = useRef(0);
  const formatRef = useRef("int16-interleaved");
  const scaleRef = useRef(1 / 32768);

  const hardClose = () => {
    shouldReconnectRef.current = false;
    if (reconnectRef.current) {
      clearTimeout(reconnectRef.current);
      reconnectRef.current = null;
    }
    const ws = wsRef.current;
    if (ws && ws.readyState <= 1) {
      ws.onclose = null;
      try { ws.close(1000, "disabled/unmount"); } catch {}
    }
    wsRef.current = null;
  };

  useEffect(() => {
    if (!enabled) {
      hardClose();
      return;
    }

    shouldReconnectRef.current = true;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        onStatus?.("open");
        for (let ch = 0; ch < channels; ch++) clearChannelBuffer(buffers[ch]);
        globalIndexRef.current = 0;
      };

      ws.onmessage = (ev) => {
        const data = ev.data;

        if (typeof data === "string") {
          try {
            const meta = JSON.parse(data);
            if (meta?.format) formatRef.current = meta.format;
            if (typeof meta?.scale === "number") scaleRef.current = meta.scale;
          } catch {}
          return;
        }

        if (data instanceof ArrayBuffer) {
          const fmt = formatRef.current;

          if (fmt === "int16-interleaved") {
            const src = new Int16Array(data);
            const scale = scaleRef.current;
            const spc = (src.length / channels) | 0;
            if (spc <= 0) return;

            for (let ch = 0; ch < channels; ch++) {
              pushSamplesProduce(
                buffers[ch],
                spc,
                (i) => src[i * channels + ch] * scale,
                globalIndexRef.current
              );
            }
            globalIndexRef.current += spc;
            return;
          }

          if (fmt === "f32-planar") {
            const src = new Float32Array(data);
            const spc = (src.length / channels) | 0;
            if (spc <= 0) return;

            for (let ch = 0; ch < channels; ch++) {
              const base = ch * spc;
              pushSamplesProduce(
                buffers[ch],
                spc,
                (i) => src[base + i],
                globalIndexRef.current
              );
            }
            globalIndexRef.current += spc;
          }
        }
      };

      ws.onclose = (ev) => {
        onStatus?.("close");
        wsRef.current = null;

        if (!shouldReconnectRef.current) return;
        if (ev.code === 1000) return;

        if (autoReconnectMs > 0) {
          onStatus?.("reconnect");
          reconnectRef.current = setTimeout(connect, autoReconnectMs);
        }
      };

      ws.onerror = () => {
        onStatus?.("error");
      };
    };

    connect();

    return () => {
      hardClose();
    };
  }, [enabled, url, channels, sampleRate, secondsVisible, marginSeconds, autoReconnectMs, buffers, onStatus]);

  return buffers;
}
