import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "./SocketContext";
import { useAuth } from "./AuthProvider";
import useConversation from "../stateman/useConversation";
import {
  showBrowserNotification,
  playMessageSound,
} from "../lib/notifications";

const getId = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  return String(value._id || value.id || value);
};

const useGetSocketMessage = (onOpenChat) => {
  const { socket } = useSocketContext();
  const { authUser } = useAuth();
  const {
    selectedConversation,
    addMessage,
    removeMessage,
    incrementUnread,
  } = useConversation();

  const currentUserId = getId(
    authUser?.user?.id || authUser?.user?._id || authUser?._id
  );

  useEffect(() => {
    if (!socket || !currentUserId) return;

    const notifyIncomingMessage = (newMessage, senderId) => {
      const senderName = newMessage.sender?.name || "Koi user";
      const preview =
        newMessage.message?.length > 60
          ? `${newMessage.message.slice(0, 60)}...`
          : newMessage.message || "Naya message";

      incrementUnread(senderId, {
        text: preview,
        time: newMessage.createdAt || new Date().toISOString(),
      });

      playMessageSound();

      toast.success(`${senderName}: ${preview}`, {
        duration: 5000,
        icon: "💬",
        onClick: () => onOpenChat?.(senderId),
      });

      showBrowserNotification({
        title: `${senderName} ne message bheja`,
        body: preview,
        onClick: () => onOpenChat?.(senderId),
      });
    };

    const handleNewMessage = (newMessage) => {
      const senderId = getId(newMessage.sender);
      const receiverId = getId(newMessage.receiver);
      const selectedUserId = getId(selectedConversation?._id);

      const isIncoming = receiverId === currentUserId;
      if (!isIncoming && senderId !== currentUserId) return;

      const isActiveChat =
        selectedUserId &&
        ((senderId === selectedUserId && receiverId === currentUserId) ||
          (senderId === currentUserId && receiverId === selectedUserId));

      if (isActiveChat) {
        addMessage(newMessage);
        return;
      }

      if (isIncoming && senderId !== currentUserId) {
        notifyIncomingMessage(newMessage, senderId);
      }
    };

    const handleMessageDeleted = ({ messageId }) => {
      if (messageId) removeMessage(messageId);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageDeleted", handleMessageDeleted);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageDeleted", handleMessageDeleted);
    };
  }, [
    socket,
    currentUserId,
    selectedConversation?._id,
    addMessage,
    removeMessage,
    incrementUnread,
    onOpenChat,
  ]);
};

export default useGetSocketMessage;
