export default function EEGLegend({ labels }) {
  if (!labels?.length) return null;
  return (
    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-1">
      {labels.map((l, i) => (
        <div key={i} className="text-[10px] text-zinc-400">
          {l}
        </div>
      ))}
    </div>
  );
}
