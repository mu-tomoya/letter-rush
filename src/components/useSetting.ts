import { useContext } from "react";
import { SettingContext } from "./SettingContext";

const useSettings = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingProvider");
  }
  return context;
};

export default useSettings;
