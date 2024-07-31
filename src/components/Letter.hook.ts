import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

export const useLetterHook = () => {
  const [pages, setPages] = useState<string[]>(() => {
    const savedPages = localStorage.getItem("a5Pages");
    return savedPages ? JSON.parse(savedPages) : [""];
  });

  const [lineColor, setLineColor] = useState<string>("#333");

  const handleAddPage = useCallback((): void => {
    setPages([...pages, ""]);
    localStorage.setItem("a5Pages", JSON.stringify(pages));
  }, [pages]);

  const handleChange = useCallback(
    (index: number, e: ChangeEvent<HTMLTextAreaElement>): void => {
      const newPages = [...pages];
      newPages[index] = e.target.value;
      setPages(newPages);
      localStorage.setItem("a5Pages", JSON.stringify(newPages));
    },
    [pages]
  );

  const handleReset = useCallback((): void => {
    setPages([""]);
    localStorage.removeItem("a5Pages");
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

  return {
    pages,
    handleAddPage,
    handleChange,
    handleReset,
    handleKeyDown,
    lineColor,
    setLineColor,
  };
};
