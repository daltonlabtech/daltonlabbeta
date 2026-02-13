import { useEffect } from "react";
import { useVersionCheck } from "@/hooks/useVersionCheck";

const AUTO_RELOAD_DELAY = 60_000; // 60 seconds

export function UpdateNotification() {
  const { updateAvailable, applyUpdate } = useVersionCheck();

  useEffect(() => {
    if (!updateAvailable) return;

    // Auto-reload after 60s if user doesn't act
    const timeout = setTimeout(applyUpdate, AUTO_RELOAD_DELAY);
    return () => clearTimeout(timeout);
  }, [updateAvailable, applyUpdate]);

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 rounded-full bg-foreground text-background px-5 py-3 shadow-2xl animate-fade-in"
      role="alert"
    >
      <span className="text-sm font-medium">Nova versão disponível</span>
      <button
        onClick={applyUpdate}
        className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Atualizar agora
      </button>
    </div>
  );
}
