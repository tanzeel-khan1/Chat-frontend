import React, { useState, useEffect } from "react";
import useBlockUser from "../hooks/BlockHook";

const BlockButton = ({ targetUserId, compact = false }) => {
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

  const btnClass = compact
    ? "px-2 py-1 text-xs rounded-md whitespace-nowrap"
    : "px-3 py-1 text-sm rounded";

  if (checking) {
    return (
      <button
        type="button"
        disabled
        className={`${btnClass} bg-gray-500 text-white`}
      >
        ...
      </button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      {isBlocked ? (
        <button
          type="button"
          onClick={handleUnblock}
          disabled={loading}
          className={`${btnClass} cursor-pointer bg-red-600 text-white hover:bg-red-700 transition`}
        >
          {loading ? "..." : "Unblock"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleBlock}
          disabled={loading}
          className={`${btnClass} cursor-pointer bg-purple-600 text-white hover:bg-purple-700 transition`}
        >
          {loading ? "..." : "Block"}
        </button>
      )}

      {status.blockedBy && !compact && (
        <span className="text-xs text-red-400">Blocked by user</span>
      )}

      {error && !compact && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </div>
  );
};

export default BlockButton;