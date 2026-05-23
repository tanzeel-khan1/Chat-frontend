import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import useGetMessages from "../../context/useGetMessages";
import Loading from "../../components/Loading";
import useConversation from "../../stateman/useConversation";

const Message = () => {
  const { messages = [] } = useConversation();
  const { loading } = useGetMessages();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading />
      </div>
    );
  }

  if (!loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 px-4">
        <p className="opacity-60 text-slate-400 text-sm md:text-base">
          No messages yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2 md:p-4 pb-4">
      {messages.map((message, index) => (
        <div
          key={message._id || index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          <Messages message={message} />
        </div>
      ))}
    </div>
  );
};

export default Message;
