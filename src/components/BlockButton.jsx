import React, { useState, useEffect } from "react";
import useBlockUser from "../hooks/BlockHook";

const BlockButton = ({ targetUserId }) => {
  const { blockUser, unblockUser, status, fetchStatus, loading, error } = useBlockUser(targetUserId);

  const [isBlocked, setIsBlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!targetUserId) return;

      setChecking(true);
      try {
        await fetchStatus(); 
      } catch (err) {
        console.error("Error fetching block status:", err);
      } finally {
        setChecking(false);
      }
    };
    fetch();
  }, [targetUserId]); 

  useEffect(() => {
    setIsBlocked(status.youBlocked);
  }, [status.youBlocked]);

  // ✅ Block handler
  const handleBlock = async () => {
    const res = await blockUser();
    if (res?.success) setIsBlocked(true);
  };

  // ✅ Unblock handler
  const handleUnblock = async () => {
    const res = await unblockUser();
    if (res?.success) setIsBlocked(false);
  };

  if (checking) {
    return (
      <button disabled className="px-3 py-1 rounded bg-gray-500 text-white">
        Checking...
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2 md:mr-0 mr-20">
      {isBlocked ? (
        <button
          onClick={handleUnblock}
          disabled={loading}
          className="px-3 py-1 rounded cursor-pointer bg-red-600 text-white hover:bg-red-700 transition"
        >
          {loading ? "Processing..." : "Unblock"}
        </button>
      ) : (
        <button
          onClick={handleBlock}
          disabled={loading}
          className="px-3 py-1 rounded cursor-pointer bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          {loading ? "Processing..." : "Block"}
        </button>
      )}

      {status.blockedBy && (
        <span className="text-sm text-red-500">
          You are blocked by this user
        </span>
      )}

      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default BlockButton;