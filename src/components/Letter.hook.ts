import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

export const useLetterHook = () => {
  const [pages, setPages] = useState<string[]>(() => {
    const a5Pages = localStorage.getItem("a5Pages") ?? "";
    if (a5Pages && typeof a5Pages === "string") {
      return JSON.parse(a5Pages).split("\f");
    }
    return [""];
  });

  const [lineColor, setLineColor] = useState<string>("#333");

  const handleAddPage = useCallback((): void => {
    setPages([...pages, ""]);
  }, [pages]);

  const handleChange = useCallback(
    (index: number, e: ChangeEvent<HTMLTextAreaElement>): void => {
      const newPages = [...pages];
      newPages[index] = e.target.value;
      setPages(newPages);
      const a5Pages = newPages.join("\f");
      localStorage.setItem("a5Pages", JSON.stringify(a5Pages));
    },
    [pages]
  );

  const handleReset = useCallback((): void => {
    if (window.confirm("リセットしますか？")) {
      setPages([""]);
      localStorage.removeItem("a5Pages");
    }
  }, []);

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLTextAreaElement>): void => {
      const lines = pages[index].split("\n");
      if (e.key === "Enter" && lines.length >= 17) {
        e.preventDefault();
      }
    },
    [pages]
  );

  const handleRemovePage = useCallback(
    (index: number): void => {
      const newPages = [...pages];
      newPages.splice(index, 1);
      setPages(newPages);
      localStorage.setItem("a5Pages", JSON.stringify(newPages.join("\f")));
    },
    [pages]
  );

  return {
    pages,
    handleAddPage,
    handleChange,
    handleReset,
    handleKeyDown,
    handleRemovePage,
    lineColor,
    setLineColor,
  };
};
