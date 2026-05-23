import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import api from "../../lib/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/api/logout");
      localStorage.removeItem("userInfo");
      Cookies.remove("jwt");
      setAuthUser(null);
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
};

const Logout = ({ variant = "sidebar" }) => {
  const { handleLogout, loading } = useLogout();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="p-2 rounded-full bg-slate-800/90 border border-slate-600 text-slate-300 hover:text-red-400"
        title="Logout"
        aria-label="Logout"
      >
        <RiLogoutBoxLine className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="w-[4%] min-w-[60px] bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col justify-end border-r border-slate-700">
      <div className="p-2">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center justify-center group"
          title="Logout"
        >
          <RiLogoutBoxLine className="text-3xl md:text-5xl p-2 md:p-3 cursor-pointer text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-full duration-300 transition-all group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default Logout;
