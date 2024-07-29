import { createContext, ReactNode, useState } from "react";

export type Setting = {
  lineColor: string;
  setLineColor: (color: string) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  backgroundImage: string | null;
  setBackgroundImage: (file: string | null) => void;
};

export const SettingContext = createContext<Setting | undefined>(undefined);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [lineColor, setLineColor] = useState<string>(
    localStorage.getItem("lineColor") ?? "#333"
  );
  const [fontColor, setFontColor] = useState<string>(
    localStorage.getItem("fontColor") ?? "#333"
  );
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    localStorage.getItem("backgroundImage") ?? null
  );
  const value = {
    lineColor,
    setLineColor,
    fontColor,
    setFontColor,
    backgroundImage,
    setBackgroundImage,
  };
  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};
