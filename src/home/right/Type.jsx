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
    if (status.youBlocked || status.blockedBy) return;

    await sendMessages(message);
    setMessage("");
  };

  const isBlocked = status.youBlocked || status.blockedBy;
  const isLoading = sendLoading || blockLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 w-full border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-end gap-2 px-3 py-2 md:px-4 md:py-3">
        <input
          type="text"
          inputMode="text"
          enterKeyHint="send"
          autoComplete="off"
          autoCorrect="on"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            status.youBlocked
              ? "You blocked this user"
              : status.blockedBy
              ? "You are blocked"
              : "Type a message..."
          }
          disabled={isBlocked || blockLoading}
          className="flex-1 min-w-0 px-4 py-3 text-base rounded-2xl bg-slate-700 text-white placeholder-slate-400 outline-none border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50"
          style={{ fontSize: "16px" }}
        />

        <button
          type="submit"
          disabled={isLoading || !message.trim() || isBlocked}
          className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white disabled:opacity-50 shadow-lg shadow-blue-500/30"
          aria-label="Send message"
        >
          <IoIosSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default Type;
