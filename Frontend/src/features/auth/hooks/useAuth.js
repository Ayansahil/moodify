import { login, register, getMe, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ email, username, password }) {
    setLoading(true);
    try {
      const data = await register({ email, username, password });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const message = err.response?.data?.message;
      return { success: false, errors: serverErrors, message };
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ email, username, password }) {
    setLoading(true);
    try {
      const data = await login({ email, username, password });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const message = err.response?.data?.message;
      return { success: false, errors: serverErrors, message };
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }



  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe,
  };
};
