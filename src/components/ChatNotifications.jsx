import { useEffect } from "react";
import GetAllUsers from "../context/GetAllUsers";
import useGetSocketMessage from "../context/useGetSocketMessage";
import useConversation from "../stateman/useConversation";
import { requestNotificationPermission } from "../lib/notifications";

const ChatNotifications = () => {
  const [users] = GetAllUsers();
  const setSelectedConversation = useConversation((s) => s.setSelectedConversation);
  const unreadCounts = useConversation((s) => s.unreadCounts);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
