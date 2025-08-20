import { useEffect, useRef, useState } from "react";

export default function useParentWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth || 0));
    setWidth(el.clientWidth || 0);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}
