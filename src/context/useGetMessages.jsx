import { useEffect, useState } from "react";
import useConversation from "../stateman/useConversation";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const selectedConversation = useConversation(
    (state) => state.selectedConversation
  );
  const messages = useConversation((state) => state.messages);
  const setMessages = useConversation((state) => state.setMessages);

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]); // 🔥 no conversation → no messages
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://my-app1111.bonto.run/api/messages/get/${selectedConversation._id}`
        );

        // ✅ API must return array
        setMessages(response.data?.messages || []);
      } catch (error) {
        console.log("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id]); // 🔥 dependency fix

  return { messages, loading };
};

export default useGetMessages;
