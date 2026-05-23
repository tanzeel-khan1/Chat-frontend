import { useEffect, useState } from "react";
import { requestNotificationPermission } from "../lib/notifications";

const NotificationBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) return;
    setVisible(Notification.permission === "default");
  }, []);

  if (!visible) return null;

  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    setVisible(!granted && Notification.permission === "default");
  };

  return (
    <div className="mx-3 md:mx-6 mt-2 p-3 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-between gap-2">
      <p className="text-xs md:text-sm text-slate-200">
        Realtime alerts ke liye notifications on karein
      </p>
      <button
        type="button"
        onClick={handleEnable}
        className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        Enable
      </button>
    </div>
  );
};

export default NotificationBanner;
