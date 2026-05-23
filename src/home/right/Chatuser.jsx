import React from "react";
import useConversation from "../../stateman/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { ArrowLeft } from "lucide-react";
import BlockButton from "../../components/BlockButton.jsx";

const Chatuser = ({ setShowSidebar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers = [] } = useSocketContext();

  if (!selectedConversation) return null;

  const isOnline = onlineUsers.includes(String(selectedConversation._id));

  const handleBack = () => {
    setSelectedConversation(null);
    if (setShowSidebar) {
      setShowSidebar(true);
    }
  };

  return (
    <div className="shrink-0 flex items-center gap-2 px-2 py-2 md:px-4 md:py-3 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 safe-top">
      <button
        type="button"
        onClick={handleBack}
        className="md:hidden shrink-0 p-2 hover:bg-slate-700 rounded-lg transition-colors"
        aria-label="Back to chats"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div className="relative shrink-0">
        <img
          src="./avater.png"
          alt="avatar"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
            isOnline
              ? "bg-green-400 shadow-lg shadow-green-400/50"
              : "bg-slate-500"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-base md:text-xl text-white truncate font-semibold">
          {selectedConversation.name}
        </h1>
        <span
          className={`text-xs ${
            isOnline ? "text-green-400" : "text-slate-400"
          }`}
        >
          {isOnline ? "online" : "offline"}
        </span>
      </div>

      <div className="shrink-0 max-w-[38%]">
        <BlockButton targetUserId={selectedConversation._id} compact />
      </div>
    </div>
  );
};

export default Chatuser;
