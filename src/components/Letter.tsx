import React, { useState, ChangeEvent, KeyboardEvent, useCallback } from "react";

const A5LetterEditor: React.FC = () => {
  const [pages, setPages] = useState<string[]>(() => {
    const savedPages = localStorage.getItem("a5Pages");
    return savedPages ? JSON.parse(savedPages) : [""];
  });

  const handleAddPage = useCallback((): void => {
    setPages([...pages, ""]);
    localStorage.setItem("a5Pages", JSON.stringify(pages));
  }, [pages]);

  console.log(pages);

  const handleChange = useCallback(
    (index: number, e: ChangeEvent<HTMLTextAreaElement>): void => {
      const newPages = [...pages];
      newPages[index] = e.target.value;
      setPages(newPages);
    },
    [pages]
  );
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && typeof event.target.result === "string") {
          setBackgroundImage(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

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

  return (
    <form className="a5-editor-container">
      <div className="button-group">
        <input type="file" onChange={handleFileUpload} accept="image/*" />
        <button onClick={() => window.print()}>印刷</button>
      </div>
      {pages.map((pageText, index) => (
        <div
          key={index}
          className="a5-page"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <textarea
            aria-label={`ページ${index + 1}`}
            value={pageText}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        </div>
      ))}
      <div className="button-group">
        <button type="reset" onClick={handleReset}>
          リセット
        </button>
        <button type="button" onClick={handleAddPage}>
          追加
        </button>
      </div>
    </form>
  );
};

export default A5LetterEditor;
