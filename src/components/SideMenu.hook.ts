import { useCallback, useEffect, useRef, useState } from "react";
import useSettings from "./useSetting";

export const useSideMenuHook = () => {
  const {
    fontColor,
    setFontColor,
    setBackgroundImage,
    lineColor,
    opacity,
    setLineColor,
    setOpacity,
    fontFamily,
    setFontFamily,
    letterSpacing,
    setLetterSpacing,
  } = useSettings();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const handleChangeFontColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFontColor(e.target.value);
      localStorage.setItem("fontColor", e.target.value);
    },
    [setFontColor]
  );

  const handleChangeLineColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLineColor(e.target.value);
      localStorage.setItem("lineColor", e.target.value);
    },
    [setLineColor]
  );

  const handleChangeBackgroundImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && typeof event.target.result === "string") {
            setBackgroundImage(event.target.result);
            localStorage.setItem("backgroundImage", event.target.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [setBackgroundImage]
  );

  const handleChangeOpacity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const opacity = Number(e.target.value);
      setOpacity(opacity);
      localStorage.setItem("opacity", String(opacity));
    },
    [setOpacity]
  );

  const handleChangeFontFamily = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFontFamily(e.target.value);
      localStorage.setItem("fontFamily", e.target.value);
    },
    [setFontFamily]
  );

  const handleChangeLetterSpacing = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const letterSpacing = Number(e.target.value);
      setLetterSpacing(letterSpacing);
      localStorage.setItem("letterSpacing", String(letterSpacing));
    },
    [setLetterSpacing]
  );

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleReset = useCallback(() => {
    setFontColor("#333");
    setLineColor("#333");
    setBackgroundImage(null);
    setOpacity(0);
    setFontFamily("Zen Kurenaido");
    setLetterSpacing("normal");
    localStorage.removeItem("fontColor");
    localStorage.removeItem("lineColor");
    localStorage.removeItem("backgroundImage");
    localStorage.removeItem("opacity");
    localStorage.removeItem("fontFamily");
  }, [
    setFontColor,
    setLineColor,
    setBackgroundImage,
    setOpacity,
    setFontFamily,
    setLetterSpacing,
  ]);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return {
    menuOpen,
    toggleMenu,
    handleChangeFontColor,
    handleChangeLineColor,
    handleChangeBackgroundImage,
    handleChangeOpacity,
    handleChangeFontFamily,
    handleChangeLetterSpacing,
    handleReset,
    menuRef,
    fontColor,
    lineColor,
    opacity,
    fontFamily,
    letterSpacing,
  };
};
