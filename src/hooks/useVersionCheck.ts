import { useEffect, useCallback, useState } from "react";

const VERSION_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
const LOCAL_STORAGE_KEY = "dalton_build_id";

export function useVersionCheck() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const checkVersion = useCallback(async () => {
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;

      const data = await res.json();
      const serverBuildId = data.buildId;
      if (!serverBuildId) return;

      const localBuildId = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!localBuildId) {
        // First visit — save current version
        localStorage.setItem(LOCAL_STORAGE_KEY, serverBuildId);
        return;
      }

      if (localBuildId !== serverBuildId) {
        setUpdateAvailable(true);
      }
    } catch {
      // Network error — ignore silently
    }
  }, []);

  const applyUpdate = useCallback(() => {
    // Clear stored version so next load saves the new one
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload();
  }, []);

  useEffect(() => {
    // Check on mount (after a small delay to not block initial render)
    const initialTimeout = setTimeout(checkVersion, 5000);

    // Then check periodically
    const interval = setInterval(checkVersion, VERSION_CHECK_INTERVAL);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [checkVersion]);

  return { updateAvailable, applyUpdate };
}
