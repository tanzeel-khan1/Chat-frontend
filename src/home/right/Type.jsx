import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js";
import useBlockUser from "../../hooks/BlockHook.js";

const Type = ({ targetId }) => {
  const { loading: sendLoading, sendMessages } = useSendMessage();
  const { status, loading: blockLoading } = useBlockUser(targetId);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // 🚫 If blocked, don't send
    if (status.youBlocked || status.blockedBy) return;

    await sendMessages(message);
    setMessage("");
  };

  const isBlocked = status.youBlocked || status.blockedBy;
  const isLoading = sendLoading || blockLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            status.youBlocked
              ? "You have blocked this user"
              : status.blockedBy
              ? "You are blocked by this user"
              : "Type a message..."
          }
          disabled={isBlocked}
          className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base rounded-xl md:rounded-2xl bg-slate-700/50 text-white placeholder-slate-400 outline-none border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={isLoading || !message.trim() || isBlocked}
          className="flex items-center cursor-pointer justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-200 flex-shrink-0 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
        >
          <IoIosSend className="text-xl md:text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default Type;