export default function CargandoPagina() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#040B35] p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/25 border-t-cyan-400" />
        <div className="h-4 w-48 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
}
