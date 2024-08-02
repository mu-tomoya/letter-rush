import { useLetterHook } from "./Letter.hook";
import useSettings from "./useSetting";

const A5LetterEditor: React.FC = () => {
  const {
    lineColor,
    fontColor,
    opacity,
    backgroundImage,
    fontFamily,
    letterSpacing,
  } = useSettings();
  const { pages, handleAddPage, handleChange, handleReset, handleKeyDown } =
    useLetterHook();
  return (
    <form className="a5-editor-container">
      <div className="button-group">
        <button onClick={() => window.print()}>印刷</button>
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
            ["--font-family" as any]: fontFamily,
            ["--letter-spacing" as any]: `${letterSpacing}px`,
          }}
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
          ページ追加
        </button>
      </div>
    </form>
  );
};

export default A5LetterEditor;
