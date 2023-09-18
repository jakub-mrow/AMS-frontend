import { useMemo } from "react";

export const useAuth = () => {
  const token = useMemo(() => {
    return "";
  }, []);
  return { token };
};
