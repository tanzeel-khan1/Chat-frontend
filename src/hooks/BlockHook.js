import { useState, useEffect } from "react";
import api from "../lib/api";

const useBlockUser = (targetId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ youBlocked: false, blockedBy: false });

  const fetchStatus = async () => {
    if (!targetId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/messages/status/${targetId}`);
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
      const response = await api.put(`/api/messages/block/${targetId}`);
      await fetchStatus();
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
      const response = await api.put(`/api/messages/unblock/${targetId}`);
      await fetchStatus();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

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
