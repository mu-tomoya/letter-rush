import { useSideMenuHook } from "./SideMenu.hook";

const SideMenu: React.FC = () => {
  const {
    fontColor,
    lineColor,
    opacity,
    toggleMenu,
    menuOpen,
    menuRef,
    handleChangeFontColor,
    handleChangeBackgroundImage,
    handleChangeLineColor,
    handleChangeOpacity,
    handleReset,
  } = useSideMenuHook();
  return (
    <div className="side-menu-component">
      <button className="menu-button" onClick={toggleMenu}>
        Settings
      </button>
      <div ref={menuRef} className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="button-group">
          <p>フォント色</p>
          <input
            type="color"
            value={fontColor}
            onChange={handleChangeFontColor}
          />
        </div>
        <div className="button-group">
          <p>罫線色</p>
          <input
            type="color"
            value={lineColor}
            onChange={handleChangeLineColor}
          />
        </div>
        <div className="button-group">
          <input
            type="file"
            onChange={handleChangeBackgroundImage}
            accept="image/*"
          />
        </div>
        <div className="button-group">
          <p>画像透過度</p>
          <input
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
      </div>
    </div>
  );
};

export default SideMenu;
