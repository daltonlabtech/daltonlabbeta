import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useVersionCheck } from "@/hooks/useVersionCheck";

const AUTO_RELOAD_DELAY = 60_000;

export function UpdateNotification() {
  const { t } = useTranslation();
  const { updateAvailable, applyUpdate } = useVersionCheck();

  useEffect(() => {
    if (!updateAvailable) return;
    const timeout = setTimeout(applyUpdate, AUTO_RELOAD_DELAY);
    return () => clearTimeout(timeout);
  }, [updateAvailable, applyUpdate]);

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 rounded-full bg-foreground text-background px-5 py-3 shadow-2xl animate-fade-in"
      role="alert"
    >
      <span className="text-sm font-medium">{t('update.newVersion')}</span>
      <button
        onClick={applyUpdate}
        className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t('update.updateNow')}
      </button>
    </div>
  );
}