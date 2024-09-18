import React from "react";
import { useLetterHook } from "./Letter.hook";
import useSettings from "./useSetting";
import { DeleteButton } from "./DeleteButton";

const A5LetterEditor: React.FC = () => {
  const {
    lineColor,
    fontColor,
    opacity,
    backgroundImage,
    fontFamily,
    letterSpacing,
  } = useSettings();

  const { pages, handleAddPage, handleReset, handleChange, handleRemovePage } =
    useLetterHook();
  return (
    <form className="a5-editor-container">
      <div className="button-group">
        <button className="button" type="button" onClick={() => window.print()}>
          印刷
        </button>
      </div>
      {pages.map((pageText, index) => (
        <div
          key={index}
          className="a5-page"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            ["--line-color" as any]: lineColor,
            ["--font-color" as any]: fontColor,
            ["--opacity" as any]: opacity,
            ["--font-family" as any]: fontFamily || "Zen Kurenaido",
            ["--letter-spacing" as any]: `${letterSpacing}px`,
          }}
        >
          <DeleteButton onClick={() => handleRemovePage(index)} />
          <textarea
            aria-label={`ページ${index + 1}`}
            value={pageText}
            cols={27}
            rows={17}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <div className="button-group">
        <button className="button" type="reset" onClick={handleReset}>
          リセット
        </button>
        <button className="button" type="button" onClick={handleAddPage}>
          ページ追加
        </button>
      </div>
    </form>
  );
};

export default A5LetterEditor;
