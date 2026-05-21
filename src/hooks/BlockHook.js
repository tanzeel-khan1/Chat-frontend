import { useState, useEffect } from "react";
import axios from "axios";

const useBlockUser = (targetId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ youBlocked: false, blockedBy: false });

  const fetchStatus = async () => {
    if (!targetId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/messages/status/${targetId}`);
      setStatus(response.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get status");
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async () => {
  if (!targetId) return;

  setLoading(true);
  setError(null);

  try {
    const response = await axios.put(`https://my-app1111.bonto.run/api/messages/block/${targetId}`);
    await fetchStatus(); // 🔥 refresh status immediately
    return response.data;
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
    return null;
  } finally {
    setLoading(false);
  }
};

const unblockUser = async () => {
  if (!targetId) return;

  setLoading(true);
  setError(null);

  try {
    const response = await axios.put(`/api/messages/unblock/${targetId}`);
    await fetchStatus(); // 🔥 refresh status immediately
    return response.data;
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
    return null;
  } finally {
    setLoading(false);
  }
};

  // 🔄 Auto fetch status when targetId changes
  useEffect(() => {
    fetchStatus();
  }, [targetId]);

  return {
    blockUser,
    unblockUser,
    fetchStatus,
    status,
    loading,
    error,
  };
};

export default useBlockUser;