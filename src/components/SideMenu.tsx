import { useSideMenuHook } from "./SideMenu.hook";

const SideMenu: React.FC = () => {
  const {
    fontColor,
    lineColor,
    opacity,
    fontFamily,
    letterSpacing,
    toggleMenu,
    menuOpen,
    menuRef,
    handleChangeFontColor,
    handleChangeBackgroundImage,
    handleChangeLineColor,
    handleChangeOpacity,
    handleChangeFontFamily,
    handleChangeLetterSpacing,
    handleReset,
  } = useSideMenuHook();
  return (
    <div className="side-menu-component">
      <button className="menu-button" onClick={toggleMenu}>
        Settings
      </button>
      <div ref={menuRef} className={`side-menu ${menuOpen ? "open" : ""}`}>
        <form name="setting">
          <div className="button-group">
            <label htmlFor="font-family">フォント</label>
            <input
              id="font-family"
              type="text"
              value={fontFamily}
              onChange={handleChangeFontFamily}
            />
          </div>
          <div className="button-group">
            <label htmlFor="letter-spacing">文字間隔</label>
            <input
              id="letter-spacing"
              type="number"
              step="0.1"
              value={letterSpacing}
              onChange={handleChangeLetterSpacing}
            />
          </div>
          <div className="button-group">
            <label htmlFor="font-color">フォント色</label>
            <input
              id="font-color"
              type="color"
              value={fontColor}
              onChange={handleChangeFontColor}
            />
          </div>
          <div className="button-group">
            <label htmlFor="line-color">罫線色</label>
            <input
              id="line-color"
              type="color"
              value={lineColor}
              onChange={handleChangeLineColor}
            />
          </div>
          <div className="button-group">
            <input
              aria-label="背景画像"
              type="file"
              onChange={handleChangeBackgroundImage}
              accept="image/*"
            />
          </div>
          <div className="button-group">
            <label htmlFor="opacity">画像透過度</label>
            <input
              id="opacity"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={handleChangeOpacity}
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={handleReset}>
              設定をリセット
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideMenu;
