import { useEffect } from "react";
import GetAllUsers from "../context/GetAllUsers";
import useGetSocketMessage from "../context/useGetSocketMessage";
import useConversation from "../stateman/useConversation";
import { requestNotificationPermission } from "../lib/notifications";
import {
  registerServiceWorker,
  subscribeToPushNotifications,
  isPushSupported,
} from "../lib/pushNotifications";
import { useAuth } from "../context/AuthProvider";

const ChatNotifications = () => {
  const [users] = GetAllUsers();
  const { authUser } = useAuth();
  const setSelectedConversation = useConversation((s) => s.setSelectedConversation);
  const unreadCounts = useConversation((s) => s.unreadCounts);

  useEffect(() => {
    if (!authUser) return;

    const setup = async () => {
      if (!isPushSupported()) return;
      await registerServiceWorker();
      if (Notification.permission === "granted") {
        await subscribeToPushNotifications();
      }
    };

    setup();
  }, [authUser]);

  useEffect(() => {
    const total = Object.values(unreadCounts).reduce((sum, n) => sum + n, 0);
    document.title = total > 0 ? `(${total}) Chat App` : "Chat App";
  }, [unreadCounts]);

  useGetSocketMessage((senderId) => {
    const user = users.find((u) => String(u._id) === String(senderId));
    if (user) setSelectedConversation(user);
  });

  return null;
};

export default ChatNotifications;
