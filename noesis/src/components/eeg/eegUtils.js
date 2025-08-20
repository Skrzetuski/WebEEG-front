export function createChannelBuffer(capacity) {
  const cap = Math.max(1, capacity | 0);
  return { data: new Float32Array(cap), writeIdx: 0, capacity: cap };
}


export function pushSamples(buf, samples) {
  const cap = buf.capacity ?? buf.data.length;
  let w = buf.writeIdx | 0;
  const n = samples.length | 0;

  let i = 0;
  while (i < n) {
    const spaceToEnd = cap - w;
    const chunk = (n - i < spaceToEnd ? n - i : spaceToEnd) | 0;
    buf.data.set(samples.subarray(i, i + chunk), w);
    w += chunk;
    if (w >= cap) w = 0;
    i += chunk;
  }
  buf.writeIdx = w;
}


export function pushSamplesProduce(buf, n, producer, globalStartIndex = 0) {
  const cap = buf.capacity ?? buf.data.length;
  let w = buf.writeIdx | 0;

  const first = Math.min(n, cap - w);
  for (let i = 0; i < first; i++) {
    buf.data[w + i] = producer(i, globalStartIndex + i);
  }
  w = (w + first) % cap;

  for (let i = first; i < n; i++) {
    buf.data[w] = producer(i, globalStartIndex + i);
    w++;
    if (w >= cap) w = 0;
  }
  buf.writeIdx = w;
}


export function clearChannelBuffer(buf) {
  buf.data.fill(0);
  buf.writeIdx = 0;
}


export function readLatest(buf, count, out) {
  const cap = buf.capacity ?? buf.data.length;
  const need = Math.min(cap, Math.max(0, count | 0), out.length | 0);
  if (need === 0) return 0;

  let start = buf.writeIdx - need;
  if (start < 0) start += cap;

  if (start + need <= cap) {
    out.set(buf.data.subarray(start, start + need), 0);
    return need;
  }

  const firstLen = cap - start;
  out.set(buf.data.subarray(start, cap), 0);
  out.set(buf.data.subarray(0, need - firstLen), firstLen);
  return need;
}


export function minMaxDecimate(src, n, widthPx, out) {
  const W = widthPx | 0;
  if (W <= 0) return 0;

  const total = n | 0;
  let start = 0;
  let outIdx = 0;
  let acc = 0;
  let next = 0;
  const stepNum = total;
  const stepDen = W;

  for (let x = 0; x < W; x++) {
    next += stepNum;
    const end = Math.min(total, (next / stepDen) | 0);

    if (end <= start) {
      out[outIdx++] = 0;
      out[outIdx++] = 0;
      continue;
    }

    let min = src[start];
    let max = min;
    for (let i = start + 1; i < end; i++) {
      const v = src[i];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    out[outIdx++] = min;
    out[outIdx++] = max;
    start = end;
  }
  return outIdx;
}
