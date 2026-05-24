import { subscribeToPushNotifications, isPushSupported } from "./pushNotifications";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") {
    if (isPushSupported()) {
      await subscribeToPushNotifications();
    }
    return true;
  }
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  if (result === "granted" && isPushSupported()) {
    await subscribeToPushNotifications();
  }
  return result === "granted";
}

export function showBrowserNotification({ title, body, onClick }) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const notification = new Notification(title, {
    body,
    icon: "/avaty-men.png",
    badge: "/avaty-men.png",
  });

  notification.onclick = () => {
    window.focus();
    onClick?.();
    notification.close();
  };
}

export function playMessageSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // ignore if audio blocked
  }
}
