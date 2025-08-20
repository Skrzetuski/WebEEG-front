import { useEffect, useRef, useState } from "react";

export default function useParentSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setSize({ width: el.clientWidth || 0, height: el.clientHeight || 0 })
    );
    setSize({ width: el.clientWidth || 0, height: el.clientHeight || 0 });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
}
