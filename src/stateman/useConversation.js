import { create } from "zustand";

const useConversation = create((set, get) => ({
  selectedConversation: null,
  messages: [],
  unreadCounts: {},
  lastMessagePreview: {},

  setSelectedConversation: (conversation) =>
    set((state) => {
      const key = conversation?._id ? String(conversation._id) : null;
      const unreadCounts = { ...state.unreadCounts };
      const lastMessagePreview = { ...state.lastMessagePreview };

      if (key) {
        delete unreadCounts[key];
        delete lastMessagePreview[key];
      }

      return {
        selectedConversation: conversation,
        messages: [],
        unreadCounts,
        lastMessagePreview,
      };
    }),

  setMessages: (messages) =>
    set({
      messages: Array.isArray(messages)
        ? messages.filter(
            (msg, index, self) =>
              index === self.findIndex((m) => m._id === msg._id)
          )
        : [],
    }),

  addMessage: (newMessage) =>
    set((state) => {
      const messageExists = state.messages.some(
        (msg) => msg._id === newMessage._id
      );

      if (messageExists) {
        return state;
      }

      return {
        messages: [...state.messages, newMessage],
      };
    }),

  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== messageId),
    })),

  incrementUnread: (userId, preview) => {
    const key = String(userId);
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [key]: (state.unreadCounts[key] || 0) + 1,
      },
      lastMessagePreview: {
        ...state.lastMessagePreview,
        [key]: preview,
      },
    }));
  },

  clearUnread: (userId) => {
    const key = String(userId);
    set((state) => {
      const unreadCounts = { ...state.unreadCounts };
      const lastMessagePreview = { ...state.lastMessagePreview };
      delete unreadCounts[key];
      delete lastMessagePreview[key];
      return { unreadCounts, lastMessagePreview };
    });
  },

  getTotalUnread: () =>
    Object.values(get().unreadCounts).reduce((sum, n) => sum + n, 0),
}));

export default useConversation;
